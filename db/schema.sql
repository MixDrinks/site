-- PostgreSQL schema for MixDrinks.
--
-- Hybrid layout: fields that are queried, sorted or updated are real columns;
-- the rest of each former MongoDB document is kept verbatim in `data` (JSONB).
-- `position` preserves MongoDB's natural (insertion) order, which the site
-- relied on for listing order.
--
-- Applied by scripts/migrate-mongo-to-postgres.mjs; safe to run repeatedly.

CREATE TABLE IF NOT EXISTS cocktails (
    slug         text PRIMARY KEY,
    id           integer NOT NULL,
    name         text,
    visit_count  integer NOT NULL DEFAULT 0,
    rating_count integer NOT NULL DEFAULT 0,
    rating_value double precision NOT NULL DEFAULT 0,
    -- recipe, goods, tools, glassware, tastes, tags, alcohols,
    -- alcoholVolumes, article, matchesV2, ...
    data         jsonb NOT NULL DEFAULT '{}',
    position     integer GENERATED ALWAYS AS IDENTITY
);

CREATE INDEX IF NOT EXISTS cocktails_popular_idx
    ON cocktails (visit_count DESC, id DESC);

-- Filter / catalog entities. `kind` is the former MongoDB collection name:
-- alcoholVolumes, tastes, glassware, goods, tools, tags, alcohol.
CREATE TABLE IF NOT EXISTS catalog_items (
    kind           text NOT NULL,
    slug           text NOT NULL,
    id             integer,
    name           text,
    cocktail_slugs text[] NOT NULL DEFAULT '{}',
    data           jsonb NOT NULL DEFAULT '{}', -- about, ...
    position       integer GENERATED ALWAYS AS IDENTITY,
    PRIMARY KEY (kind, slug)
);

CREATE INDEX IF NOT EXISTS catalog_items_kind_position_idx
    ON catalog_items (kind, position);

CREATE TABLE IF NOT EXISTS blog_posts (
    slug     text PRIMARY KEY,
    title    text,
    data     jsonb NOT NULL DEFAULT '{}', -- body, tags, image, imageKey, published_at
    position integer GENERATED ALWAYS AS IDENTITY
);

CREATE TABLE IF NOT EXISTS blog_tags (
    slug     text PRIMARY KEY,
    name     text,
    data     jsonb NOT NULL DEFAULT '{}',
    position integer GENERATED ALWAYS AS IDENTITY
);

CREATE TABLE IF NOT EXISTS redirects (
    from_path text PRIMARY KEY,
    to_path   text NOT NULL
);

CREATE TABLE IF NOT EXISTS users (
    username      text PRIMARY KEY,
    password_hash text NOT NULL,
    data          jsonb NOT NULL DEFAULT '{}'
);

CREATE TABLE IF NOT EXISTS user_sessions (
    session_id text PRIMARY KEY,
    username   text NOT NULL REFERENCES users (username) ON DELETE CASCADE,
    expires_at timestamptz NOT NULL
);

-- Former GridFS buckets: cocktailsImages, goodsImages, toolsImages,
-- glassware-images, blogImages.
CREATE TABLE IF NOT EXISTS images (
    bucket       text NOT NULL,
    name         text NOT NULL,
    content_type text,
    data         bytea NOT NULL,
    metadata     jsonb NOT NULL DEFAULT '{}',
    uploaded_at  timestamptz NOT NULL DEFAULT now(),
    PRIMARY KEY (bucket, name)
);
