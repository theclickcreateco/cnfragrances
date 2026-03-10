import { NextResponse } from 'next/server';
import { prisma } from "@/app/db";

export async function GET() {
    try {
        const featuredProducts = await prisma.product.findMany({
            where: { isFeatured: true },
            take: 5,
        });
        return NextResponse.json(featuredProducts);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
    }
}
