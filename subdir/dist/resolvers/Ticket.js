"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    project: (parent, _args, context) => (context.prisma.ticket.findFirst({ where: { id: parent.id } }).project()),
    author: (parent, _args, context) => (context.prisma.ticket.findFirst({ where: { id: parent.id } }).author()),
    assignedTo: (parent, _args, context) => (context.prisma.ticket.findFirst({ where: { id: parent.id } }).assignedTo()),
    comments: (parent, _args, context) => __awaiter(void 0, void 0, void 0, function* () {
        return (context.prisma.ticket.findFirst({ where: { id: parent.id } }).comments());
    })
};
//# sourceMappingURL=Ticket.js.map