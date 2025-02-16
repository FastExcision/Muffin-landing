/* global document */
import header from '../pages/header.html';
import titlePage from '../pages/title-page.html';
import childhoodPage from '../pages/childhood-page.html';
import oneDayPage from '../pages/one-day-page.html';
import badDaysPage from '../pages/bad-days-page.html';
import scaredOutsidePage from '../pages/scared-outside-page.html';
import superheroPage from '../pages/superhero-page.html';

const headerElement = document.getElementById('header');
const titlePageElement = document.getElementById('title-page');
const childhoodPageElement = document.getElementById('childhood-page');
const oneDayPageElement = document.getElementById('one-day-page');
const badDaysPageElement = document.getElementById('bad-days-page');
const scaredOutsidePageElement = document.getElementById('scared-outside-page');
const superheroPageElement = document.getElementById('superhero-page');

const importPagesArray = [
  header,
  titlePage,
  childhoodPage,
  oneDayPage,
  badDaysPage,
  scaredOutsidePage,
  superheroPage,
];
const elementsArray = [
  headerElement,
  titlePageElement,
  childhoodPageElement,
  oneDayPageElement,
  badDaysPageElement,
  scaredOutsidePageElement,
  superheroPageElement,
];
const loadSection = () => {
  for (let i = 0; i < elementsArray.length; i += 1) {
    if (elementsArray[i]) {
      elementsArray[i].innerHTML = importPagesArray[i];
    }
  }
};

loadSection();
