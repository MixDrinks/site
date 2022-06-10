<template>
  <div class="error">
    <component v-if="isMobile" :is="Error404Mob" :error="error" />
    <component v-else :is="Error404" :error="error" />
  </div>
</template>
<script>
export default {
  name: "error",
  props: {
    error: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    isMobile() {
      return this.$device.isMobile;
    },
  },
  methods: {
    Error404: () => {
      return import("~~/components/error/404.vue");
    },
    Error404Mob: () => {
      return import("~~/components/mobile/error/404.vue");
    },
  },
};
</script>
