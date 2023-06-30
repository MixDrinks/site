<template>
  <div class="сomponents">
    <h2 class="сomponents__title сomponents-title">
      <span class="сomponents-title__label">
        {{ title }}
      </span>
    </h2>
    <div
      class="сomponents__counter сomponents-counter"
      v-if="withCounter"
    >
      <IconBtn
        class="сomponents-counter__btn сomponents-counter__btn--dec"
        :lock="counter === 1"
        icon="/img/icons/minus.svg"
        @click="dec()"
      />

      <div class="сomponents-counter__value">
        {{ counter }}
      </div>
      <IconBtn
        class="сomponents-counter__btn сomponents-counter__btn--inc"
        icon="/img/icons/plus.svg"
        @click="inc()"
      />
    </div>
    <ul class="сomponents__list сomponents-list">
      <li
        :data-cy="cyAttribute"
        class="сomponents-list__item сomponents-list-item"
        v-for="item in components"
        :key="item.url"
      >
        <NuxtLink
          class="сomponents-list-item__link сomponents-list-item-link"
          :to="`/${item.url}`"
        >
          <picture class="сomponents-list-item-link__picture">
            <source
              v-for="img in item.images"
              :key="img.id"
              :srcset="img.srcset"
              :media="img.media"
              :type="img.type"
            />
            <img
              class="сomponents-list-item-link__img"
              width="142"
              height="142"
              loading="lazy"
              :alt="`Зображення ${item.name}`"
              title=""
            />
          </picture>
          <div class="сomponents-list-item-link__label">
            {{ item.name }}
            <template v-if="item.amount">
              <br />
              <strong> {{ item.amount * counter }} {{ item.unit }}. </strong>
            </template>
          </div>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script>
import IconBtn from "~/components/dump/UI/buttons/IconBtn";

export default {
  name: "CocktailComponents",
  components: { IconBtn },
  data: () => ({
    counter: 1,
  }),
  methods: {
    inc() {
      this.counter++;
    },
    dec() {
      if (this.counter > 1) {
        this.counter--;
      }
    },
  },
  props: {
    components: {
      type: Array,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    cyAttribute: {
      type: String,
      required: true,
    },
    withCounter: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./styles/cocktail-components";
</style>
