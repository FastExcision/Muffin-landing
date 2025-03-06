export const slides = document.querySelectorAll('.slide');

export const scrollLength = window.innerHeight / 1.5;
export const slidesLength = slides.length;

let activeSlideIndex = 0;
let prevSlideHeight = 0;
let activeSlideHeight = slides[activeSlideIndex].offsetHeight;

export const calcSlideHeight = () => {
  activeSlideHeight = 0;
  for (let i = activeSlideIndex; i >= 0; i -= 1) {
    activeSlideHeight += slides[i].offsetHeight;
  }
  if (activeSlideIndex === 0) {
    prevSlideHeight = 0;
    return;
  }
  prevSlideHeight = activeSlideHeight - slides[activeSlideIndex].offsetHeight;
};
export const scrollBottom = (activeSlide) => {
  if (window.scrollY + scrollLength + window.innerHeight > activeSlideHeight) {
    activeSlide.scrollIntoView({ behavior: 'smooth', block: 'end' });
    return;
  }
  window.scrollTo({ top: window.scrollY + scrollLength, behavior: 'smooth' });
};
export const scrollTop = (activeSlide) => {
  if (
    window.scrollY - scrollLength <
    activeSlideHeight - activeSlide.offsetHeight
  ) {
    activeSlide.scrollIntoView({ behavior: 'smooth' });
    return;
  }
  window.scrollTo({ top: window.scrollY - scrollLength, behavior: 'smooth' });
};
export const toNextSlide = (nextSlide) => {
  nextSlide.scrollIntoView({ behavior: 'smooth' });
  activeSlideIndex += 1;
  calcSlideHeight();
};
export const toPrevSlide = (prevSlide) => {
  prevSlide.scrollIntoView({ behavior: 'smooth' });
  activeSlideIndex -= 1;
  calcSlideHeight();
};
export const scrollToSlide = (slideIndex) => {
  slides[slideIndex].scrollIntoView({ behavior: 'smooth' });
  activeSlideIndex = slideIndex;
};

export const getActiveSlideIndex = () => activeSlideIndex;
export const getActiveSlideHeight = () => activeSlideHeight;
export const getPrevSlideHeight = () => prevSlideHeight;
