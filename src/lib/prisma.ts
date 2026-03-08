import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../generated/prisma/client.js";

const connectionString = `mariadb://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}/${process.env.DATABASE_NAME}?connectionLimit=5`;
const adapter = new PrismaMariaDb(connectionString);
const prisma = new PrismaClient({ adapter });

export { prisma };