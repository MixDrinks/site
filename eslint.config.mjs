import { createConfigForNuxt } from '@nuxt/eslint-config/flat'

export default createConfigForNuxt({}).override('nuxt/vue/rules', {
    rules: {
        'vue/html-self-closing': [
            'warn',
            {
                html: {
                    normal: 'always',
                    void: 'always'
                }
            }
        ],
        'vue/attribute-hyphenation': ['error', 'never']
    }
})
