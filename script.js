'use strict';

//Selector
const modal = document.querySelector('.modal');
const learnMoreBtn = document.querySelector('.btn--scroll-to');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const navLinks = document.querySelector('.nav__links');
const navBar = document.querySelector('.nav');
const navHeight = navBar.getBoundingClientRect().height;
const sections = document.querySelectorAll('.section');
const section1 = document.querySelector('#section--1');
const header = document.querySelector('.header');
const imgTargeted = document.querySelectorAll('img[data-src');
const slides = document.querySelectorAll('.slide');
const slider = document.querySelector('.slider');
const btnLeftSlider = document.querySelector('.slider__btn--left');
const btnRightSlider = document.querySelector('.slider__btn--right');
/////

const openModal = e => {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = () => {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

const scroll = e => {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const scrollTarget = e.target.getAttribute('href');
    document.querySelector(scrollTarget).scrollIntoView({
      behavior: 'smooth',
    });
  }
};
//
const addTabsOnClick = e => {
  const clicked = e.target.closest('.operations__tab');
  if (!clicked) return;
  tabs.forEach(el => el.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');
  tabsContent.forEach(el => el.classList.remove('operations__content--active'));
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
};

const learnMoreScroll = e => {
  section1.scrollIntoView({
    behavior: 'smooth',
  });
};

const handleHoverEffect = (e, opacity) => {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = opacity;
    });
    logo.style.opacity = opacity;
  }
};

// Navbar observer
const stickyBar = entries => {
  const [entry] = entries;
  if (!entry.isIntersecting) navBar.classList.add('sticky');
  else navBar.classList.remove('sticky');
};

const navObserver = new IntersectionObserver(stickyBar, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
}).observe(header);
//////

//Sections observer
const showSection = (entries, observer) => {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(showSection, {
  root: null,
  threshold: 0.15,
});
sections.forEach(el => {
  sectionObserver.observe(el);
  // el.classList.add('section--hidden');
});
///////

//Images observer
const loadImages = (entries, observer) => {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', e => {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};
const imgObserver = new IntersectionObserver(loadImages, {
  root: null,
  threshold: 0,
  rootMargin: '150px',
});
imgTargeted.forEach(el => {
  imgObserver.observe(el);
});

//Slider component
let currentSlide = 0;
let maxSlides = slides.length - 1;
const slideImages = numSlides => {
  slides.forEach(
    (el, i) => (el.style.transform = `translateX(${100 * (i - numSlides)}%)`)
  );
};
slideImages(0);

const nextSlide = () => {
  currentSlide === maxSlides ? (currentSlide = 0) : currentSlide++;
  slideImages(currentSlide);
};
const prevSlide = () => {
  currentSlide === 0 ? (currentSlide = maxSlides) : currentSlide--;
  slideImages(currentSlide);
};
///
//Listeners
btnRightSlider.addEventListener('click', nextSlide);
btnLeftSlider.addEventListener('click', prevSlide);
navBar.addEventListener('mouseover', e => handleHoverEffect(e, 0.5));
navBar.addEventListener('mouseout', e => handleHoverEffect(e, 1));
navLinks.addEventListener('click', scroll);
learnMoreBtn.addEventListener('click', learnMoreScroll);
tabsContainer.addEventListener('click', addTabsOnClick);
