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
exports.defaultBlock = void 0;
exports.setTitle = setTitle;
exports.addSlide = addSlide;
exports.deleteSlides = deleteSlides;
exports.changeSlidePosition = changeSlidePosition;
exports.addElement = addElement;
exports.deleteBlock = deleteBlock;
function getRandomString() {
    return "".concat(new Date().getTime()).concat(Math.random());
}
exports.defaultBlock = {
    id: getRandomString(),
    point: { x: 10, y: 10 },
    width: 50,
    height: 50
};
var defaultTextBlock = {
    type: 'text',
    id: exports.defaultBlock.id,
    point: { x: exports.defaultBlock.point.x, y: exports.defaultBlock.point.y },
    width: exports.defaultBlock.width,
    height: exports.defaultBlock.height,
    content: '',
    fontSize: 10,
    fontColor: 'black',
    fontFamily: 'serif'
};
var defaultImageBlock = {
    type: 'image',
    id: exports.defaultBlock.id,
    point: { x: exports.defaultBlock.point.x, y: exports.defaultBlock.point.y },
    width: exports.defaultBlock.width,
    height: exports.defaultBlock.height,
    source: ''
};
var defaultSlide = {
    id: getRandomString(),
    background: 'white',
    slideData: []
};
function setTitle(pres, newTitle) {
    if (newTitle === "")
        return pres;
    return __assign(__assign({}, pres), { title: newTitle });
}
function addSlide(presentation) {
    var newSlides = __spreadArray([], presentation.slides, true);
    var index = newSlides.findIndex(function (slide) { return slide.id === presentation.activeSlideId; });
    newSlides.splice(index + 1, 0, defaultSlide);
    return __assign(__assign({}, presentation), { slides: newSlides, activeSlideId: newSlides[index + 1].id });
}
function deleteSlides(presentation) {
    var newSlides = presentation.slides.filter(function (slide) { return !presentation.selection.value.includes(slide.id); });
    var newActiveSlideIndex = newSlides.length > 0
        ? newSlides[newSlides.length - 1].id
        : '';
    return __assign(__assign({}, presentation), { slides: newSlides, activeSlideId: newActiveSlideIndex });
}
function changeSlidePosition(presentation, newPos) {
    var activeSlideIndex = presentation.slides.findIndex(function (slide) { return slide.id === presentation.activeSlideId; });
    if (newPos === activeSlideIndex)
        return presentation;
    var pres = __assign({}, presentation);
    var slideToChange = pres.slides[activeSlideIndex];
    pres.slides.splice(activeSlideIndex, 1);
    pres.slides.splice(newPos, 0, slideToChange);
    return pres;
}
function addElement(presentation, elemType) {
    var activeSlideIndex = presentation.slides.findIndex(function (s) {
        return s.id === presentation.activeSlideId;
    });
    var slideData = __spreadArray([], presentation.slides[activeSlideIndex].slideData, true);
    if (elemType === 'text')
        slideData.push(defaultTextBlock);
    else if (elemType === 'image')
        slideData.push(defaultImageBlock);
    else
        throw new Error('Unknown element type');
    var newSlide = __assign(__assign({}, presentation.slides[activeSlideIndex]), { slideData: slideData });
    var slides = __spreadArray([], presentation.slides, true);
    slides[activeSlideIndex] = newSlide;
    return __assign(__assign({}, presentation), { slides: slides });
}
function deleteBlock(presentation) {
    var activeSlideIndex = presentation.slides.findIndex(function (s) {
        return s.id === presentation.activeSlideId;
    });
    var slideData = __spreadArray([], presentation.slides[activeSlideIndex].slideData, true);
    var newSlide = __assign(__assign({}, presentation.slides[activeSlideIndex]), { slideData: slideData.filter(function (e) { return !presentation.selection.value.includes(e.id); }) });
    var slides = __spreadArray([], presentation.slides, true);
    slides[activeSlideIndex] = newSlide;
    return __assign(__assign({}, presentation), { slides: slides });
}
