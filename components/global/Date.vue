<template>
    <div class="date">
        <span class="date__text">Опубліковано:</span>
        <span class="date__item"> {{ day }} </span>
        <span class="date__item"> {{ month }} </span>
        <span class="date__item"> {{ year }} </span>
    </div>
</template>

<script>
import { defineComponent, toRefs, unref } from 'vue'

export default defineComponent({
    name: 'Date',
    props: {
        date: {
            type: String,
            required: true
        }
    },

    setup(props) {
        const { date } = toRefs(props)

        const newDate = new Date(unref(date))

        const day = String(newDate.getUTCDate()).padStart(2, '0')
        const month = String(newDate.getUTCMonth() + 1).padStart(2, '0')
        const year = newDate.getUTCFullYear()

        return {
            day,
            month,
            year
        }
    }
})
</script>

<style lang="scss" scoped>
@import './styles/date';
</style>
