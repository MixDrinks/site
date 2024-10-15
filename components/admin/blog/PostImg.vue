<template>
    <img
        :src="values.imgUrl"
        alt=""
        class="img"
        width="410"
        height="200"
        title=""
    />
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'PostImg',
    props: {
        values: {
            type: Object,
            required: true
        }
    }
})
</script>

<style lang="scss" scoped>
@import './styles/post-img';
</style>
