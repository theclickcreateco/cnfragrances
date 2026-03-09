'use server'

import { prisma } from "@/app/db"
import bcrypt from "bcryptjs"

export async function registerWithPhone(formData: FormData) {
    const phone = formData.get("phone") as string;
    const password = formData.get("password") as string;
    const name = formData.get("name") as string;

    if (!phone || !password) {
        return { success: false, error: "Phone and password are required" };
    }

    try {
        const existingUser = await prisma.user.findUnique({
            where: { phone }
        });

        if (existingUser) {
            return { success: false, error: "Phone number already registered" };
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await prisma.user.create({
            data: {
                phone,
                password: hashedPassword,
                name: name || null
            }
        });

        return { success: true };
    } catch (error) {
        console.error("Registration error:", error);
        return { success: false, error: "Failed to register" };
    }
}
