import PostTitle from '~~/components/blog/PostTitle.vue'
import PostText from '~~/components/blog/PostText.vue'
import PostImg from '~~/components/blog/PostImg.vue'
import PostCocktail from '~~/components/blog/PostCocktail.vue'
import PostCocktails from '~~/components/blog/PostCocktails.vue'

import PostAdminTitle from '~~/components/admin/blog/PostTitle.vue'
import PostAdminText from '~~/components/admin/blog/PostText.vue'
import PostAdminImg from '~~/components/admin/blog/PostImg.vue'
import PostAdminCocktail from '~~/components/admin/blog/PostCocktail.vue'
import PostAdminCocktails from '~~/components/admin/blog/PostCocktails.vue'

export const types = {
    image: PostImg,
    title_h2: PostTitle,
    text: PostText,
    cocktail: PostCocktail,
    cocktail_collection: PostCocktails
}

export const adminTypes = {
    image: PostAdminImg,
    title_h2: PostAdminTitle,
    text: PostAdminText,
    cocktail: PostAdminCocktail,
    cocktail_collection: PostAdminCocktails
}

export const typesTitle = {
    image: 'Картинка',
    title_h2: 'Заголовок H2',
    text: 'Текст',
    cocktail: 'Коктейль',
    cocktail_collection: 'Коктейлі'
}
