"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainImpl = mainImpl;
var functions_1 = require("./functions");
var eq = "+ 2";
main(eq);
function mainImpl(eq) {
    var splittedInput = (0, functions_1.splitStringIfValid)(eq);
    if (splittedInput.length == 0) {
        console.log("Невалидная строка");
        return NaN;
    }
    return (0, functions_1.calculateFromArr)(splittedInput);
}
function main(eq) {
    var result = mainImpl(eq);
    console.log("\u0420\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442: ".concat(result));
}
