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
            where: { phone } as any
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
            } as any
        });

        return { success: true };
    } catch (error: any) {
        console.error("Registration error details:", {
            message: error.message,
            code: error.code,
            meta: error.meta
        });
        return { success: false, error: `Registration error: ${error.message || "Unknown error"}` };
    }
}
