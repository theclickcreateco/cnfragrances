import { NextResponse } from 'next/server';
import { prisma } from "@/app/db";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        console.log('Fetching product with ID:', id);
        const product = await prisma.product.findUnique({
            where: { id: id },
        });
        console.log('Product found:', product ? product.name : 'NOT FOUND');

        if (!product) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }

        return NextResponse.json(product);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
    }
}
