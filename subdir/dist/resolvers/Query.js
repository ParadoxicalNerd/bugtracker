"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    project: (_parent, args, context) => context.prisma.project.findFirst({ where: { id: args.id } }),
    ticket: (_parent, args, context) => context.prisma.ticket.findFirst({ where: { id: args.id } }),
    user: (_parent, args, context) => context.prisma.user.findFirst({ where: { id: context.req.user.id } }),
    allProjects: (_parent, _args, context) => context.prisma.project.findMany(),
    allUsers: (_parent, _args, context) => context.prisma.user.findMany(),
};
//# sourceMappingURL=Query.js.map