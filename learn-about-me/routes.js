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

module.exports = router;
