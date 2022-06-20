<template>
  <footer class="footer">
    <div class="wrapper">
      <div class="footer__wrapper">
        <div class="footer__left">
          <div class="footer__item">
            <div class="footer__title">Зворотній зв'язок</div>
            <a
              class="footer__link"
              href="https://docs.google.com/forms/d/e/1FAIpQLSdW4lCa0JMcIQ3gqDdGve-GxOQuqD3zbRpkKSQzkOyzzr0W2A/viewform"
              target="_blank"
            >
              Форма зворотного зв'язку
            </a>
          </div>
        </div>
        <div class="footer__right">
          <div class="footer__item">
            <div class="footer__title">Про проєкт</div>
            <a
              class="footer__link"
              href="https://github.com/MixDrinks"
              target="_blank"
            >
              Код проєкту
            </a>
            <a
              class="footer__link"
              href="https://mixdrinks.github.io/backend/"
              target="_blank"
            >
              Документація API проєкту
            </a>
          </div>
          <div class="footer__item">
            <div class="footer__title">Розробники</div>
            <a
              class="footer__link"
              href="https://github.com/VovaStelmashchuk"
              target="_blank"
            >
              Back-end Volodymyr Stelmashchuk
            </a>
            <a
              class="footer__link"
              href="https://github.com/BuJlJlu"
              target="_blank"
            >
              Front-end Mykola Holovashchenko
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style lang="scss" scoped>
.wrapper {
  @include defaultWrapper;
}
.footer {
  &__right {
    display: flex;
  }
  &__wrapper {
    padding: $defaultPadding 0;
    display: flex;

    justify-content: space-between;
  }
  &__item {
    &:not(:last-child) {
      margin-right: $shortMargin;
    }
  }
  &__title {
    color: $colorWhite;
    @include fontSize18B;
    margin-bottom: $halfPadding;
  }
  &__link {
    @include fontSize16M;
    display: block;
    color: rgba($colorWhite, 0.8);
    padding: 5px;
    margin-left: -5px;
    transition: $defaultAnimTime border-color, $defaultAnimTime color;
    border-bottom: 1px solid transparent;
    &:hover {
      color: $colorWhite;
      border-color: $colorWhite;
    }
  }
  background-color: $colorMain;
}
</style>
