/* global document */
import header from '../header.html';
import titlePage from '../title-page.html';
import childhoodPage from '../childhood-page.html';
import oneDayPage from '../one-day-page.html';

const headerElement = document.getElementById('header');
const titlePageElement = document.getElementById('title-page');
const childhoodPageElement = document.getElementById('childhood-page');
const oneDayPageElement = document.getElementById('one-day-page');

const importPagesArray = [header, titlePage, childhoodPage, oneDayPage];
const elementsArray = [headerElement, titlePageElement, childhoodPageElement, oneDayPageElement];
const loadSection = () => {
  for (let i = 0; i < elementsArray.length; i += 1) {
    if (elementsArray[i]) {
      elementsArray[i].innerHTML = importPagesArray[i];
    }
  }
};

loadSection();
