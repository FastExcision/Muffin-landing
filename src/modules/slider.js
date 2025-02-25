// осталось хедер. делать ли отдельным модулем и экспортировать
const slides = document.querySelectorAll('.slide');
const appearText = document.querySelectorAll('.appearText');
const slidesArray = Object.values(slides);
const appearTextArray = Object.values(appearText);
const childhoodPage = document.getElementById('childhood-page');

const slidesArrayLength = slidesArray.length;
const scrollLength = window.innerHeight / 1.5;

let activeSlideIndex = 0;
let activeSlideHeight = slidesArray[activeSlideIndex].offsetHeight;
let childhoodPageStateIndex = 0;


// загрузчик стартовой страницы
window.onload = () => {
  setTimeout(() => {
    slidesArray[activeSlideIndex].scrollIntoView();
  }, 1);
};

// типа вспомогательные функции
const calcSlideHeight = () => {
  activeSlideHeight = 0;
  for (let i = activeSlideIndex; i >= 0; i -= 1) {
    activeSlideHeight += slidesArray[i].offsetHeight;
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
  nextSlide.scrollIntoView();
  activeSlideIndex += 1;
  calcSlideHeight();
};
const toPrevSlide = (prevSlide) => {
  prevSlide.scrollIntoView();
  activeSlideIndex -= 1;
  calcSlideHeight();
};

// типа основные
const childhoodPageChangeState = (scrollDirection, nextSlide, prevSlide) => {
  const activeElement = appearTextArray[childhoodPageStateIndex];
  const prevElement = appearTextArray[childhoodPageStateIndex - 1];
  const nextElement = appearTextArray[childhoodPageStateIndex + 1];
  if (
    childhoodPageStateIndex === appearTextArray.length &&
    scrollDirection > 0
  ) {
    toNextSlide(nextSlide);
    return;
  }
  if (childhoodPageStateIndex === 0 && scrollDirection < 0) {
    toPrevSlide(prevSlide);
    return;
  }
  if (scrollDirection > 0) {
    activeElement.classList.add('gray');
    nextElement.classList.remove('display-none');
    childhoodPageStateIndex += 1;
    return;
  }
  if (scrollDirection < 0) {
    prevElement.classList.remove('gray');
    activeElement.classList.add('display-none');
    childhoodPageStateIndex -= 1;
  }
};
const sectionScroll = (scrollDirection) => {
  const activeSlide = slidesArray[activeSlideIndex];
  const nextSlide = slidesArray[activeSlideIndex + 1];
  const prevSlide = slidesArray[activeSlideIndex - 1];
  console.log(
    childhoodPageStateIndex, appearTextArray.length
  );
  if (
    activeSlide === childhoodPage &&
    ((childhoodPageStateIndex >= 0 &&
      childhoodPageStateIndex < appearTextArray.length - 1) ||
    (childhoodPageStateIndex <= appearTextArray.length && scrollDirection < 0))
  ) {
    childhoodPageChangeState(scrollDirection, nextSlide, prevSlide);
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
    activeSlideIndex < slidesArrayLength - 1
  ) {
    toNextSlide(nextSlide);
  }
  if (
    scrollDirection < 0 &&
    activeSlideIndex > 0 &&
    activeSlideIndex <= slidesArrayLength - 1
  ) {
    toPrevSlide(prevSlide);
  }
};

// листенеры
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
