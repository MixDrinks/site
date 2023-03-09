<template>
  <Error404 :error="error" />
</template>
<script>
import Error404 from '~~/components/error/404.vue'
export default {
  components: {
    Error404
  },
  name: "error",
  props: {
    error: {
      type: Object,
      default: () => {},
    },
  },
};
</script>
