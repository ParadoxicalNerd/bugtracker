import { PrismaClient } from '@prisma/client'

interface Context {
    prisma: PrismaClient
}

export default {
    project: (parent: { id: string }, _args: any, context: Context) => (
        context.prisma.ticket.findFirst({ where: { id: parent.id } }).project()
    ),
    author: (parent: { id: string }, _args: any, context: Context) => (
        context.prisma.ticket.findFirst({ where: { id: parent.id } }).author()
    ),
    assignedTo: (parent: { id: string }, _args: any, context: Context) => (
        context.prisma.ticket.findFirst({ where: { id: parent.id } }).assignedTo()
    ),
    comments: async (parent: { id: string }, _args: any, context: Context) => (
        context.prisma.ticket.findFirst({ where: { id: parent.id } }).comments()
    )
}