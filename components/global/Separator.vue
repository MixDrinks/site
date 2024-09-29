<template>
    <span class="separator">
        <img
            class="separator__img"
            width="20"
            height="20"
            alt="MixDrinks logo"
            title="MixDrinks logo"
            src="/img/logo.png"
        />
    </span>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'Separator'
})
</script>

<style lang="scss" scoped>
@import './styles/separator';
</style>
