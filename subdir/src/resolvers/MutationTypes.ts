type ID = string;

export enum TicketTypes {
    Bug = "BUG",
    Feature = "FEATURE",
    Docs = "DOCS",
}

export enum TicketStatus {
    Open = "OPEN",
    Assigned = "ASSIGNED",
    Testing = "TESTING",
    Resolved = "RESOLVED",
}

export enum TicketPriority {
    Unknown = "UNKNOWN",
    Low = "LOW",
    Medium = "MEDIUM",
    High = "HIGH",
    Critical = "CRITICAL",
}

export enum UserType {
    Admin = "ADMIN",
    ProjectManager = "PROJECT_MANAGER",
    Programmer = "PROGRAMMER",
    Tester = "TESTER",
}

export interface ProjectCreateInput {
    title: string;
    description: string;
}

export interface ProjectUpdateInput {
    description: string;
}

export interface TicketCreateInput {
    title: string;
    description: string;
    type: TicketTypes;
    status: TicketStatus;
    priority: TicketPriority;
    assignedTo: ID;
}

export interface TicketUpdateInput {
    description: string;
    type: TicketTypes;
    status: TicketStatus;
    priority: TicketPriority;
}

export interface UserCreateInput {
    name: string;
    email: string;
    type: UserType;
}

export interface UserUpdateInput {
    name?: string;
    email?: string;
    type?: UserType;
}
