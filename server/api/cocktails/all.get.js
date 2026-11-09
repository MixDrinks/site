import { defineEventHandler } from 'h3'
import { pool } from '~/server/utils/postgres'

async function getAllCocktails() {
    const { rows } = await pool.query(
        'SELECT name, slug FROM cocktails ORDER BY position'
    )
    return rows
}

export default defineEventHandler(async () => {
    const cocktails = await getAllCocktails()
    return cocktails
})
