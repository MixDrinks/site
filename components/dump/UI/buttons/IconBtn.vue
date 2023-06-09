<template>
  <NuxtLink
    class="btn"
    :class="[{ 'btn--lock': lock }, `btn--${direction}`, `btn--${type}`]"
    @click.native="click()"
    :to="href"
    v-if="isLink"
  >
    <span
      class="btn__icon"
      :style="`mask-image: url(${icon}); -webkit-mask-image: url(${icon})`"
    ></span>
    <slot />
  </NuxtLink>
  <button
    class="btn"
    :class="[{ 'btn--lock': lock }, `btn--${direction}`, type]"
    v-else
    @click="click()"
  >
    <span
      class="btn__icon"
      :style="`mask-image: url(${icon}); -webkit-mask-image: url(${icon})`"
    ></span>
    <slot />
  </button>
</template>

<script>
export default {
  name: "IconBtn",
  props: {
    isLink: {
      type: Boolean,
      default: false,
    },
    href: {
      type: String,
      default: "/",
    },
    lock: {
      type: Boolean,
      default: false,
    },
    direction: {
      type: String,
      default: "top",
    },
    icon: {
      type: String,
      require: true,
    },
    type: {
      type: String,
      default: "big",
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
@import "./styles/icon-btn";
</style>
