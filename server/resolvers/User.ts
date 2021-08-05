import { Context } from "../decleration";

export default {
    ticketsAuthored: (parent: any, _args: any, context: Context) =>
        context.prisma.user.findFirst({ where: { id: context.req.user!.id } }).ticketsAuthored(),
    createdProjects: (parent: any, _args: any, context: Context) =>
        context.prisma.user.findFirst({ where: { id: context.req.user!.id } }).createdProjects(),
    assignedTickets: (parent: any, _args: any, context: Context) =>
        context.prisma.user.findFirst({ where: { id: context.req.user!.id } }).assignedTickets(),
    comments: (parent: any, _args: any, context: Context) =>
        context.prisma.user.findFirst({ where: { id: context.req.user!.id } }).comments(),
    associatedProjects: (parent: any, _args: any, context: Context) =>
        context.prisma.user.findFirst({ where: { id: context.req.user!.id } }).associatedProjects(),
};
