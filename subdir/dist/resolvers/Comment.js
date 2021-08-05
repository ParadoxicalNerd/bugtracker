"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    author: (parent, _args, context) => (context.prisma.comment.findFirst({ where: { id: parent.id } }).author()),
    ticket: (parent, _args, context) => (context.prisma.comment.findFirst({ where: { id: parent.id } }).ticket()),
};
//# sourceMappingURL=Comment.js.map