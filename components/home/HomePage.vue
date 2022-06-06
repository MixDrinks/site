<template>
  <div>
    <SearchField :list="cocktails" />
    <div class="" v-for="cocktail in cocktails" :key="cocktail.id">
      {{ cocktail.name }}
    </div>
  </div>
</template>

<script>
import SearchField from "../dump/UI/UX/SearchField.vue";
export default {
  components: { SearchField },
  name: "HomePage",
  props: {
    cocktails: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped></style>
