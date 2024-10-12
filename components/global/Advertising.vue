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
import { defineComponent, onBeforeUnmount, onMounted } from 'vue'

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

        const loadFun = () => {
            if (!window.adsbygoogle) {
                loadAdsByGoogle()
            }
        }

        onMounted(() => {
            if (document.readyState === 'complete') {
                loadFun()
            } else {
                window.addEventListener('load', loadFun)
            }
        })
        onBeforeUnmount(() => {
            window.removeEventListener('load', loadFun)
        })

        onMounted(() => {
            if (window.adsbygoogle) {
                ;(adsbygoogle = window.adsbygoogle || []).push({})
            }
        })
    }
})
</script>

<style lang="scss" scoped>
@import './styles/date';
</style>
