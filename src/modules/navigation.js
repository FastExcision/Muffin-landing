import {
  slides,
  scrollToSlide,
  calcSlideHeight,
  getPrevSlideHeight,
  getActiveSlideIndex,
} from './pageSliderUtils';

const titlePage = document.getElementById('title-page');
const childhoodPage = document.getElementById('childhood-page');
const badDaysPage = document.getElementById('bad-days-page');
const superheroPage = document.getElementById('superhero-page');
const header = document.getElementById('header');
const headerLinks = header.getElementsByClassName('menu__nav-item');

const menuButtonTargets = [
  {
    slideTarget: titlePage,
    headerTarget: headerLinks[0],
  },
  {
    slideTarget: childhoodPage,
    headerTarget: headerLinks[1],
  },
  {
    slideTarget: badDaysPage,
    headerTarget: headerLinks[2],
  },
  {
    slideTarget: superheroPage,
    headerTarget: headerLinks[3],
  },
];

export const navMenuActiveSlide = () => {
  header.style.top = `${getPrevSlideHeight()}px`;
  const activeSlide = slides[getActiveSlideIndex()];

  menuButtonTargets.forEach(({ slideTarget, headerTarget }) => {
    headerTarget.classList.toggle('active', slideTarget === activeSlide);
  });
  header.classList.toggle('primary-black', activeSlide === childhoodPage);
  header.classList.toggle('white', activeSlide !== childhoodPage);
};

export const menuSlideNav = () => {
  menuButtonTargets.forEach(({ slideTarget, headerTarget }) => {
    headerTarget.addEventListener('click', () => {
      for (let j = 0; j < slides.length; j += 1) {
        if (slideTarget === slides[j]) {
          scrollToSlide(j);
          calcSlideHeight();
          navMenuActiveSlide();
        }
      }
    });
  });
};
