import { PrismaClient } from '@prisma/client'

interface Context {
    prisma: PrismaClient
}

export default {
    author: (parent: { id: string }, _args: any, context: Context) => (
        context.prisma.comment.findFirst({ where: { id: parent.id } }).author()
    ),
    ticket: (parent: { id: string }, _args: any, context: Context) => (
        context.prisma.comment.findFirst({ where: { id: parent.id } }).ticket()
    ),
}