<template>
  <NuxtLink
    class="btn"
    :class="[{ lock: lock }, `btn--${direction}`, type]"
    @click.native="click()"
    :to="href"
    v-if="isLink"
  >
    <span
      class="btn__icon icon"
      :style="`mask-image: url(${icon}); -webkit-mask-image: url(${icon})`"
    ></span>
    <slot />
  </NuxtLink>
  <button
    class="btn"
    :class="[{ lock: lock }, `btn--${direction}`, type]"
    v-else
    @click="click()"
  >
    <span
      class="btn__icon icon"
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
.btn {
  @include defaultBtn;
  font-size: 0;
  line-height: 0;

  position: relative;

  background-color: $colorMain;

  transition: background-color $defaultAnimTime, box-shadow $defaultAnimTime;
  .icon {
    @include fullPseudoElement;

    mask-size: 20px;
    mask-position: center;
    mask-repeat: no-repeat;
    background-color: $colorWhite;
  }
  &.short {
    min-width: 30px;
    min-height: 30px;
    .icon {
      mask-size: 14px;
    }
  }
  &.lock {
    pointer-events: none;
    &::after {
      @include fullPseudoElement;

      background-color: rgba($colorWhite, 0.8);

      z-index: 1;
    }
  }
  &--bottom {
    .icon {
      transform: rotate(180deg);
    }
  }
  &:not(.lock) {
    &:focus {
      background-color: $colorHover;
      box-shadow: -5px -5px 40px rgba($colorHover, 0.1);
    }
  }
}
</style>
