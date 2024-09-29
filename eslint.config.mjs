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
        'vue/attribute-hyphenation': ['error', 'never'],
        'vue/attributes-order': [
            'error',
            {
                order: [
                    'DEFINITION',
                    'CONDITIONALS',
                    'LIST_RENDERING',
                    'UNIQUE',
                    'RENDER_MODIFIERS',
                    'GLOBAL',
                    'SLOT',
                    'EVENTS',
                    'TWO_WAY_BINDING',
                    'OTHER_DIRECTIVES',
                    'CONTENT',
                    'ATTR_DYNAMIC',
                    'ATTR_SHORTHAND_BOOL',
                    'ATTR_STATIC'
                ],
                alphabetical: false
            }
        ]
    }
})
