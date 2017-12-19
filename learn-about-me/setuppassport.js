const passport = require("passport");
const LocalStrategy = require("passport-local");

const User = require("./models/user");

module.exports = () => {
    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });

    passport.use(new LocalStrategy(
        (username, password, done) => {
            User.findOne({ username }, (error, user) => {
                if (error) { return done(error); }
                if (!user) { 
                    return done(null, false, 
                        { message: "Username not found" }); 
                }
                user.checkPassword(password, (error, result) => {
                    if (error) { return done(error); }
                    if (!result) {
                        return done(null, false, 
                            { message: "Invalid password"});
                    } else {
                        return done(null, user);
                    }
                })
            });
        })
    );
};

