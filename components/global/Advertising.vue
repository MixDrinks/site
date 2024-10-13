<template>
    <ins
        class="adsbygoogle"
        style="display: block"
        data-ad-format="fluid"
        data-ad-layout-key="-gh-4+1q-51+45"
        data-ad-client="ca-pub-9033785625371866"
        data-ad-slot="2682031593"
    />
</template>

<script>
import { defineComponent, onMounted, onBeforeUnmount } from 'vue'

export default defineComponent({
    name: 'Advertising',

    setup() {
        function loadAdsByGoogle() {
            const script = document.createElement('script')
            script.src =
                'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9033785625371866'
            script.async = true
            document.body.appendChild(script)

            script.onload = function () {
                ;(adsbygoogle = window.adsbygoogle || []).push({})
            }
        }

        onBeforeUnmount(() => {
            window.removeEventListener('scroll', loadAdsByGoogle)
        })

        onMounted(() => {
            if (window.adsbygoogle) {
                ;(adsbygoogle = window.adsbygoogle || []).push({})
            } else {
                window.addEventListener('scroll', loadAdsByGoogle, {
                    once: true
                })
            }
        })
    }
})
</script>

<style lang="scss" scoped>
@import './styles/date';
</style>
