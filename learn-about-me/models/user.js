const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");

const SALT_FACTOR = 10;

const userSchema = mongoose.Schema({
    username: ({ type: String, required: true, unique: true }),
    password: ({ type: String, required: true }),
    createdAt: ({ type: Date, default: Date.now }),
    displayName: String,
    bio: String,
});

userSchema.methods.name = () => {
    return this.displayName || this.username;
};

userSchema.methods.checkPassword = (guess, callback) => {
    bcrypt.compare(guess, this.password, (error, result) => {
        return callback(err, result);
    });
};

userSchema.pre("save", function(next) {
    const user = this;
    if (!user.isModified("password")) {
        return next();
    }
    bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
        if (err) { return next(err); }
        bcrypt.hash(user.password, salt, () => {}, (err, encrypted) => {
            if (err) { return next(err); }
            user.password = encrypted;
            return next();
        });
    });
});

const User = mongoose.model("User", userSchema);

module.exports = User;
