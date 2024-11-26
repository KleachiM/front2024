import { Presentation, Slide, Block, SlideElement, TextBlock, ImageBlock, Point } from './types';

function getRandomString(): string {
    return `${new Date().getTime()}${Math.random()}`;
}

export const defaultBlock: Block = {
    id: getRandomString(),
    point: {x: 10, y: 10},
    width: 50,
    height: 50
}

const defaultTextBlock: TextBlock = {
    type: 'text',
    id: defaultBlock.id,
    point: {x: defaultBlock.point.x, y: defaultBlock.point.y},
    width: defaultBlock.width,
    height: defaultBlock.height,
    content: '',
    fontSize: 10,
    fontColor: 'black',
    fontFamily: 'serif'
}

const defaultImageBlock: ImageBlock = {
    type: 'image',
    id: defaultBlock.id,
    point: {x: defaultBlock.point.x, y: defaultBlock.point.y},
    width: defaultBlock.width,
    height: defaultBlock.height,
    source: ''
}

const defaultSlide: Slide = {
    id: getRandomString(),
    background: 'white',
    slideData: []
}

export function setTitle(pres: Presentation, newTitle: string): Presentation{
    if (newTitle === "")
        return pres;
    return {
        ...pres,
        title: newTitle
    }
}

export function addSlide(presentation: Presentation): Presentation{
    const newSlides = [...presentation.slides];

    const index = newSlides.findIndex(slide => slide.id === presentation.activeSlideId)

    newSlides.splice(index + 1, 0, defaultSlide);

    return {
        ...presentation,
        slides: newSlides,
        activeSlideId: newSlides[index + 1].id
    }
}

export function deleteSlides(presentation: Presentation): Presentation{
    const newSlides = presentation.slides.filter(
        (slide) => !presentation.selection.value.includes(slide.id));

    const newActiveSlideIndex = newSlides.length > 0 
        ? newSlides[newSlides.length - 1].id 
        : '';

    return {
        ...presentation,
        slides: newSlides,
        activeSlideId: newActiveSlideIndex
    }
}

export function changeSlidePosition(presentation: Presentation, newPos: number): Presentation{
    const activeSlideIndex = presentation.slides.findIndex(slide => slide.id === presentation.activeSlideId);
    
    if (newPos === activeSlideIndex)
        return presentation;

    const pres = {...presentation};
    const slideToChange = pres.slides[activeSlideIndex];
    
    pres.slides.splice(activeSlideIndex, 1);
    pres.slides.splice(newPos, 0, slideToChange);
    return pres;
}

export function addElement(presentation: Presentation, elemType: string): Presentation{
    const activeSlideIndex = presentation.slides.findIndex(s => 
        s.id === presentation.activeSlideId);

    const slideData = [...presentation.slides[activeSlideIndex].slideData];
    if (elemType === 'text')
        slideData.push(defaultTextBlock);
    else if (elemType === 'image')
        slideData.push(defaultImageBlock);
    else
        throw new Error('Unknown element type');

    const newSlide = {
        ...presentation.slides[activeSlideIndex],
        slideData: slideData
    }

    const slides = [...presentation.slides];
    slides[activeSlideIndex] = newSlide;

    return {
        ...presentation,
        slides: slides
    }
}

export function deleteElement(presentation: Presentation) {
    const activeSlideIndex = presentation.slides.findIndex(s => 
        s.id === presentation.activeSlideId);

    const slideData = [...presentation.slides[activeSlideIndex].slideData];
    const newSlide = {
        ...presentation.slides[activeSlideIndex],
        slideData: slideData.filter(e => 
            !presentation.selection.value.includes(e.id))
    }

    const slides = [...presentation.slides];
    slides[activeSlideIndex] = newSlide;

    return {
        ...presentation,
        slides: slides
    }
}

export function changeElementPosition(presentation: Presentation, newPos: Point){
    const activeSlideIndex = presentation.slides.findIndex(s => 
        s.id === presentation.activeSlideId);
    
    const activeSlideData = presentation.slides[activeSlideIndex].slideData;
    const activeElem = activeSlideData.find(e => 
        e.id === presentation.selection.value)
}