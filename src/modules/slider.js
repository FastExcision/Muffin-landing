// осталось хедер. структура функций
const slides = document.querySelectorAll('.slide');

const slidesLength = slides.length;
const scrollLength = window.innerHeight / 1.5;

let activeSlideIndex = 0;
let activeSlideHeight = slides[activeSlideIndex].offsetHeight;
const defaultSlide = {
  length: 0,
  currentStateIndex: 0,
  section: undefined,
  appearText: undefined,
}
const slideState = [
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

// загрузчик стартовой страницы
window.onload = () => {
  setTimeout(() => {
    slides[activeSlideIndex].scrollIntoView();
  }, 1);
};

// типа вспомогательные функции
const calcSlideHeight = () => {
  activeSlideHeight = 0;
  for (let i = activeSlideIndex; i >= 0; i -= 1) {
    activeSlideHeight += slides[i].offsetHeight;
  }
};
const scrollBottom = (activeSlide) => {
  if (window.scrollY + scrollLength + window.innerHeight > activeSlideHeight) {
    activeSlide.scrollIntoView({ behavior: 'smooth', block: 'end' });
    return;
  }
  window.scrollTo({
    top: window.scrollY + scrollLength,
    behavior: 'smooth',
  });
};
const scrollTop = (activeSlide) => {
  if (
    window.scrollY - scrollLength <
    activeSlideHeight - activeSlide.offsetHeight
  ) {
    activeSlide.scrollIntoView({ behavior: 'smooth' });
    return;
  }
  window.scrollTo({
    top: window.scrollY - scrollLength,
    behavior: 'smooth',
  });
};
const toNextSlide = (nextSlide) => {
  nextSlide.scrollIntoView(
    // { behavior: 'smooth' }
  );
  activeSlideIndex += 1;
  calcSlideHeight();
};
const toPrevSlide = (prevSlide) => {
  prevSlide.scrollIntoView(
    // { behavior: 'smooth' }
  );
  activeSlideIndex -= 1;
  calcSlideHeight();
};

// типа основные
const pageAppearTextChangeState = (scrollDirection) => {

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
const sectionScroll = (scrollDirection) => {
  const activeSlide = slides[activeSlideIndex];
  const nextSlide = slides[activeSlideIndex + 1];
  const prevSlide = slides[activeSlideIndex - 1];

  const isAtStart = slideState[activeSlideIndex].currentStateIndex === 0;
  const isAtEnd = slideState[activeSlideIndex].currentStateIndex === slideState[activeSlideIndex].length - 1;
  const canScrollForward =
    slideState[activeSlideIndex].currentStateIndex >= 0 && !isAtEnd && scrollDirection > 0;
  const canScrollBackward =
    slideState[activeSlideIndex].currentStateIndex < slideState[activeSlideIndex].length &&
    !isAtStart &&
    scrollDirection < 0;

  if ((activeSlide === slideState[activeSlideIndex].section) &&
    canScrollForward ||      canScrollBackward ||      (slideState[activeSlideIndex].currentStateIndex > 0 && scrollDirection < 0))
     {
      pageAppearTextChangeState(scrollDirection);
      return;
    }

  if (
    (scrollDirection > 0 &&
      window.scrollY + window.innerHeight < activeSlideHeight) ||
    (scrollDirection < 0 &&
      window.scrollY > activeSlideHeight - activeSlide.offsetHeight)
  ) {
    if (scrollDirection > 0) {
      scrollBottom(activeSlide);
      return;
    }
      scrollTop(activeSlide);
      return;
  }

  if (
    scrollDirection > 0 &&
    activeSlideIndex >= 0 &&
    activeSlideIndex < slidesLength - 1
  ) {
    toNextSlide(nextSlide);
  }
  if (
    scrollDirection < 0 &&
    activeSlideIndex > 0 &&
    activeSlideIndex <= slidesLength - 1
  ) {
    toPrevSlide(prevSlide);
  }
};

//
window.addEventListener('wheel', ({ deltaY }) => {
  sectionScroll(deltaY);
});
window.addEventListener('keydown', ({ key }) => {
  if (key === 'ArrowUp') {
    sectionScroll(-1);
  }
  if (key === 'ArrowDown') {
    sectionScroll(1);
  }
});
