<template>
    <main class="wrapper">
        <h1>Політика конфіденційності</h1>
        <p>
            Команда MixDrinks турбується про забезпечення безпеки даних
            користовачів сайту, мобільних додатоків та нашого REST API. Саме
            тому ми склали цю Політику конфіденційності, щоб ви не турбувалися
            про те, що відбувається з вашими персональними даними, ми не
            збирайємо ніяких персональних даних, в нас наших мобільних додатках
            є firebase analytics
        </p>

        <h2>1. ДАНІ ПРОЄКТУ</h2>
        <p>
            1.1 Усі дані що є на сайті є публічними та ви можете використовувати
            їх в довільній для вас формі
        </p>
        <p>
            1.2 Команда проекту не несе відповідальність за якість даних, та за
            те де вони будуть використані
        </p>

        <h2>2. ЗМІНА ЦІЄЇ ПОЛІТИКИ КОНФІДЕНЦІЙНОСТІ</h2>
        <p>
            2.1 Ця політика конфіденційності може час від часу змінюватися.
            Зміни, що вносяться до політики конфіденційності, будуть
            опубліковані на цій сторінці.
        </p>

        <h2>3. Авторизація</h2>
        <p>
            3.1 Для авторизації використовується firebase auth, ніяких даних в
            нас не зберігається google/firebase лише повертає нам унікальний uId
            який ми використовуємо в своїх системах для індентифікації
        </p>

        <h2>4. Звяжіться з нами</h2>
        <p>
            кщо у є запитання до даного документу, наповнення сайту або любі
            інші запитання, можете взязатися з нами через
            <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSdW4lCa0JMcIQ3gqDdGve-GxOQuqD3zbRpkKSQzkOyzzr0W2A/viewform"
                target="_blank"
            >
                форму </a
            >.
        </p>
    </main>
</template>

<script>
export default {
    name: 'privacy',
    computed: {
        canonical() {
            return process.env.baseUrl + this.$nuxt.$route.path
        },
    },
    head() {
        return {
            title: 'Колекція коктейлів 🍹 та рецептів до них в домашніх умовах',
            link: [{ rel: 'canonical', href: this.canonical }],
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: `Політика конфіденційності MixDrinks`,
                },
                {
                    hid: 'og:title',
                    name: 'og:title',
                    content: `Політика конфіденційності`,
                },
                {
                    hid: 'og:description',
                    property: 'og:description',
                    content: `Політика конфіденційності MixDrinks`,
                },
                {
                    hid: 'og:url',
                    property: 'og:url',
                    content: `${this.canonical}`,
                },
                { name: 'robots', content: 'noindex, nofollow' },
            ],
        }
    },
}
</script>
  
<style lang="scss" scoped>
.wrapper {
    @include defaultWrapper;
}
</style>
  