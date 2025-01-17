import { defineEventHandler } from 'h3'
import { db } from '~/server/utils/mongo'

const imageDomain = useRuntimeConfig().public.imageDomain

async function getAllPostList() {
    return db
        .collection('blog')
        .find()
        .project({ _id: 0, slug: 1, title: 1, image: 1 })
        .toArray()
}

export default defineEventHandler(async () => {
    const postList = await getAllPostList()

    const responsePostList = postList.map((post) => {
        const imageFullUrl = `${imageDomain}/${post.image}`

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
