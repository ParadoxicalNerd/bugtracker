"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    ticketsAuthored: (parent, _args, context) => context.prisma.user.findFirst({ where: { id: context.req.user.id } }).ticketsAuthored(),
    createdProjects: (parent, _args, context) => context.prisma.user.findFirst({ where: { id: context.req.user.id } }).createdProjects(),
    assignedTickets: (parent, _args, context) => context.prisma.user.findFirst({ where: { id: context.req.user.id } }).assignedTickets(),
    comments: (parent, _args, context) => context.prisma.user.findFirst({ where: { id: context.req.user.id } }).comments(),
    associatedProjects: (parent, _args, context) => context.prisma.user.findFirst({ where: { id: context.req.user.id } }).associatedProjects(),
};
//# sourceMappingURL=User.js.map