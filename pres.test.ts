import { addSlide, setTitle } from "./presFunctions";
import { Presentation, PresentationHeader, Slide, SlideElement, TextBlock } from "./types";

const presentationHeader: PresentationHeader = {
    title: 'oldTitle',
    actions: []
}

const pres: Presentation = {
    header: presentationHeader,
    slides: [getSlideWithTextBlock('slide 1'), getSlideWithTextBlock('slide 2')],
    activeSlide: 1,
    selection: []
};

function getSlideWithTextBlock(content: string): Slide {
    return {
        background: 'white',
        slideData: [{
            type: 'text',
            content: content,
            fontSize: 10,
            fontColor: 'black',
            fontFamily: 'serif'
        }],
        selection: []
    }
}

function getTextContent(textElement: SlideElement): string {
    if (textElement.type !== 'text')
        return '';

    return textElement.content;
}

describe('Not empty title', () => {
    it('should set title', () => {
        const newTitle = 'newTitle';

        const newHeader = setTitle(presentationHeader, newTitle);
        expect(newHeader.title).toEqual(newTitle);
    });
});

describe('Empty title', () => {
    it('should not set title', () => {
        const presentationHeader: PresentationHeader = {
            title: 'oldTitle',
            actions: []
        }

        const newTitle = '';

        const newHeader = setTitle(presentationHeader, newTitle);
        expect(newHeader.title).toEqual(presentationHeader.title);
    });
});

describe('Add slide to not empty pres', () => {
    it ('should add', () => {
       const newPresentation = addSlide(pres);
       expect(newPresentation.slides.length).toEqual(pres.slides.length + 1);
    });
});

describe('Add slide to not empty pres', () => {
    it ('should add', () => {
       const newPresentation = addSlide(pres);
       expect(newPresentation.slides.length).toEqual(pres.slides.length + 1);
    });
});


describe('Add slide after active slide between other', () => {
    it ('should add', () => {
        const pres: Presentation = {
        header: presentationHeader,
        slides: [
            getSlideWithTextBlock('slide 1'), 
            getSlideWithTextBlock('slide 2'),
            getSlideWithTextBlock('slide 3')
        ],
        activeSlide: 1,
        selection: []
        }
        const newPres = addSlide(pres);
        expect(newPres.slides.at(2).slideData.length).toEqual(0);
        expect(newPres.activeSlide).toEqual(pres.activeSlide + 1);
    });
});

describe('Add slide after active slide between other', () => {
    it ('should add', () => {
        const pres: Presentation = {
        header: presentationHeader,
        slides: [
            getSlideWithTextBlock('slide 1'), 
            getSlideWithTextBlock('slide 2'),
            getSlideWithTextBlock('slide 3')
        ],
        activeSlide: 1,
        selection: []
        }
        const newPres = addSlide(pres);
        expect(newPres.slides.at(2).slideData.length).toEqual(0);
        expect(newPres.activeSlide).toEqual(pres.activeSlide + 1);

        expect(getTextContent(newPres.slides.at(1).slideData.at(0))).toEqual('slide 2');
        expect(getTextContent(newPres.slides.at(3).slideData.at(0))).toEqual('slide 3');
    });
});

describe('Delete single slide', () => {
    it ('shold return empty presentation', () => {
        

    });
});



// describe('Change slide position', () => {
//     it ('should change empty 3 (last) and not empty 2', () => {
//         const presToChange = addSlide(pres);


//     });
// });