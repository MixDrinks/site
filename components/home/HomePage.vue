<template>
  <div>
    <div class="" v-for="cocktail in cocktails" :key="cocktail.id">
      {{ cocktail.name }}
    </div>
  </div>
</template>

<script>
export default {
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
