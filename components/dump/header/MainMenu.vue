<template>
  <ul class="menu">
    <li class="menu__item" v-for="listItem in menuList" :key="listItem.id">
      <NuxtLink class="menu__link" :to="listItem.url">
        {{ listItem.title }}
      </NuxtLink>
    </li>
  </ul>
</template>

<script>
export default {
  name: "MainMenu",
  data: () => ({
    menuList: [
      {
        title: "firstItem",
        url: "/",
        id: 1,
      },
      {
        title: "secondItem",
        url: "/",
        id: 2,
      },
      {
        title: "thirdItem",
        url: "/",
        id: 3,
      },
      {
        title: "fourthItem",
        url: "/",
        id: 4,
      },
    ],
  }),
};
</script>

<style lang="scss" scoped>
.menu {
  display: flex;
  margin: -16px;
  &__item {
    padding: 16px;
  }
  &__link {
    @include fontSize24B;
    color: $colorWhite;

    transition: color $defaultAnimTime, text-shadow $defaultAnimTime;
    &:hover {
      color: rgba($colorWhite, 0.9);
      text-shadow: 4px 4px 0px$colorBlack;
    }
  }
}
</style>
