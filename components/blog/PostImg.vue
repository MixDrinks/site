<template>
    <img
        alt=""
        src="https://mixdrinks-cdn.vovastelmashchuk.site/cocktails/561/560/561.webp"
        class="post__img"
        width="410"
        height="200"
        title=""
    />
</template>

<script>
export default {
    name: 'PostImg',
    props: {
        values: {
            type: Object,
            required: true,
        },
    },
}
</script>

<style lang="scss" scoped>
@import './styles/post-img';
</style>
