import { PrismaClient } from '@prisma/client'

interface Context {
    prisma: PrismaClient
}

export default {
    author: (parent: { id: string }, _args: any, context: Context) => (
        context.prisma.project.findFirst({ where: { id: parent.id } }).author()
    ),
    associatedUsers: (parent: { id: string }, _args: any, context: Context) => (
        context.prisma.project.findFirst({ where: { id: parent.id } }).associatedUsers()
    ),
    tickets: (parent: { id: string }, _args: any, context: Context) => (
        context.prisma.project.findFirst({ where: { id: parent.id } }).tickets()
    )
}