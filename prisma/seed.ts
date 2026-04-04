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


    const products = [
        {
            name: 'CN-MUSK',
            description: 'A sophisticated blend featuring Musk, White Rose, and Floral notes, grounded by Sandalwood. This fragrance offers a Red Rose powdery, Sweet, and Gardenia finish that feels incredibly Fresh.',
            originalPrice: 4500,
            discountPrice: 3500,
            category: 'Men',
            imageUrl: '/cn-musk.jpeg',
            stock: 50,
            isFeatured: true,
        },
        {
            name: 'CN-SIGNATURE',
            description: 'Our flagship scent opening with Citrus, Pineapple, Bergamot, Orange, and Lemon. The heart reveals Floral notes, Grapefruit, and Passionfruit, all resting on a smooth Sandalwood and Red Apple base.',
            originalPrice: 4500,
            discountPrice: 3500,
            category: 'Men',
            imageUrl: '/cn-signature.jpeg',
            stock: 50,
            isFeatured: true,
        },
        {
            name: 'LEGENDARY',
            description: 'A masterpiece of contrast. Fresh spicy notes and Citrus zest meet the calming essence of Lavender. The dry down is a rich blend of Woody accords, Brown sugar, Patchouli, and Orange.',
            originalPrice: 4500,
            discountPrice: 3500,
            category: 'Men',
            imageUrl: '/legendary.jpeg',
            stock: 45,
            isFeatured: true,
        },
        {
            name: 'Bloom Bella',
            description: 'An enchanting bouquet of White, Red, and Pink Roses. This fruity, sweet composition features Candy accords, vanilla orchid, Peony, and Jasmine, with a playful Strawberry tropical finish on Sandalwood.',
            originalPrice: 4500,
            discountPrice: 3500,
            category: 'Women',
            imageUrl: '/bloom-bella.jpeg',
            stock: 40,
            isFeatured: true,
        },
        {
            name: 'AGRANO LEATHER',
            description: 'Bold and evocative. Leathery accords intertwined with Amber and Woody warmth. Spicy notes of Thyme and Saffron meet the elegance of Jasmine, Dark Roses, Lavender, and Sandalwood.',
            originalPrice: 4500,
            discountPrice: 3500,
            category: 'Men',
            imageUrl: '/agrano-leather.jpeg',
            stock: 15,
            isFeatured: true,
        },
    ]

    for (const product of products) {
        await prisma.product.upsert({
            where: { name: product.name },
            update: product,
            create: product,
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
