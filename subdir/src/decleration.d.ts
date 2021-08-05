import { Session } from "express-session";
import { ExtraVerificationParams } from "passport-auth0";
import { PrismaClient } from ".prisma/client";
import { Express } from "express";
import { User as k } from "@prisma/client";

// Fix from https://github.com/DefinitelyTyped/DefinitelyTyped/issues/49941#issuecomment-748513261
declare module "express-session" {
    interface Session {
        returnTo?: string;
        user?: Express.User;
    }
}

type User = Express.User;

declare namespace Express {
    export interface Request {
        user?: IRequestUser;
    }
}

interface IRequestUser extends Express.User, k {}

interface Context {
    prisma: PrismaClient;
    req: Express.Request;
}
