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
        const order = await prisma.order.create({
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

        console.log('Order created successfully in database:', order.id)
        return { success: true, orderId: order.id }
    } catch (error) {
        console.error('Detailed error creating order:', {
            error,
            message: error instanceof Error ? error.message : 'Unknown error',
            stack: error instanceof Error ? error.stack : undefined,
            data
        })
        return { success: false, error: 'Failed to create order' }
    }
}
