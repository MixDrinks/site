<template>
  <div>
    <h1>Redirect page</h1>
    <div id="app">
      <div class="grid-container">
        <div class="grid-item" v-for="item in redirectList" :key="item.to">
          <p>{{ item.to }} - {{ item.from }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "RedirectListPage",
  props: {
    redirectList: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style scoped lang="scss">
@import "./styles/redirect";
</style>