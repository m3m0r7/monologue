import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient();

export type Context = {
  prisma: PrismaClient
}

export async function createContext(): Promise<Context> {
  return {
    prisma,
  }
}
