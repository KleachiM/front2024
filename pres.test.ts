import { addSlide, changeSlidePosition, deleteSlides, setTitle, defaultBlock, addElement, deleteElement, moveElementByOffset, resizeElement, changeTextBlockProperty  } from "./presFunctions";
import { Presentation, Slide, SlideElement, TextBlock } from "./types";

const presWithActiveSlide: Presentation = {
    title: 'oldTitle',
    slides: [getSlideWithTextBlock('slide 1'), getSlideWithTextBlock('slide 2')],
    activeSlideId: 'tstSlideslide 1',
    selection: {type: 'slide', value: ['tstSlideslide 1']}
};

const presWithActiveElement: Presentation = {
    title: 'oldTitle',
    slides: [getSlideWithTextBlock('slide 1'), getSlideWithTextBlock('slide 2')],
    activeSlideId: 'tstSlideslide 1',
    selection: {type: 'element', value: ['tstTxtBlockslide 1']}
};

function getSlideWithTextBlock(content: string): Slide {
    return {
        id: `tstSlide${content}`,
        background: 'white',
        slideData: [{
            type: 'text',
            id: `tstTxtBlock${content}`,
            point: {x: defaultBlock.point.x, y: defaultBlock.point.y},
            dimension: {
                width: defaultBlock.dimension.width,
                height: defaultBlock.dimension.height},
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

        const newHeader = setTitle(presWithActiveSlide, newTitle);
        expect(newHeader.title).toEqual(newTitle);
    });
});

describe('Empty title', () => {
    it('should not set title', () => {
        const newTitle = '';

        const newPres = setTitle(presWithActiveSlide, newTitle);
        expect(newPres.title).toEqual(presWithActiveSlide.title);
    });
});

describe('Add slide to not empty pres', () => {
    it ('should add', () => {
       const newPresentation = addSlide(presWithActiveSlide);
       expect(newPresentation.slides.length).toEqual(presWithActiveSlide.slides.length + 1);
    });
});

describe('Add slide to not empty pres', () => {
    it ('should add', () => {
       const newPresentation = addSlide(presWithActiveSlide);
       expect(newPresentation.slides.length).toEqual(presWithActiveSlide.slides.length + 1);
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
        const newPres = addElement(presWithActiveSlide, 'text');
        expect(newPres.activeSlideId).toEqual(presWithActiveSlide.activeSlideId);
        expect(newPres.slides.find(slide => 
            slide.id === newPres.activeSlideId).slideData.length)
            .toEqual(presWithActiveSlide.slides.find(slide => 
                slide.id === presWithActiveSlide.activeSlideId).slideData.length + 1);
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

describe('Change element position', () => {
    it ('should change position single element', () => {
        const offset = {x: 10, y: 10};
        const newPres = moveElementByOffset(presWithActiveElement, offset);
        const oldElemPoint = 
            presWithActiveElement.slides.find(s => s.id === presWithActiveElement.activeSlideId)
                .slideData.find(e => e.id === presWithActiveElement.selection.value[0]).point;
        const newElemPoint = 
            newPres.slides.find(s => s.id === newPres.activeSlideId)
                .slideData.find(e => e.id === newPres.selection.value[0]).point;
        
        expect(newElemPoint.x).toEqual(oldElemPoint.x + offset.x);
        expect(newElemPoint.y).toEqual(oldElemPoint.y + offset.y);
    });
});

describe('Resize element', () => {
    it ('should resize', () => { 
        const offsetPoint = {x: 10, y: 20};
        const offsetDimension = {width: 30, height: 40};
        const newPres = resizeElement(presWithActiveElement, offsetPoint, offsetDimension);

        const oldElement = 
            presWithActiveElement.slides.find(s => s.id === presWithActiveElement.activeSlideId)
                .slideData.find(e => e.id === presWithActiveElement.selection.value[0]);

            const newElem = 
                newPres.slides.find(s => s.id === newPres.activeSlideId)
                    .slideData.find(e => e.id === newPres.selection.value[0]);

        expect(newElem.point.x).toEqual(oldElement.point.x + offsetPoint.x);
        expect(newElem.point.y).toEqual(oldElement.point.y + offsetPoint.y);
        expect(newElem.dimension.width).toEqual(oldElement.dimension.width + offsetDimension.width);
        expect(newElem.dimension.height).toEqual(oldElement.dimension.height + offsetDimension.height);
    });
});

describe('Change text content', () => {
    it ('new element should have type text', () => {
        const newPres = changeTextBlockProperty(presWithActiveElement, 'content', 'newContent');
        const newElem = 
                newPres.slides.find(s => s.id === newPres.activeSlideId)
                    .slideData.find(e => e.id === newPres.selection.value[0]);
        expect(newElem.type).toEqual('text');
    });
});

describe('Change text content', () => {
    it ('new element should have new content', () => {
        const newPres = changeTextBlockProperty(presWithActiveElement, 'content', 'newContent');
        const newElem = 
                newPres.slides.find(s => s.id === newPres.activeSlideId)
                    .slideData.find(e => e.id === newPres.selection.value[0]) as TextBlock;
        expect(newElem.content).toEqual('newContent');
    });
});

describe('Change font size', () => {
    it ('new element should have new font size', () => {
        const newPres = changeTextBlockProperty(presWithActiveElement, 'fontSize', 666);
        const newElem = 
                newPres.slides.find(s => s.id === newPres.activeSlideId)
                    .slideData.find(e => e.id === newPres.selection.value[0]) as TextBlock;
        expect(newElem.fontSize).toEqual(666);
    });
});

describe('Try to change not existed property of textblock', () => {
    it ('should not change elem', () => {
        const newPres = changeTextBlockProperty(presWithActiveElement, 'hahaha', 666);
        
        const oldElem = 
            presWithActiveElement.slides.find(s => s.id === presWithActiveElement.activeSlideId)
                .slideData.find(e => e.id === presWithActiveElement.selection.value[0]) as TextBlock;
        
        const newElem = 
                newPres.slides.find(s => s.id === newPres.activeSlideId)
                    .slideData.find(e => e.id === newPres.selection.value[0]) as TextBlock;
        expect(newElem).toEqual(oldElem);
    });
});