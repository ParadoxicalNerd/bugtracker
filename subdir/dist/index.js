"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const client_1 = require("@prisma/client");
const apollo_server_express_1 = require("apollo-server-express");
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const ioredis_1 = __importDefault(require("ioredis"));
const morgan_1 = __importDefault(require("morgan"));
const passport_1 = __importDefault(require("passport"));
const auth_1 = __importStar(require("./auth"));
const resolvers_1 = require("./resolvers");
const fs = require("fs");
const path = require("path");
dotenv_1.default.config();
const PORT = process.env.PORT || 4000;
exports.prisma = new client_1.PrismaClient();
const app = express_1.default();
app.use(morgan_1.default("dev"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({
    extended: true,
}));
const corsAllowList = [
    "http://localhost:8080",
    "http://localhost:4000",
    "https://shielded-eyrie-87302.herokuapp.com/",
    "https://adoring-einstein-d2f852.netlify.app/",
];
const corsOptions = (req, cb) => {
    const options = {
        credentials: true,
    };
    if (corsAllowList.indexOf(req.headers.origin || "") !== -1) {
        options.origin = true;
    }
    else {
        options.origin = false;
    }
    cb(null, options);
};
app.use(cors_1.default(corsOptions));
const RedisStore = require("connect-redis")(express_session_1.default);
const redisClient = new ioredis_1.default(process.env.REDIS_URL);
const session = {
    store: new RedisStore({ client: redisClient }),
    secret: process.env.SESSION_SECRET || "supersecretkey",
    cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 5,
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
    app.set("trust proxy", 1);
}
app.use(express_session_1.default(session));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use(auth_1.default);
app.get("/app", auth_1.secured, (req, res, next) => {
    res.send("You made it!");
});
app.get("/loggedIn", (req, res, next) => {
    res.send({
        loggedIn: req.user !== undefined,
    });
});
app.use("/graphql", auth_1.secured, (req, res, next) => {
    next();
});
const typeDefs = fs.readFileSync(path.join(__dirname, "..", "schema.graphql"), "utf-8");
const server = new apollo_server_express_1.ApolloServer({
    typeDefs,
    resolvers: resolvers_1.resolvers,
    context: (expressContext) => ({ prisma: exports.prisma, req: expressContext.req }),
    playground: {
        settings: {
            "request.credentials": "include",
        },
    },
});
server.applyMiddleware({ app, cors: corsOptions });
app.use("/hi", (req, res) => {
    res.status(200);
    res.send({ message: "hello" });
});
app.use(express_1.default.static(path.join(__dirname, "..", "/bugtracker-frontend/build/")));
app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "/bugtracker-frontend/build/"), function (err) {
        if (err) {
            res.status(500).send(err);
        }
    });
});
app.listen(PORT, () => console.log("🚀 Server ready at: http://localhost:" + PORT));
//# sourceMappingURL=index.js.map