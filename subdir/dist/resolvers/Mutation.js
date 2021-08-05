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
const MutationTypes_1 = require("./MutationTypes");
exports.default = {
    createProject: (_parent, args, context) => context.prisma.project.create({
        data: {
            name: args.data.title,
            description: args.data.description,
            author: {
                connect: { id: args.authorID },
            },
            associatedUsers: {
                connect: [{ id: args.authorID }],
            },
        },
    }),
    updateProject: (_parent, args, context) => context.prisma.project.update({
        where: {
            id: args.projectID,
        },
        data: Object.assign({}, args.data),
    }),
    addProjectAssociatedUsers: (_parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        const project = yield context.prisma.project.findUnique({
            where: {
                id: args.projectID,
            },
            include: {
                associatedUsers: true,
            },
        });
        const user = yield context.prisma.user.findUnique({
            where: {
                id: args.associatedUserID,
            },
        });
        if (!project || !user)
            return undefined;
        project.associatedUsers.push(user);
        let associatedUsersArray = project.associatedUsers.map((val) => {
            return { id: val.id };
        });
        return context.prisma.project.update({
            where: {
                id: args.projectID,
            },
            data: {
                associatedUsers: {
                    connect: associatedUsersArray,
                },
            },
        });
    }),
    createTicket: (_parent, args, context) => {
        if (args.data.status != MutationTypes_1.TicketStatus.Assigned) {
            return context.prisma.ticket.create({
                data: {
                    title: args.data.title,
                    description: args.data.description,
                    type: args.data.type,
                    priority: args.data.priority,
                    status: args.data.status,
                    project: {
                        connect: { id: args.projectID },
                    },
                    author: {
                        connect: { id: args.authorID },
                    },
                },
            });
        }
        else {
            return context.prisma.ticket.create({
                data: {
                    title: args.data.title,
                    description: args.data.description,
                    type: args.data.type,
                    priority: args.data.priority,
                    status: args.data.status,
                    project: {
                        connect: { id: args.projectID },
                    },
                    author: {
                        connect: { id: args.authorID },
                    },
                    assignedTo: {
                        connect: { id: args.data.assignedTo },
                    },
                },
            });
        }
    },
    updateTicket: (_parent, args, context) => context.prisma.ticket.update({
        where: {
            id: args.ticketID,
        },
        data: args.data,
    }),
    assignTicket: (_parent, args, context) => context.prisma.ticket.update({
        where: {
            id: args.ticketID,
        },
        data: {
            assignedTo: {
                connect: {
                    id: args.userID,
                },
            },
        },
    }),
    addTicketComment: (_parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        return context.prisma.comment.create({
            data: {
                message: args.comment,
                author: {
                    connect: {
                        id: args.authorID,
                    },
                },
                ticket: {
                    connect: {
                        id: args.ticketID,
                    },
                },
            },
        });
    }),
    addTicketChangeLog: (_parent, args, context) => context.prisma.ticket.update({
        where: {
            id: args.ticketID,
        },
        data: {
            changeLog: {
                push: args.changeLog,
            },
        },
    }),
    createUser: (_parent, args, context) => context.prisma.user.create({
        data: args.data,
    }),
    updateUser: (_parent, args, context) => {
        const currUser = context.req.user;
        const updatedUser = context.prisma.user.update({
            where: {
                id: currUser.id,
            },
            data: {
                name: args.data.name,
                email: args.data.email,
                type: args.data.type,
            },
        });
        console.log(updatedUser);
        return updatedUser;
    },
};
//# sourceMappingURL=Mutation.js.map