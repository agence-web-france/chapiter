import { PrismaAdapter } from "libs/next-crud/dist"
import NextCrud from "libs/next-crud/dist/handler"
import { prisma } from "prisma/PrismaClient"

const handler = NextCrud({
  adapter: new PrismaAdapter({
    prismaClient: prisma,
  }),
})
export default handler