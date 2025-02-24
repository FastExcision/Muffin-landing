const slides = document.querySelectorAll('.slide');
const slidesArray = Object.values(slides);

let activeSlideIndex = 0;
let activeSlideHeight = slidesArray[activeSlideIndex].offsetHeight;
const slidesArrayLength = slidesArray.length;
const scrollLength = window.innerHeight / 1.5;

window.onload = () => {
  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 1);
};

const calcSlideHeight = () => {
  activeSlideHeight = 0;
  for (let i = activeSlideIndex; i >= 0; i -= 1) {
    activeSlideHeight += slidesArray[i].offsetHeight;
  }
};

const sectionScroll = (scrollDirection) => {
  const activeSlide = slidesArray[activeSlideIndex];
  const scrollBottom = () => {
    if (
      window.scrollY + scrollLength + window.innerHeight >
      activeSlideHeight
    ) {
      activeSlide.scrollIntoView({ behavior: 'smooth', block: 'end' });
      return;
    }
    window.scrollTo({
      top: window.scrollY + scrollLength,
      behavior: 'smooth',
    });
  };
  const scrollTop = () => {
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
  if (
    (scrollDirection > 0 && window.scrollY + window.innerHeight < activeSlideHeight) ||
    (scrollDirection < 0 &&
      window.scrollY > activeSlideHeight - activeSlide.offsetHeight)
  ) {
    if (scrollDirection > 0) {
      scrollBottom();
      return;
    }
    scrollTop();
    return;
  }
  const nextSlide = slidesArray[activeSlideIndex + 1];
  const prevSlide = slidesArray[activeSlideIndex - 1];
  if (
    scrollDirection > 0 &&
    activeSlideIndex >= 0 &&
    activeSlideIndex < slidesArrayLength - 1
  ) {
    nextSlide.scrollIntoView();
    activeSlideIndex += 1;
    calcSlideHeight();
  }
  if (
    scrollDirection < 0 &&
    activeSlideIndex > 0 &&
    activeSlideIndex <= slidesArrayLength - 1
  ) {
    prevSlide.scrollIntoView();
    activeSlideIndex -= 1;
    calcSlideHeight();
  }
};

window.addEventListener('wheel', ({ deltaY }) => {sectionScroll(deltaY)});
window.addEventListener('keydown', ({key}) => {
  if (key === 'ArrowUp') {sectionScroll(-1)}
  if (key === 'ArrowDown') {sectionScroll(1)}
});