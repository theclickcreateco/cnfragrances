import "dotenv/config";
import { prisma } from "./app/db";

async function check() {
    const products = await prisma.product.findMany();
    console.log(JSON.stringify(products, null, 2));
}

check();
