const express = require("express");
const passport = require("passport");

const User = require("./models/user");

const router = express.Router();

// Sets variables for templates
router.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.errors = req.flash("error");
    res.locals.info = req.flash("info");
    return next();
});

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        req.flash("info", "You must be logged in to see this page.");
        res.redirect("/login");
    }
}

router.get("/", (req, res) => {
    User.find()
        .sort({ createdAt: "descending" })
        .exec((err, users) => {
            if (err) { next(err); }
            res.render("index", { users })
        });
});

router.get("/signup", (req, res) => {
    res.render("signup");
});

router.post("/signup", (req, res, next) => {
    console.log(req.get("content-type"));
    console.log(req.body);
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({ username }, (err, user) => {
        if (err) { return next(err) }
        if (user) { 
            req.flash("error", "User already exists");
            return res.redirect("/signup");
        }

        newUser = new User({ username, password });
        newUser.save(next);
    });
}, passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/signup",
    failureFlash: true
}));

router.get("/login", (req, res) => {
    res.render("login");
});

router.post("/login", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true
}));

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect('/');
})

router.get("/edit", ensureAuthenticated, (req, res) => {
    res.render("edit");
});

router.post("/edit", ensureAuthenticated, (req, res, next) => {
    req.user.displayName = req.body.displayname
    req.user.bio = req.body.biography;
    req.user.save((error) => {
        if (error) {
            return next(err);
        }
        req.flash("info", "Profile updated");
        res.redirect("/edit");
    });
});

router.get("/users/:username", (req, res, next) => {
    User.findOne({ username: req.params.username }, (err, user) => {
        if (err) { return next(err) }
        if (!user) { return next(404) }
        res.render("profile", { user })
    });
})

module.exports = router;
