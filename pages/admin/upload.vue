<template>
    <div class="upload-page">
        <ImageUpload />
    </div>
</template>

<script>
import { defineComponent } from 'vue'
import { useHead } from 'nuxt/app'

import ImageUpload from '~~/components/admin/ImageUpload.vue';

export default defineComponent({
    name: 'UploadPage',
    components: {
        ImageUpload,
    },

    setup() {
        useHead({
            meta: [{ name: 'robots', content: 'noindex, nofollow' }]
        })

        return {}
    }
})
</script>

<style lang="scss" scoped>
.upload-page {
    padding: 20px;

    @media (min-width: 1023px) {
        padding: 40px;
    }
}
</style>
