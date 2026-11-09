# MongoDB → PostgreSQL cutover

The site reads `NUXT_POSTGRES_URI` (GitHub secret `POSTGRES_URI`). The schema is in
`db/schema.sql`. `scripts/migrate-mongo-to-postgres.mjs` copies all data, including
the GridFS images, in a single transaction and checks row counts before it commits.
If it finds any problem it rolls back, and you can safely re-run it.

## Before (no downtime)

1. Provision PostgreSQL (14+) and an empty database (DigitalOcean Managed PostgreSQL;
   add the Swarm node(s) to its Trusted Sources so the app can connect).
2. Add the GitHub secret `POSTGRES_URI`: the DigitalOcean URI with
   `?sslmode=require&uselibpqcompat=true` (encrypted; DO's CA is not in Node's trust store).
3. From a machine that can reach both databases (`npm ci` first), rehearse:

    ```bash
    MONGO_URI=... POSTGRES_URI=... node scripts/migrate-mongo-to-postgres.mjs --dry-run
    ```

    This copies and verifies everything, then rolls back. Fix any reported problems
    (duplicate slugs, non-integer ids, ...) in MongoDB and repeat until it passes.

## Cutover (a few minutes of downtime)

1. Stop the site so no visits, ratings or logins are written to MongoDB:
   `docker service scale mixdrinks_app=0`
2. Run the migration for real (same command without `--dry-run`).
3. Merge the PR to `main`. The workflow deploys the stack with 1 replica, now on PostgreSQL.
4. Check `https://mixdrinks.org/api/health`, a cocktail page, the filters, an image and
   the admin login (existing unexpired sessions are carried over).

## Rollback

MongoDB is not modified, so revert the merge commit (or redeploy the previous image
with `MONGO_URI`). Visits, ratings and blog edits made after the cutover exist only in
PostgreSQL. Remove the MongoDB service only after the site has run on PostgreSQL for a while.

## Behaviour changes

- Missing `visitCount` / `ratingCount` now come back as `0` instead of being omitted.
  In the `biggest-rate` sort, unrated cocktails are ordered by popularity. MongoDB put
  those with an explicit `ratingCount: 0` ahead of ones with the field missing.
- `/api/image/...` returns 404 for an unknown image instead of 500.
- `POST /api/cocktail/:slug/score` rejects values other than integers 1–5 (400).
- The admin image list shows each file once, not once per GridFS revision.
