import { defineEventHandler } from 'h3'
import { handleFilterRequest } from '~/server/utils/filters/request'

export default defineEventHandler((event) => handleFilterRequest(event, {}))
