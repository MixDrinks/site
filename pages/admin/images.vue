<template>
    <div class="images">
        <header class="images__header header">
            <div class="header__title title">
                <span class="title__label">Upload Images</span>
            </div>
        </header>
        <ImageUpload />
    </div>
</template>

<script>
import { defineComponent } from 'vue'
import { definePageMeta } from '#imports'
import { head } from '~~/utils/head'

import ImageUpload from '~~/components/admin/ImageUpload.vue'

export default defineComponent({
    name: 'UploadPage',
    components: {
        ImageUpload
    },
    async setup() {
        definePageMeta({
            layout: 'admin',
            pageTransition: {
                name: 'none'
            }
        })
        head({
            title: 'Upload Images',
            description: 'Upload Images',
            indexPage: false
        })
    }
})
</script>

<style lang="scss" scoped>
.images {
    &__header {
        min-height: 64px;
    }
}

.header {
    padding: 10px 16px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid rgb(43, 43, 56);

    &__title {
        display: flex;
        align-items: center;
    }
}
.title {
    &__label {
        color: rgb(255 255 255);
        @include fontSize18M;
    }
}
</style>
