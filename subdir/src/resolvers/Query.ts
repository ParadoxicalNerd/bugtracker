import { PrismaClient } from "@prisma/client";
import { Context } from "src/decleration";

export default {
    project: (_parent: any, args: { id: string }, context: Context) =>
        context.prisma.project.findFirst({ where: { id: args.id } }),
    ticket: (_parent: any, args: { id: string }, context: Context) =>
        context.prisma.ticket.findFirst({ where: { id: args.id } }),
    user: (_parent: any, args: any, context: Context) =>
        context.prisma.user.findFirst({ where: { id: context.req.user!.id } }),
    allProjects: (_parent: any, _args: any, context: Context) => context.prisma.project.findMany(),
    allUsers: (_parent: any, _args: any, context: Context) => context.prisma.user.findMany(),
};
