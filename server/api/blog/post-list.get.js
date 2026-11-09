import { defineEventHandler } from 'h3'
import { pool } from '~/server/utils/postgres'

async function getAllPostList() {
    const { rows } = await pool.query(
        `SELECT slug, title, data->>'imageKey' AS "imageKey"
         FROM blog_posts
         ORDER BY position`
    )
    return rows
}

export default defineEventHandler(async () => {
    const postList = await getAllPostList()

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
        posts: responsePostList
    }
})
