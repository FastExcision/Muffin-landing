import {slides} from './pageSliderUtils'

const defaultSlide = {
  length: 0,
  currentStateIndex: 0,
  section: undefined,
  appearText: undefined,
}

export const slideState = [
  { ...defaultSlide },
  {
    ...defaultSlide,
    length: slides[1].querySelectorAll('.appear-text').length,
    section: slides[1],
    appearText: slides[1].querySelectorAll('.appear-text'),
  },
  { ...defaultSlide },
  { ...defaultSlide },
  { ...defaultSlide },
  { ...defaultSlide },
];

export const pageAppearTextChangeState = (scrollDirection, activeSlideIndex) => {

  const activeElement =
    slideState[activeSlideIndex].appearText[slideState[activeSlideIndex].currentStateIndex];
  const nextElement =
    slideState[activeSlideIndex].appearText[slideState[activeSlideIndex].currentStateIndex + 1];
  const prevElement =
    slideState[activeSlideIndex].appearText[slideState[activeSlideIndex].currentStateIndex - 1];

  if (scrollDirection > 0) {
    activeElement.classList.add('gray');
    nextElement.classList.remove('display-none');
    slideState[activeSlideIndex].currentStateIndex += 1;
    return;
  }
  if (scrollDirection < 0) {
    prevElement.classList.remove('gray');
    activeElement.classList.add('display-none');
    slideState[activeSlideIndex].currentStateIndex -= 1;
  }
};