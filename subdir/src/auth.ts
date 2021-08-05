import { UserType } from "@prisma/client";
import express, { Router } from "express";
import passport from "passport";
import Auth0Strategy from "passport-auth0";
import QueryString from "qs";
import { prisma } from "./index";

const strategy = new Auth0Strategy(
    {
        domain: process.env.AUTH0_DOMAIN!,
        clientID: process.env.AUTH0_CLIENT_ID!,
        clientSecret: process.env.AUTH0_CLIENT_SECRET!,
        callbackURL: process.env.AUTH0_CALLBACK_URL!,
    },
    (accessToken, refreshToken, params, profile, cb) => {
        if (profile.emails === undefined) return cb("No email found");

        prisma.user.findFirst({ where: { email: profile.emails[0].value } }).then((user) => {
            if (user) return cb(null, user);
            if (profile.emails === undefined) return cb("No email found");

            prisma.user
                .create({
                    data: {
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        type: UserType.TESTER,
                    },
                })
                .then((user) => {
                    return cb(null, user);
                });
        });
    }
);

passport.use(strategy);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user: Express.User, done) => done(null, user));

const router = Router();

router.get("/login", (req, res, next) => {
    passport.authenticate(
        "auth0",
        { scope: ["openid", "email", "profile"] },
        (error, user, info) => {
            console.log(error);
            console.log(user);
            console.log(info);

            if (error) {
                res.status(401).send(error);
            } else if (!user) {
                res.status(401).send(info);
            } else {
                next();
            }

            res.status(401).send(info);
        }
    )(req, res, next);
});

router.get("/failure", (req, res, next) => {
    res.send("Login unsuccessful");
});

router.get(
    "/callback",
    passport.authenticate("auth0", { failureRedirect: "/failure" }),
    (req, res, next) => {
        // res.redirect("/home");
        // res.send("Hello");
        // res.redirect("/app");
        // console.log(req);
        res.cookie(
            "session-details",
            JSON.stringify({
                loggedIn: true,
                // @ts-ignore
                username: req.user!.name,
            }),
            { maxAge: 1000 * 60 * 5, secure: true, sameSite: "none" }
        );

        // console.log(req.session);
        // res.redirect("http://localhost:8080/home");`
        console.log("Login successful");
        res.redirect(process.env.HOMEPAGE_URL || "http://localhost:8080");
    }
);

router.get("/logout", (req, res, next) => {
    req.logout();
    req.session.destroy((err) => {
        console.log(err);
    });
    res.clearCookie("session-details");
    res.clearCookie("session-id");

    const logoutURL = new URL(`https://${process.env.AUTH0_DOMAIN}/v2/logout`);
    logoutURL.search = QueryString.stringify({
        client_id: process.env.AUTH0_CLIENT_ID,
        returnTo: process.env.HOMEPAGE_URL,
    });

    // TODO: Fix redirect url error
    // @ts-expect-error
    res.redirect(logoutURL);
});

export default router;

let _get_route = express().get("", (req, res, next) => {});

type get_route_type = Parameters<typeof _get_route>;

export function secured(req: get_route_type[0], res: get_route_type[1], next: get_route_type[2]) {
    if (req.user || req.isAuthenticated()) {
        return next();
    } else {
        res.send({
            errors: [
                {
                    message: "User authentication failure",
                },
            ],
        });
        // req.session.returnTo = req.originalUrl;
        // res.redirect("/login");
        // next();
    }
}
