import { PrismaClient } from '@prisma/client'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import * as dotenv from 'dotenv'

dotenv.config()

const connectionString = `${process.env.DATABASE_URL}`
const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
    console.log('--- USERS ---')
    const users = await prisma.user.findMany({
        select: { id: true, email: true, name: true }
    })
    console.log(users)

    console.log('\n--- ORDERS ---')
    const orders = await prisma.order.findMany({
        select: { id: true, trackingId: true, userId: true, contactEmail: true, createdAt: true }
    })
    console.log(orders)

    console.log('\n--- SESSION CHECK ---')
    const sessions = await prisma.session.findMany()
    console.log('Active Sessions:', sessions.length)
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect())
