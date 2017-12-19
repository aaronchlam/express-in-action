var chai = require("chai");
var mocha = require("mocha");

var capitalize = require("../capitalize");

const expect = chai.expect;

describe("capitalize", () => {
    
    it("capitalizes single words", () => {
        expect(capitalize("express")).to.equal("Express");
        expect(capitalize("cats")).to.equal("Cats");
    });

    it("makes the rest of the string lowercase", () => {
        expect(capitalize("javaScript")).to.equal("Javascript");
    });

    it("leaves the empty string empty", () => {
        expect(capitalize("")).to.equal("");
    });

    it("doesn't capitalize non-letter strings", () => {
        expect(capitalize("123")).to.equal("123");
    });

    it("capitalize an already capitalized word", () => {
        expect(capitalize("Capitalized")).to.equal("Capitalized");
    });
    

    it("capitalizes only the first word of a sentence", () => {
        expect(capitalize("A short sentence")).to.equal("A short sentence");
    });

    it("capitalizes String objects without changing their values", () => {
        const str = new String("who is JavaScript?");
        expect(capitalize(str)).to.equal("Who is javascript?");
        expect(str.valueOf()).to.equal("who is JavaScript?");
    });
});

