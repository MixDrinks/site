import { createError, defineEventHandler } from 'h3'
import { pool } from '~/server/utils/postgres'

async function getPostsWithTag(tagSlug) {
    const { rows } = await pool.query(
        `SELECT slug, title, data->>'imageKey' AS "imageKey"
         FROM blog_posts
         WHERE data->'tags' @> jsonb_build_array(jsonb_build_object('slug', $1::text))
         ORDER BY position`,
        [tagSlug]
    )
    return rows
}

async function getTag(tagSlug) {
    const { rows } = await pool.query(
        'SELECT slug, name FROM blog_tags WHERE slug = $1',
        [tagSlug]
    )
    return rows[0] || null
}

export default defineEventHandler(async (req) => {
    const tagSlug = req.context.params.tag

    const postList = await getPostsWithTag(tagSlug)
    const tag = await getTag(tagSlug)

    if (!tag) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Tag not found'
        })
    }

    const responsePostList = postList.map((post) => {
        const imageFullUrl = `/api/image/blog/${post.imageKey}`

        const postDto = {
            slug: post.slug,
            title: post.title,
            image: imageFullUrl
        }
        return postDto
    })

    return {
        tag: {
            name: tag.name,
            slug: tag.slug
        },
        posts: responsePostList
    }
})
