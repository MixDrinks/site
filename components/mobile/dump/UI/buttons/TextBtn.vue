<template>
  <NuxtLink class="btn" @click.native="click()" :to="href" v-if="isLink">
    <slot />
  </NuxtLink>
  <button class="btn" v-else @click="click()">
    <slot />
  </button>
</template>

<script>
export default {
  name: "TextBtn",
  props: {
    isLink: {
      type: Boolean,
      default: false,
    },
    href: {
      type: String,
      default: "/",
    },
  },
  methods: {
    click() {
      this.$emit("click");
    },
  },
};
</script>

<style lang="scss" scoped>
.btn {
  @include defaultBtn;
  @include fontSize18M;
  color: $colorWhite;

  background-color: $colorMain;

  transition: color $defaultAnimTime, background-color $defaultAnimTime,
    box-shadow $defaultAnimTime;
  &:hover,
  &:focus {
    background-color: $colorHover;
    color: $colorWhite;
    box-shadow: -5px -5px 40px rgba($colorHover, 0.1);
  }
}
</style>
