import { addSlide, changeSlidePosition, deleteSlides, setTitle, defaultBlock, addElement, deleteElement  } from "./presFunctions";
import { Presentation, Slide, SlideElement, TextBlock } from "./types";

const pres: Presentation = {
    title: 'oldTitle',
    slides: [getSlideWithTextBlock('slide 1'), getSlideWithTextBlock('slide 2')],
    activeSlideId: 'tstSlideslide 1',
    selection: {type: 'slide', value: ['tstSlideslide 1']}
};

function getSlideWithTextBlock(content: string): Slide {
    return {
        id: `tstSlide${content}`,
        background: 'white',
        slideData: [{
            type: 'text',
            id: `tstTxtBlock${content}`,
            point: {x: defaultBlock.point.x, y: defaultBlock.point.y},
            width: defaultBlock.width,
            height: defaultBlock.height,
            content: content,
            fontSize: 10,
            fontColor: 'black',
            fontFamily: 'serif'
        }]
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

        const newHeader = setTitle(pres, newTitle);
        expect(newHeader.title).toEqual(newTitle);
    });
});

describe('Empty title', () => {
    it('should not set title', () => {
        const newTitle = '';

        const newPres = setTitle(pres, newTitle);
        expect(newPres.title).toEqual(pres.title);
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
            title: 'title',
            slides: [
                getSlideWithTextBlock('slide 1'), 
                getSlideWithTextBlock('slide 2'),
                getSlideWithTextBlock('slide 3')
            ],
            activeSlideId: 'tstSlideslide 2',
            selection: {type: 'slide', value: []}
        }
        const newPres = addSlide(pres);
        expect(newPres.slides.at(2).slideData.length).toEqual(0);
    });
});

describe('Add slide after active slide between other', () => {
    it ('should add', () => {
        const pres: Presentation = {
            title: 'title',
            slides: [
                getSlideWithTextBlock('slide 1'), 
                getSlideWithTextBlock('slide 2'),
                getSlideWithTextBlock('slide 3')
            ],
            activeSlideId: 'tstSlideslide 2',
            selection: {type: 'slide', value: []}
        }
        const newPres = addSlide(pres);
        expect(newPres.slides.at(2).slideData.length).toEqual(0);

        expect(getTextContent(newPres.slides.at(1).slideData.at(0))).toEqual('slide 2');
        expect(getTextContent(newPres.slides.at(3).slideData.at(0))).toEqual('slide 3');
    });
});

describe('Delete single slide', () => {
    it ('shold return empty presentation', () => {
        const pres: Presentation = {
            title: 'title',
            slides: [getSlideWithTextBlock('slide 1')],
            activeSlideId: 'tstSlideslide 1',
            selection: {type: 'slide', value: ['tstSlideslide 1']}
        };
        const newPres = deleteSlides(pres);
        expect(newPres.slides.length).toEqual(0);
        expect(newPres.activeSlideId).toEqual('');
    });
});

describe('Delete 2 & 4 slide in pres with length 5', () => { 
    it('should return pres without 2 & 4 slide', () => {
        const pres: Presentation = {
            title: 'title',
            slides: [
                getSlideWithTextBlock('slide 1'),
                getSlideWithTextBlock('slide 2'),
                getSlideWithTextBlock('slide 3'),
                getSlideWithTextBlock('slide 4'),
                getSlideWithTextBlock('slide 5')
            ],
            activeSlideId: 'tstSlideslide 2',
            selection: {type: 'slide', value: ['tstSlideslide 2', 'tstSlideslide 4']}
        };
        const newPres = deleteSlides(pres);
        expect(newPres.slides.length).toEqual(3);
        expect(getTextContent(newPres.slides.at(0).slideData.at(0))).toEqual('slide 1');
        expect(getTextContent(newPres.slides.at(1).slideData.at(0))).toEqual('slide 3');
        expect(getTextContent(newPres.slides.at(2).slideData.at(0))).toEqual('slide 5');
        expect(newPres.activeSlideId).toEqual(newPres.slides[2].id);
    });
 });


describe('Change slide position', () => {
    it ('should change empty 3 (last) to 2', () => {
        const pres: Presentation = {
            title: 'title',
            slides: [
                getSlideWithTextBlock('slide 1'), 
                getSlideWithTextBlock('slide 2'),
                getSlideWithTextBlock('')
            ],
            activeSlideId: 'tstSlide',
            selection: {type: 'slide', value: ['tstSlide']}
        };
        const newPres = changeSlidePosition(pres, 1);
        expect(newPres.activeSlideId).toEqual('tstSlide');
        expect(newPres.slides.length).toEqual(pres.slides.length);
        expect(
            getTextContent(newPres.slides.at(1).slideData.at(0))
        ).toEqual('');
        expect(
            getTextContent(newPres.slides.at(2).slideData.at(0))
        ).toEqual('slide 2');
    });
});

