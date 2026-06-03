import "dotenv/config";

import {PrismaPg} from "@prisma/adapter-pg";
import {PrismaClient} from "../../generated/prisma/client";

const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaPg({connectionString});
const prisma = new PrismaClient({
    adapter,
    //log: ["query", "warn", "error"] # Enable Prisma query logging if wanted!
});

export { prisma };