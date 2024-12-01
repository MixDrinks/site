## How to Edit a Blog Post

The request requarding the auth token. (Cookie)

Curl request to edit a blog post. In case post with slug does not exist, it will be created.

```bash
curl http://0.0.0.0:4000/api/admin/blog/post-details/<slug of new post> -X POST -H "Content-Type: application/json" -d @docs/edit-post.json
```