describe('Change slide position', () => {
    it ('should change empty 2 (not last) to 3 (last)', () => {
        const pres: Presentation = {
            title: 'title',
            slides: [
                getSlideWithTextBlock('slide 1'),
                getSlideWithTextBlock(''), 
                getSlideWithTextBlock('slide 3')
            ],
            activeSlideId: 'tstSlide',
            selection: {type: 'slide', value: ['tstSlide']}
        };
        const newPres = changeSlidePosition(pres, 2);
        expect(newPres.activeSlideId).toEqual(newPres.slides[2].id);
        expect(newPres.slides.length).toEqual(pres.slides.length);
        expect(
            getTextContent(newPres.slides.at(2).slideData.at(0))
        ).toEqual('');
        expect(
            getTextContent(newPres.slides.at(1).slideData.at(0))
        ).toEqual('slide 3');
    });
});

describe('Change slide position', () => {
    it ('should change empty 1 (first) to 3 (last)', () => {
        const pres: Presentation = {
            title: 'title',
            slides: [
                getSlideWithTextBlock(''),
                getSlideWithTextBlock('slide 2'),
                getSlideWithTextBlock('slide 3')
            ],
            activeSlideId: 'tstSlide',
            selection: {type: 'slide', value: ['tstSlide']}
        };
        const newPres = changeSlidePosition(pres, 2);
        expect(newPres.activeSlideId).toEqual(newPres.slides[2].id);
        expect(newPres.slides.length).toEqual(pres.slides.length);
        expect(
            getTextContent(newPres.slides.at(2).slideData.at(0))
        ).toEqual('');
        expect(
            getTextContent(newPres.slides.at(0).slideData.at(0))
        ).toEqual('slide 2');
    });
});

describe('Change slide position', () => {
    it ('should change empty 1 (first) to 2 (not last)', () => {
        const pres: Presentation = {
            title: 'title',
            slides: [
                getSlideWithTextBlock(''),
                getSlideWithTextBlock('slide 2'),
                getSlideWithTextBlock('slide 3')
            ],
            activeSlideId: 'tstSlide',
            selection: {type: 'slide', value: ['tstSlide']}
        };
        const newPres = changeSlidePosition(pres, 1);
        expect(newPres.activeSlideId).toEqual(newPres.slides[1].id);
        expect(newPres.slides.length).toEqual(pres.slides.length);
        expect(
            getTextContent(newPres.slides.at(1).slideData.at(0))
        ).toEqual('');
        expect(
            getTextContent(newPres.slides.at(0).slideData.at(0))
        ).toEqual('slide 2');
    });
});

describe('Change slide position', () => {
    it ('should change empty 3 (last) to 1', () => {
        const pres: Presentation = {
            title: 'title',
            slides: [
                getSlideWithTextBlock('slide 1'),
                getSlideWithTextBlock('slide 2'),
                getSlideWithTextBlock('')
            ],
            activeSlideId: 'tstSlide',
            selection: {type: 'slide', value: ['tstSlide']}
        };
        const newPres = changeSlidePosition(pres, 0);
        expect(newPres.activeSlideId).toEqual(newPres.slides[0].id);
        expect(newPres.slides.length).toEqual(pres.slides.length);
        expect(
            getTextContent(newPres.slides.at(0).slideData.at(0))
        ).toEqual('');
        expect(
            getTextContent(newPres.slides.at(2).slideData.at(0))
        ).toEqual('slide 2');
    });
});

describe('Add text block', () => {
    it('should add text block', () => {
        const newPres = addElement(pres, 'text');
        expect(newPres.activeSlideId).toEqual(pres.activeSlideId);
        expect(newPres.slides.find(slide => 
            slide.id === newPres.activeSlideId).slideData.length)
            .toEqual(pres.slides.find(slide => 
                slide.id === pres.activeSlideId).slideData.length + 1);
    });
});

describe('Delete textblock', () => {
    it ('should delete', () => {
        const pres: Presentation = {
            title: 'oldTitle',
            slides: [
                getSlideWithTextBlock('slide 1'),
                getSlideWithTextBlock('slide 2')],
            activeSlideId: 'tstSlideslide 1',
            selection: {type: 'element', value: ['tstTxtBlockslide 1']}
        };
        const newPres = deleteElement(pres);
        expect(newPres.slides[0].slideData.length)
            .toEqual(pres.slides[0].slideData.length - 1);
    });
});
