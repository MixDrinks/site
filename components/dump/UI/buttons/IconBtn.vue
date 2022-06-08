<template>
  <NuxtLink
    class="btn"
    :class="[{ lock: lock }, `btn--${direction}`]"
    @click.native="click()"
    :to="href"
    v-if="isLink"
  >
    <slot />
  </NuxtLink>
  <button
    class="btn"
    :class="[{ lock: lock }, `btn--${direction}`]"
    v-else
    @click="click()"
  >
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
      default: "left",
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
  font-size: 0;
  line-height: 0;

  position: relative;

  background-color: $colorMain;

  transition: background-color $defaultAnimTime, box-shadow $defaultAnimTime;
  &::before {
    @include fullPseudoElement;

    mask-position: center;
    mask-repeat: no-repeat;
    mask-image: url("/img/icons/arrow.svg");
    background-color: $colorWhite;
  }
  &.lock {
    pointer-events: none;
    &::after {
      @include fullPseudoElement;

      background-color: rgba($colorWhite, 0.8);

      z-index: 1;
    }
  }
  &--right {
    &::before {
      transform: rotate(180deg);
    }
  }
  &:not(.lock) {
    &:hover {
      background-color: $colorHover;
      box-shadow: -5px -5px 40px rgba($colorHover, 0.1);
    }
  }
}
</style>
