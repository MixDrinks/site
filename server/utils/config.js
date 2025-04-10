import fs from 'fs'

const runtimeConfig = useRuntimeConfig().public

export function getConfig() {
    const asText = fs.readFileSync(runtimeConfig.secretFile, 'utf8')
    return JSON.parse(asText)
}

export function getCommitSha() {
    return runtimeConfig.gitCommitSha || 'unknown'
}

export function getDomain() {
    return runtimeConfig.domain
}
