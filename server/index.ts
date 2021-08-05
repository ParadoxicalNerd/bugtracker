import { PrismaClient } from "@prisma/client";
import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import expressSession from "express-session";
import Redis from "ioredis";
import morgan from "morgan";
import passport from "passport";
dotenv.config();

const fs = require("fs");
const path = require("path");

import authRouter, { secured } from "./auth";
import { resolvers } from "./resolvers";

const PORT = process.env.PORT || 4000;

export const prisma = new PrismaClient();

const app = express();

app.use(morgan("dev"));

// Body decoder
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

// CORS

const corsAllowList = [
    "http://localhost:8080",
    "http://localhost:4000",
    "https://shielded-eyrie-87302.herokuapp.com/",
    "https://adoring-einstein-d2f852.netlify.app/",
];

const corsOptions: cors.CorsOptionsDelegate<cors.CorsRequest> = (req, cb) => {
    const options: cors.CorsOptions = {
        credentials: true,
    };

    if (corsAllowList.indexOf(req.headers.origin || "") !== -1) {
        options.origin = true;
    } else {
        options.origin = false;
    }

    cb(null, options);
};

app.use(cors(corsOptions));

const RedisStore = require("connect-redis")(expressSession);
const redisClient = new Redis(process.env.REDIS_URL);

const session: expressSession.SessionOptions = {
    store: new RedisStore({ client: redisClient }),
    secret: process.env.SESSION_SECRET || "supersecretkey",
    cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 5, // Five minutes
    },
    resave: false,
    saveUninitialized: false,
    name: "session-id",
};

if (process.env.NODE_ENV == "production") {
    session.cookie = {
        secure: true,
        sameSite: "none",
    };

    app.set("trust proxy", 1); // For Heroku
}

app.use(expressSession(session));

// Passport Config

app.use(passport.initialize());
app.use(passport.session());

app.use(authRouter);

app.get("/app", secured, (req, res, next) => {
    res.send("You made it!");
});

// Utility function to check if user is logged in
app.get("/loggedIn", (req, res, next) => {
    res.send({
        loggedIn: req.user !== undefined,
    });
});

// Graphql

app.use("/graphql", secured, (req, res, next) => {
    // if (req.body.userID) {
    //     // @ts-expect-error
    //     req.body.userID = req.user.id;
    // }
    // console.log(req.isAuthenticated());
    // console.log(req.user);
    next();
});

const typeDefs = fs.readFileSync(path.join(__dirname, "..", "schema.graphql"), "utf-8");

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: (expressContext) => ({ prisma, req: expressContext.req }),
    playground: {
        settings: {
            "request.credentials": "include", //https://github.com/graphql/graphql-playground/issues/748#issuecomment-461422943
        },
    },
});

// CORS Fix: https://stackoverflow.com/a/54589681
server.applyMiddleware({ app, cors: corsOptions });

// Demo route
app.use("/hi", (req, res) => {
    // console.log(req.cookies);
    res.status(200);
    res.send({ message: "hello" });
});

app.use(express.static(path.join(__dirname, "..", "/react-ui/build/")));

app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "/react-ui/build/"), function (err) {
        if (err) {
            res.status(500).send(err);
        }
    });
});

app.listen(PORT, () => console.log("🚀 Server ready at: http://localhost:" + PORT));
