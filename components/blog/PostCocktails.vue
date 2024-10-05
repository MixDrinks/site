<template>
    <div class="cocktails">
        <CocktailsList :ads="false" :cocktails="values" />
    </div>
</template>

<script>
import CocktailsList from '../global/CocktailsList.vue'
export default {
    name: 'PostCocktails',
    components: { CocktailsList },
    props: {
        values: {
            type: Array,
            required: true
        }
    }
}
</script>

<style lang="scss" scoped>
@import './styles/post-cocktails';
</style>
