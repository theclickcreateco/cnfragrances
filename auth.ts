import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/app/db"
// import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        Google,
        Credentials({
            name: "Credentials",
            credentials: {
                phone: { label: "Phone Number", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.phone || !credentials?.password) return null;

                const user = await prisma.user.findUnique({
                    where: { phone: credentials.phone as string } as any
                });

                if (!user || !user.password) return null;

                const isPasswordValid = await bcrypt.compare(
                    credentials.password as string,
                    (user as any).password
                );

                if (!isPasswordValid) return null;

                return user;
            }
        })
    ],
    pages: {
        signIn: "/account",
    },
    callbacks: {
        session({ session, user, token }) {
            if (session.user) {
                // For database adapter, 'user' is the db user object
                // For credentials, we might need to use 'token'
                session.user.id = user?.id || token?.sub || "";
            }
            return session;
        },
    },
    session: {
        strategy: "jwt", // Required for Credentials provider
    }
})
