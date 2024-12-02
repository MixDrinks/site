<template>
    <div class="image-upload">
        <div class="image-upload__header">
            <h1 class="image-upload__title">Upload Image</h1>
        </div>
        <form
            @submit.prevent="handleUpload"
            @dragover.prevent
            @drop.prevent="handleDrop"
            class="image-upload__form"
        >
            <div
                @dragover.prevent
                @dragenter.prevent
                @drop.prevent="handleDrop"
                class="image-upload__drag-area"
            >
                <p class="image-upload__drag-text">
                    Drag and drop an image here, or
                </p>
                <input
                    ref="fileInput"
                    @change="handleFileChange"
                    hidden
                    type="file"
                    accept="image/*"
                    class="image-upload__input"
                />
                <button
                    @click="browseFiles"
                    type="button"
                    class="image-upload__browse-button"
                >
                    Browse
                </button>
            </div>
            <div v-if="previewImage" class="image-upload__preview">
                <img
                    :src="previewImage"
                    alt="Preview"
                    class="image-upload__preview-image"
                />
            </div>
            <button
                :disabled="!selectedFile"
                type="submit"
                class="image-upload__submit"
            >
                Upload
            </button>
            <p v-if="errorMessage" class="image-upload__error">
                {{ errorMessage }}
            </p>
        </form>
    </div>
</template>

<script>
import { useFetch } from 'nuxt/app'

export default {
    name: 'ImageUpload',
    data() {
        return {
            selectedFile: null,
            previewImage: null,
            errorMessage: ''
        }
    },
    methods: {
        browseFiles() {
            this.$refs.fileInput.click()
        },
        handleFileChange(event) {
            const file = event.target.files[0]
            this.processFile(file)
        },
        handleDrop(event) {
            const file = event.dataTransfer.files[0]
            this.processFile(file)
        },
        processFile(file) {
            if (file && file.type.startsWith('image/')) {
                this.selectedFile = file
                this.errorMessage = ''

                // Generate a preview
                const reader = new FileReader()
                reader.onload = (e) => {
                    this.previewImage = e.target.result
                }
                reader.readAsDataURL(file)
            } else {
                this.errorMessage = 'Please select a valid image file.'
                this.selectedFile = null
                this.previewImage = null
            }
        },
        async handleUpload() {
            if (!this.selectedFile) return

            const formData = new FormData()
            formData.append('file', this.selectedFile)

            try {
                const { data, error } = await useFetch(
                    '/api/admin/image/upload',
                    {
                        method: 'POST',
                        body: formData
                    }
                )

                if (error.value) {
                    this.errorMessage = 'Upload failed. Please try again.'
                    return
                }

                console.log('Upload successful:', data.value)
                this.selectedFile = null
                this.previewImage = null
            } catch (err) {
                this.errorMessage =
                    'Something went wrong. Please try again later.'
                console.error(err)
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.image-upload {
    &__header {
        margin-bottom: $shortMargin;
        text-align: center;
    }

    &__title {
        font-size: 24px;
        font-weight: bold;
        margin-bottom: $halfShortMargin;
    }

    &__form {
        max-width: 400px;
        margin: 0 auto;
        padding: 20px;
        border: 1px solid rgb(231, 226, 222);
        border-radius: 8px;
        background-color: #fff;
        text-align: center;
    }

    &__drag-area {
        margin-bottom: $shortMargin;
        padding: 20px;
        border: 2px dashed #ccc;
        border-radius: 4px;
        cursor: pointer;

        &:hover {
            background-color: #f9f9f9;
        }
    }

    &__drag-text {
        margin-bottom: $halfShortMargin;
    }

    &__browse-button {
        padding: 10px 20px;
        background-color: $colorMain;
        color: #fff;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 16px;
        transition: background-color $defaultAnimTime;

        &:hover {
            background-color: $colorHover;
        }
    }

    &__preview {
        margin-bottom: $shortMargin;

        &-image {
            max-width: 100%;
            height: auto;
            border-radius: 4px;
            margin-top: $halfShortMargin;
        }
    }

    &__submit {
        width: 100%;
        padding: 12px;
        background-color: $colorMain;
        color: #fff;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 18px;
        font-weight: bold;
        transition: background-color $defaultAnimTime;

        &:disabled {
            background-color: #ccc;
            cursor: not-allowed;
        }

        &:hover:not(:disabled) {
            background-color: $colorHover;
        }
    }

    &__error {
        color: red;
        margin-top: $halfShortMargin;
    }
}
</style>
