"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setTitle = setTitle;
exports.addSlide = addSlide;
exports.deleteSlide = deleteSlide;
exports.changeSlidePosition = changeSlidePosition;
function setTitle(presHeader, newTitle) {
    if (newTitle === "")
        return presHeader;
    return __assign(__assign({}, presHeader), { title: newTitle });
}
function addSlide(presentation) {
    var newSlides = __spreadArray([], presentation.slides, true);
    var slide = {
        background: 'white',
        slideData: [],
        selection: []
    };
    newSlides.splice(presentation.activeSlide + 1, 0, slide);
    return __assign(__assign({}, presentation), { slides: newSlides, activeSlide: presentation.activeSlide + 1, selection: [] });
}
function deleteSlide(presentation) {
    // Sort by descending
    var indexesToDelete = presentation.selection.sort(function (a, b) { return b - a; });
    var newSlides = __spreadArray([], presentation.slides, true);
    indexesToDelete.forEach(function (i) { return newSlides.splice(i, 1); });
    var newActiveSlideIndex = presentation.activeSlide < newSlides.length
        ? presentation.activeSlide
        : newSlides.length - 1;
    return __assign(__assign({}, presentation), { slides: newSlides, activeSlide: newActiveSlideIndex, selection: [] });
}
function changeSlidePosition(presentation, newPos) {
    if (newPos !== presentation.activeSlide)
        return;
}
