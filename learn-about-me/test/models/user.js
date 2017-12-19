const mocha = require("mocha");
const chai = require("chai");

const User = require("../../models/user");

const expect = chai.expect;

describe("User", () => {
    
    let user;
    beforeEach(() => {
        user = new User({
            username: "test-user",
        })
    })

    it("uses its username for its name if displayName is not set", () => {
        expect(user.name()).to.equal("test-user");
    });

    it("uses displayName as name if it is set", () => {
        user.displayName = "test-displayName";
        expect(user.name()).to.equal("test-displayName");
    });
});
