import { defineEventHandler } from 'h3'
import { db } from '~/server/utils/mongo'

async function getPostsWithTag(tagSlug) {
    return db
        .collection('blog')
        .find({ 'tags.slug': tagSlug })
        .project({ _id: 0, slug: 1, title: 1, imageKey: 1 })
        .toArray()
}

async function getTag(tagSlug) {
    return db.collection('blogTags').findOne({ slug: tagSlug })
}

export default defineEventHandler(async (req) => {
    const tagSlug = req.context.params.tag

    const postList = await getPostsWithTag(tagSlug)
    const tag = await getTag(tagSlug)

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
