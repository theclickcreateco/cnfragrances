import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'

const connectionString = `${process.env.DATABASE_URL}`
const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
    console.log('Seeding products...')

    // Clean existing products
    await prisma.product.deleteMany()

    const products = [
        {
            name: 'Aqua Di Giò',
            description: 'A classic men\'s fragrance blending marine notes with citrus and woods.',
            price: 95.0,
            category: 'Men',
            imageUrl: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=800&auto=format&fit=crop',
            stock: 50,
            isFeatured: true,
        },
        {
            name: 'Chanel No. 5',
            description: 'The ultimate floral aldehyde fragrance for women. Timeless and elegant.',
            price: 135.0,
            category: 'Women',
            imageUrl: 'https://images.unsplash.com/photo-1595535373300-d4111d4e4c27?q=80&w=800&auto=format&fit=crop',
            stock: 30,
            isFeatured: true,
        },
        {
            name: 'Sauvage by Dior',
            description: 'A radically fresh composition, dictated by a name that has the ring of a manifesto.',
            price: 110.0,
            category: 'Men',
            imageUrl: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?q=80&w=800&auto=format&fit=crop',
            stock: 45,
            isFeatured: true,
        },
        {
            name: 'Tom Ford Oud Wood',
            description: 'Rare. Exotic. Distinctive. One of the most rare, precious, and expensive ingredients in a perfumer\'s arsenal.',
            price: 250.0,
            category: 'Men',
            imageUrl: 'https://images.unsplash.com/photo-1615397323386-81498b95fb42?q=80&w=800&auto=format&fit=crop',
            stock: 15,
            isFeatured: true,
        },
        {
            name: 'Bleu de Chanel',
            description: 'A woody, aromatic fragrance for the man who defies convention.',
            price: 130.0,
            category: 'Men',
            imageUrl: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=800&auto=format&fit=crop',
            stock: 40,
            isFeatured: true,
        },
    ]

    for (const product of products) {
        await prisma.product.create({
            data: product,
        })
    }

    console.log('Database seeded successfully!')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
