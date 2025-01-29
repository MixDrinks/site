import fs from 'fs'
import { useRuntimeConfig } from 'nuxt/app'

const runtimeConfig = useRuntimeConfig().public

export function getConfig() {
    const asText = fs.readFileSync(runtimeConfig.secretFile, 'utf8')
    return JSON.parse(asText)
}

export function getCommitSha() {
    return runtimeConfig.gitCommitSha || 'unknown'
}
