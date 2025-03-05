import {
  toPrevSlide,
  toNextSlide,
  scrollTop,
  scrollBottom,
  getActiveSlideIndex,
  getActiveSlideHeight,
  slides,
  slidesLength,
} from './pageSliderUtils';
import { pageAppearTextChangeState, slideState } from './appearText';

import { menuSlideNav, navMenuActiveSlide } from './navigation';

window.onload = () => {
  setTimeout(() => {
    slides[getActiveSlideIndex()].scrollIntoView();
  }, 1);
};

const sectionScroll = (scrollDirection) => {
  const activeSlideIndex = getActiveSlideIndex();
  const activeSlideHeight = getActiveSlideHeight();
  const activeSlide = slides[activeSlideIndex];
  const nextSlide = slides[activeSlideIndex + 1];
  const prevSlide = slides[activeSlideIndex - 1];

  const isAtStart = slideState[activeSlideIndex].currentStateIndex === 0;
  const isAtEnd =
    slideState[activeSlideIndex].currentStateIndex ===
    slideState[activeSlideIndex].lengthStateIndex - 1;
  const canScrollForward =
    slideState[activeSlideIndex].currentStateIndex >= 0 &&
    !isAtEnd &&
    scrollDirection > 0;
  const canScrollBackward =
    slideState[activeSlideIndex].currentStateIndex <
      slideState[activeSlideIndex].lengthStateIndex &&
    !isAtStart &&
    scrollDirection < 0;

  if (
    (activeSlide === slideState[activeSlideIndex].section &&
      canScrollForward) ||
    canScrollBackward ||
    (slideState[activeSlideIndex].currentStateIndex > 0 && scrollDirection < 0)
  ) {
    pageAppearTextChangeState(scrollDirection, activeSlideIndex);
    return;
  }

  if (
    (scrollDirection > 0 &&
      window.scrollY + window.innerHeight < activeSlideHeight) ||
    (scrollDirection < 0 &&
      window.scrollY - 2 > activeSlideHeight - activeSlide.offsetHeight)
  ) {
    if (scrollDirection > 0) {
      scrollBottom(activeSlide);
      return;
    }
    scrollTop(activeSlide);
    return;
  }

  if (scrollDirection > 0 && activeSlideIndex < slidesLength - 1) {
    toNextSlide(nextSlide);
  } else if (scrollDirection < 0 && activeSlideIndex > 0) {
    toPrevSlide(prevSlide);
  }
  navMenuActiveSlide();
};

menuSlideNav();
window.addEventListener('wheel', ({ deltaY }) => {
  sectionScroll(deltaY);
});
window.addEventListener('keydown', ({ key }) => {

  if (key === 'ArrowUp') {
    sectionScroll(-1);
  }
  if (key === 'ArrowDown' || key === " ") {
    sectionScroll(1);
  }
});
