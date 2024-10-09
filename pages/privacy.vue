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
        <TitleH2 text="1. Дані проєкту" />
        <p>
            1.1 Усі дані що є на сайті є публічними та ви можете використовувати
            їх в довільній для вас формі
        </p>
        <p>
            1.2 Команда проекту не несе відповідальність за якість даних, та за
            те де вони будуть використані
        </p>
        <TitleH2 text="2. Зміна цієї політики конфіденційності" />
        <p>
            2.1 Ця політика конфіденційності може час від часу змінюватися.
            Зміни, що вносяться до політики конфіденційності, будуть
            опубліковані на цій сторінці.
        </p>
        <TitleH2 text="3. Авторизація" />
        <p>
            3.1 Для авторизації використовується firebase auth, ніяких даних в
            нас не зберігається google/firebase лише повертає нам унікальний uId
            який ми використовуємо в своїх системах для індентифікації
        </p>
        <TitleH2 text="4. Звяжіться з нами" />
        <p>
            Якщо у є запитання до даного документу, наповнення сайту або любі
            інші запитання, можете взязатися з нами через
            <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSdW4lCa0JMcIQ3gqDdGve-GxOQuqD3zbRpkKSQzkOyzzr0W2A/viewform"
                target="_blank"
                >форму</a
            >.
        </p>
    </main>
</template>

<script>
import { defineComponent } from 'vue'
import TitleH2 from '~~/components/global/TitleH2.vue'
import { head } from '~~/utils/head'

export default defineComponent({
    name: 'Privacy',
    components: { TitleH2 },

    setup() {
        head({
            title: 'Політика конфіденційності',
            description: 'Політика конфіденційності MixDrinks',
            indexPage: true
        })
    }
})
</script>

<style lang="scss" scoped>
.wrapper {
    max-width: 1000px;
    overflow: hidden;
    margin-left: auto;
    margin-right: auto;
    padding-left: 40px;
    padding-bottom: 10px;
    padding-right: 40px;

    h1 {
        @include fontSize24B;

        @media (min-width: 1023px) {
            @include fontSize32B;
        }
    }
    h1,
    h2 {
        &:not(:last-child) {
            margin-bottom: $halfShortMargin;
        }
    }
    p {
        text-align: justify;
        &:not(:last-child) {
            margin-bottom: 12px;
        }
    }
    a {
        $self: &;
        position: relative;
        color: hsl(98, 53%, 45%);
        transition: color $defaultAnimTime;

        &::after {
            content: '';
            position: absolute;
            top: calc(100% + 2px);
            left: 0;
            right: 0;
            height: 1px;
            background-color: hsl(98, 53%, 45%);
            transition: background-color $defaultAnimTime;
        }

        &:focus {
            color: $colorHover;

            &::after {
                background-color: $colorHover;
            }
        }

        @media (hover: hover) {
            &:hover {
                color: $colorHover;

                &::after {
                    background-color: $colorHover;
                }
            }
        }
    }
}
</style>
