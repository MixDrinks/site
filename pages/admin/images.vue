<template>
  <div class="upload-page">
    <header class="upload-page__header header">
      <div class="header__title title">
        <span class="title__label">Upload Images</span>
      </div>
    </header>
    <div class="upload-page__content">
      <ImageUpload />
    </div>
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
    ImageUpload,
  },
  async setup() {
    definePageMeta({
      layout: 'admin',
      pageTransition: {
        name: 'none',
      },
    })
    head({
      title: 'Upload Images',
      description: 'Upload Images',
      indexPage: false,
    })
    return {}
  }
})
</script>

<style lang="scss" scoped>
.upload-page {
  &__header {
    min-height: 80px;
    padding: 16px 10px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid rgb(43, 43, 56);
  }
  &__content {
    padding: 20px;
    @media (min-width: 1023px) {
      padding: 40px;
    }
  }
}

.header {
  &__title {
    display: flex;
    align-items: center;

    .title__label {
      color: #ffffff;
      font-size: 20px;
      font-weight: 500;
      line-height: 1.2;
    }
  }
}

.images-list {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;

  &__item {
    width: 150px;
    text-align: center;

    .image-item__img {
      width: 100%;
      height: auto;
      border: 1px solid #ccc;
      border-radius: 4px;
    }

    .image-item__info {
      margin-top: 8px;

      .image-item__name {
        font-size: 14px;
        color: #ccc;
      }
    }
  }
}

.no-images {
  color: #999;
  font-size: 16px;
  text-align: center;
  margin-top: 20px;
}
</style>
