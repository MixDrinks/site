<template>
  <footer class="footer">
    <div class="footer__content footer-content">
      <div class="footer-content__communication footer-content-communication">
        <div class="footer-content-communication__item footer-content-communication-item">
          <h4 class="footer-content-communication-item__title footer-content-communication-item-title">
            <span class="footer-content-communication-item-title__label">
              Зворотній зв'язок
            </span>
          </h4>
            <a
              class="footer-content-communication-item__link"
              href="https://docs.google.com/forms/d/e/1FAIpQLSdW4lCa0JMcIQ3gqDdGve-GxOQuqD3zbRpkKSQzkOyzzr0W2A/viewform"
              target="_blank"
            >
              Форма зворотного зв'язку
            </a>
          </div>
        </div>
        <div class="footer-content__about footer-content-about">
          <div class="footer-content-about__item footer-content-about-item">
            <h4 class="footer-content-about-item__title footer-content-about-item-title">
              <span class="footer-content-about-item-title__label">
                Публічні документи
              </span>
            </h4>
            <a
                class="footer-content-about-item__link"
                href="/privacy"
                target="_blank"
            >
              Політика конфіденційності
            </a>
          </div>
          <div class="footer-content-about__item footer-content-about-item">
            <h4 class="footer-content-about-item__title footer-content-about-item-title">
              <span class="footer-content-about-item-title__label">
                Про проєкт
              </span>
            </h4>
            <a
              class="footer-content-about-item__link"
              href="https://github.com/MixDrinks"
              target="_blank"
            >
              Код проєкту
            </a>
            <a
              class="footer-content-about-item__link"
              href="https://api.mixdrinks.org/docs/index.html"
              target="_blank"
            >
              Документація API проєкту
            </a>
          </div>
          <div class="footer-content-about__item footer-content-about-item">
            <h4 class="footer-content-about-item__title footer-content-about-item-title">
              <span class="footer-content-about-item-title__label">
                Розробники
              </span>
            </h4>
            <a
              class="footer-content-about-item__link"
              href="https://bento.me/vovastelmashchuk"
              target="_blank"
            >
              Back-end Volodymyr Stelmashchuk
            </a>
            <a
              class="footer-content-about-item__link"
              href="https://github.com/BuJlJlu"
              target="_blank"
            >
              Front-end Mykola Holovashchenko
            </a>
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
@import './styles/footer'
</style>
