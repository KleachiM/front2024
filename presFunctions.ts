import { Presentation, PresentationHeader, Slide } from './types';

export function setTitle(presHeader: PresentationHeader, newTitle: string): PresentationHeader{
    if (newTitle === "")
        return presHeader;
    return {
        ...presHeader,
        title: newTitle
    }
}

export function addSlide(presentation: Presentation): Presentation{
    const newSlides = [...presentation.slides];
    const slide: Slide = {
        background: 'white',
        slideData: [],
        selection: []
    };

    newSlides.splice(presentation.activeSlide + 1, 0, slide);

    return {
        ...presentation,
        slides: newSlides,
        activeSlide: presentation.activeSlide + 1,
        selection: []
    }
}

export function deleteSlide(presentation: Presentation): Presentation{
    // Sort by descending
    const indexesToDelete = presentation.selection.sort((a, b) => b - a);
    const newSlides = [...presentation.slides];
    indexesToDelete.forEach(i => newSlides.splice(i, 1));
    const newActiveSlideIndex = presentation.activeSlide < newSlides.length 
        ? presentation.activeSlide
        : newSlides.length - 1
    return {
        ...presentation,
        slides: newSlides,
        activeSlide: newActiveSlideIndex,
        selection: []
    }
}

export function changeSlidePosition(presentation: Presentation, newPos: number): Presentation{
    if (newPos !== presentation.activeSlide)
        return;
}