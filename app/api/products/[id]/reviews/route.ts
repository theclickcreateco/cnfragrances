import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/app/db";

export async function POST(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await auth();

    if (!session?.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { id } = await params;
        const { rating, comment } = await request.json();

        if (!rating || rating < 1 || rating > 5) {
            return NextResponse.json({ error: "Invalid rating" }, { status: 400 });
        }

        const review = await prisma.review.upsert({
            where: {
                userId_productId: {
                    userId: session.user.id,
                    productId: id,
                },
            },
            update: {
                rating,
                comment,
            },
            create: {
                rating,
                comment,
                userId: session.user.id,
                productId: id,
            },
        });

        return NextResponse.json(review);
    } catch (error) {
        console.error("Failed to submit review:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const reviews = await prisma.review.findMany({
            where: { productId: id },
            include: {
                user: {
                    select: { name: true, image: true }
                }
            },
            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json({
            reviews,
            average: reviews.length > 0 ? reviews.reduce((acc: number, r: any) => acc + r.rating, 0) / reviews.length : 0,
            total: reviews.length
        });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 });
    }
}
