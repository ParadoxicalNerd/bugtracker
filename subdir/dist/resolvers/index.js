"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const Query_1 = __importDefault(require("./Query"));
const Project_1 = __importDefault(require("./Project"));
const Ticket_1 = __importDefault(require("./Ticket"));
const User_1 = __importDefault(require("./User"));
const Comment_1 = __importDefault(require("./Comment"));
const Mutation_1 = __importDefault(require("./Mutation"));
const resolvers = {
    Query: Query_1.default,
    Mutation: Mutation_1.default,
    Project: Project_1.default,
    Ticket: Ticket_1.default,
    User: User_1.default,
    Comment: Comment_1.default
};
exports.resolvers = resolvers;
//# sourceMappingURL=index.js.map