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
exports.secured = void 0;
const client_1 = require("@prisma/client");
const express_1 = __importStar(require("express"));
const passport_1 = __importDefault(require("passport"));
const passport_auth0_1 = __importDefault(require("passport-auth0"));
const qs_1 = __importDefault(require("qs"));
const index_1 = require("./index");
const strategy = new passport_auth0_1.default({
    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    callbackURL: process.env.AUTH0_CALLBACK_URL,
}, (accessToken, refreshToken, params, profile, cb) => {
    if (profile.emails === undefined)
        return cb("No email found");
    index_1.prisma.user.findFirst({ where: { email: profile.emails[0].value } }).then((user) => {
        if (user)
            return cb(null, user);
        if (profile.emails === undefined)
            return cb("No email found");
        index_1.prisma.user
            .create({
            data: {
                name: profile.displayName,
                email: profile.emails[0].value,
                type: client_1.UserType.TESTER,
            },
        })
            .then((user) => {
            return cb(null, user);
        });
    });
});
passport_1.default.use(strategy);
passport_1.default.serializeUser((user, done) => done(null, user));
passport_1.default.deserializeUser((user, done) => done(null, user));
const router = express_1.Router();
router.get("/login", (req, res, next) => {
    passport_1.default.authenticate("auth0", { scope: ["openid", "email", "profile"] }, (error, user, info) => {
        console.log(error);
        console.log(user);
        console.log(info);
        if (error) {
            res.status(401).send(error);
        }
        else if (!user) {
            res.status(401).send(info);
        }
        else {
            next();
        }
        res.status(401).send(info);
    })(req, res, next);
});
router.get("/failure", (req, res, next) => {
    res.send("Login unsuccessful");
});
router.get("/callback", passport_1.default.authenticate("auth0", { failureRedirect: "/failure" }), (req, res, next) => {
    res.cookie("session-details", JSON.stringify({
        loggedIn: true,
        username: req.user.name,
    }), { maxAge: 1000 * 60 * 5, secure: true, sameSite: "none" });
    console.log("Login successful");
    res.redirect(process.env.HOMEPAGE_URL || "http://localhost:8080");
});
router.get("/logout", (req, res, next) => {
    req.logout();
    req.session.destroy((err) => {
        console.log(err);
    });
    res.clearCookie("session-details");
    res.clearCookie("session-id");
    const logoutURL = new URL(`https://${process.env.AUTH0_DOMAIN}/v2/logout`);
    logoutURL.search = qs_1.default.stringify({
        client_id: process.env.AUTH0_CLIENT_ID,
        returnTo: process.env.HOMEPAGE_URL,
    });
    res.redirect(logoutURL);
});
exports.default = router;
let _get_route = express_1.default().get("", (req, res, next) => { });
function secured(req, res, next) {
    if (req.user || req.isAuthenticated()) {
        return next();
    }
    else {
        res.send({
            errors: [
                {
                    message: "User authentication failure",
                },
            ],
        });
    }
}
exports.secured = secured;
//# sourceMappingURL=auth.js.map