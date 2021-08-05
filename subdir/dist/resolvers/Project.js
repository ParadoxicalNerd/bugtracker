"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    author: (parent, _args, context) => (context.prisma.project.findFirst({ where: { id: parent.id } }).author()),
    associatedUsers: (parent, _args, context) => (context.prisma.project.findFirst({ where: { id: parent.id } }).associatedUsers()),
    tickets: (parent, _args, context) => (context.prisma.project.findFirst({ where: { id: parent.id } }).tickets())
};
//# sourceMappingURL=Project.js.map