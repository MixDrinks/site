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
  font-size: 0;
  position: relative;
  width: 48px;
  height: 48px;

  border-radius: 50%;
  transition: background-color $defaultAnimTime;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: block;
    mask-position: center;
    mask-repeat: no-repeat;
    mask-image: url("/svg/icons/arrow.svg");
    background-color: $colorMain;

    transition: background-color $defaultAnimTime;
  }
  &:not(.lock) {
    background-color: rgba($colorBlack, 0.5);
    &::before {
      background-color: $colorMain;
    }
  }
  &.lock {
    pointer-events: none;
    background-color: $colorWhite;
    &::before {
      background-color: rgba($colorBlack, 0.5);
    }
  }

  &--right {
    &::before {
      transform: rotate(180deg);
    }
  }
  &:not(:last-child) {
    margin-right: 10px;
  }
  &:not(.lock) {
    &:hover {
      background-color: $colorBlack;
    }
    &:hover:before {
      background-color: $colorWhite;
    }
  }
}
</style>
