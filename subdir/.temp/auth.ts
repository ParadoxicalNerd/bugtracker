import express from "express";
import passport from "passport";
import querystring from "querystring";

import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

router.get("/login", passport.authenticate("auth0", { scope: "openid email profile" }));

// router.get("/redirect", passport.authenticate("auth0"));

router.get(
    "/callback",
    passport.authenticate("auth0", { failureRedirect: "/error" }),
    (req, res) => {
        return res.redirect("/graphql");
    }
);

// router.get("/callback", (req, res, next) =>
//     passport.authenticate("auth0", (err, user, info) => {
//         if (err) return next(err);
//         if (!user) return res.redirect("/login");

//         req.logIn(user, (err) => {
//             if (err) return next(err);

//             req.session.save(() => {
//                 const returnTo = req.session.returnTo;
//                 res.redirect(returnTo || "/");
//             });
//         });

//         // req.login(user, (err) => {
//         //     if (err) return next(err);
//         //     return res.redirect("/successRoute"); // Regardless of where logged in from, take to auth successful route
//         // });
//     })(req, res, next)
// );

router.get("/logout", (req, res, next) => {
    req.logout();

    const logoutURL = new URL(`https://${process.env.AUTH0_DOMAIN}/v2/logout`);
    logoutURL.search = querystring.stringify({
        client_id: process.env.AUTH0_CLIENT_ID,
        returnTo: process.env.HOMEPAGE_URL,
    });

    // TODO: Fix redirect url error
    // @ts-expect-error
    res.redirect(logoutURL);
});

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user: Express.User, done) => done(null, user));

let _get_route = express().get("", (req, res, next) => {});

type get_route_type = Parameters<typeof _get_route>;

export function secured(req: get_route_type[0], res: get_route_type[1], next: get_route_type[2]) {
    if (req.user) {
        console.log("here");
        return next();
    }
    req.session.returnTo = req.originalUrl;
    res.redirect("/login");
}

export default router;

/*
var express = require('express');
var router = express.Router();
var passport = require('passport');
var dotenv = require('dotenv');
var util = require('util');
var url = require('url');
var querystring = require('querystring');

dotenv.config();

// Perform the login, after login Auth0 will redirect to callback
router.get('/login', passport.authenticate('auth0', {
  scope: 'openid email profile'
}), function (_req: any, res: { redirect: (arg0: string) => void; }) {
  res.redirect('/');
});

// Perform the final stage of authentication and redirect to previously requested URL or '/user'
router.get('/callback', function (req: { logIn: (arg0: any, arg1: (err: any) => any) => void; session: { returnTo: any; }; }, res: { redirect: (arg0: string) => void; }, next: (arg0: any) => any) {
  passport.authenticate('auth0', function (err: any, user: any, _info: any) {
    if (err) { return next(err); }
    if (!user) { return res.redirect('/login'); }
    req.logIn(user, function (err: any) {
      if (err) { return next(err); }
      const returnTo = req.session.returnTo;
      delete req.session.returnTo;
      res.redirect(returnTo || '/user');
    });
  })(req, res, next);
});

// Perform session logout and redirect to homepage
router.get('/logout', (req: { logout: () => void; protocol: string; hostname: string; connection: { localPort: any; }; }, res: { redirect: (arg0: any) => void; }) => {
  req.logout();

  var returnTo = req.protocol + '://' + req.hostname;
  var port = req.connection.localPort;
  if (port !== undefined && port !== 80 && port !== 443) {
    returnTo += ':' + port;
  }
  var logoutURL = new url.URL(
    util.format('https://%s/v2/logout', process.env.AUTH0_DOMAIN)
  );
  var searchString = querystring.stringify({
    client_id: process.env.AUTH0_CLIENT_ID,
    returnTo: returnTo
  });
  logoutURL.search = searchString;

  res.redirect(logoutURL);
});

export default router
*/
