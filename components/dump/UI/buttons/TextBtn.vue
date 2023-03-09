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
@import './styles/text-btn.scss'
</style>
