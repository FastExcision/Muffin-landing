import {
  slides,
  scrollToSlide,
  calcSlideHeight,
  getPrevSlideHeight,
  getActiveSlideIndex
} from './pageSliderUtils';
// import {slideState} from './appearText';

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
  for (let i = 0; i < menuButtonTargets.length; i += 1) {
    if (slides[getActiveSlideIndex()] !== menuButtonTargets[i].slideTarget) {
      menuButtonTargets[i].headerTarget.classList.remove('active');
    } else {
      menuButtonTargets[i].headerTarget.classList.add('active');
    }
  }
  if (slides[getActiveSlideIndex()] === childhoodPage) {
    header.classList.remove('white');
    header.classList.add('primary-black');
    return;
  }
    header.classList.remove('primary-black');
    header.classList.add('white');
};

export const menuSlideNav = () => {
  for (let i = 0; i < menuButtonTargets.length; i += 1) {
    headerLinks[i].addEventListener('click', () => {
      for (let j = 0; j < slides.length; j += 1) {
        if (menuButtonTargets[i].slideTarget === slides[j]) {
          scrollToSlide(j);
          calcSlideHeight();
          navMenuActiveSlide();
        }
      }
    });
  }
};
