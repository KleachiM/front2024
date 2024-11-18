export type Presentation = {
    header: PresentationHeader,
    slides: Array<Slide>,
    activeSlide: number,
    selection: Array<number>
}

export type PresentationHeader = {
    title: string,
    actions: Array<Image>
}

export type Slide = {
    background: string|Image,
    slideData: Array<SlideElement>,
    selection: Array<SelectionElement>
}

export type Image = {
    type: 'image',
    source: string
}

export type TextBlock = {
    type: 'text',
    content: string,
    fontSize: number,
    fontColor: string,
    fontFamily: string
}

export type SlideElement = TextBlock|Image;

export type SelectionElement = {
    selected: Array<SlideElement>
}

