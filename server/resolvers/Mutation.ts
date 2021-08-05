import { User } from "@prisma/client";
import { Context } from "../decleration";
import {
    ProjectCreateInput,
    ProjectUpdateInput,
    TicketCreateInput,
    TicketStatus,
    TicketUpdateInput,
    UserCreateInput,
} from "./MutationTypes";

export default {
    createProject: (
        _parent: any,
        args: { authorID: string; data: ProjectCreateInput },
        context: Context
    ) =>
        context.prisma.project.create({
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
    updateProject: (
        _parent: any,
        args: { projectID: string; data: ProjectUpdateInput },
        context: Context
    ) =>
        context.prisma.project.update({
            where: {
                id: args.projectID,
            },
            data: { ...args.data },
        }),
    addProjectAssociatedUsers: async (
        _parent: any,
        args: { projectID: string; associatedUserID: string },
        context: Context
    ) => {
        const project = await context.prisma.project.findUnique({
            where: {
                id: args.projectID,
            },
            include: {
                associatedUsers: true,
            },
        });

        const user = await context.prisma.user.findUnique({
            where: {
                id: args.associatedUserID,
            },
        });

        if (!project || !user) return undefined;

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
    },
    createTicket: (
        _parent: any,
        args: { authorID: string; projectID: string; data: TicketCreateInput },
        context: Context
    ) => {
        if (args.data.status != TicketStatus.Assigned) {
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
        } else {
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

    updateTicket: (
        _parent: any,
        args: { ticketID: string; data: TicketUpdateInput },
        context: Context
    ) =>
        context.prisma.ticket.update({
            where: {
                id: args.ticketID,
            },
            data: args.data,
        }),

    assignTicket: (_parent: any, args: { ticketID: string; userID: string }, context: Context) =>
        context.prisma.ticket.update({
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

    addTicketComment: async (
        _parent: any,
        args: { authorID: string; ticketID: string; comment: string },
        context: Context
    ) => {
        // let ticket = await context.prisma.ticket.findFirst({
        //     where: {
        //         id: args.ticketID
        //     }
        // })

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

        // return context.prisma.ticket.update({
        //     where: {
        //         id: args.ticketID
        //     }, data: {
        //         comments: {
        //             push: args.comment
        //         }
        //     }
        // })
    },

    addTicketChangeLog: (
        _parent: any,
        args: { ticketID: string; changeLog: string },
        context: Context
    ) =>
        context.prisma.ticket.update({
            where: {
                id: args.ticketID,
            },
            data: {
                changeLog: {
                    push: args.changeLog,
                },
            },
        }),

    createUser: (_parent: any, args: { data: UserCreateInput }, context: Context) =>
        context.prisma.user.create({
            data: args.data,
        }),

    updateUser: (_parent: any, args: { data: UserCreateInput }, context: Context) => {
        const currUser = context.req.user! as User;

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
