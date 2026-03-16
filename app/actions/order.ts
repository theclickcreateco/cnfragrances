'use server'

import { prisma } from '@/app/db'
import { auth } from '@/auth'

export async function createOrder(data: {
    trackingId: string;
    totalAmount: number;
    contactEmail: string;
    contactPhone: string;
    shippingAddress: string;
    items: {
        productId: string;
        quantity: number;
        price: number;
    }[];
}) {
    try {
        const session = await auth()
        const userId = session?.user?.id

        console.log('Attempting to create order with trackingId:', data.trackingId, 'for user:', userId || 'Guest')

        // 1. Validate stock and decrement it using a transaction
        const result = await prisma.$transaction(async (tx) => {
            // Check all products first
            for (const item of data.items) {
                const product = await tx.product.findUnique({
                    where: { id: item.productId },
                    select: { stock: true, name: true }
                })

                if (!product) {
                    throw new Error(`Product ${item.productId} not found`)
                }

                if (product.stock < item.quantity) {
                    throw new Error(`Insufficient stock for ${product.name}. Requested: ${item.quantity}, Available: ${product.stock}`)
                }

                // Decrement stock
                await tx.product.update({
                    where: { id: item.productId },
                    data: { stock: { decrement: item.quantity } }
                })
            }

            // 2. Create the order
            const order = await tx.order.create({
                data: {
                    trackingId: data.trackingId,
                    totalAmount: data.totalAmount,
                    contactEmail: data.contactEmail,
                    contactPhone: data.contactPhone,
                    shippingAddress: data.shippingAddress,
                    userId: userId,
                    orderItems: {
                        create: data.items.map((item) => ({
                            productId: item.productId,
                            quantity: item.quantity,
                            price: item.price,
                        })),
                    },
                },
            })

            return order
        })

        console.log('Order created successfully in database:', result.id)
        return { success: true, orderId: result.id }
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to create order'
        console.error('Detailed error creating order:', {
            error,
            message: errorMessage,
            stack: error instanceof Error ? error.stack : undefined,
            data
        })
        return { success: false, error: errorMessage }
    }
}
