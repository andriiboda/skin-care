"use strict";

const body = document.querySelector('body');
const header = document.querySelector('.header');
// Functions

function toggleOverflowOnBody() {
  const differenceWindowPage = window.innerWidth - body.clientWidth;
  
  if (body.style.overflow == 'hidden')
    body.style.overflow = "";
  else
    body.style.overflow = 'hidden';

  if (parseInt(body.style.paddingRight) > 0) {
    body.style.paddingRight = '';
  } else if (differenceWindowPage > 0) {
    body.style.paddingRight = differenceWindowPage + "px";
  }
}

function getElementByHref(value, wrapper) {
  return document.querySelector((wrapper ? '.' + wrapper + ' ' : '') + 'a[href="#' + value + '"]');
}

// Main Menu
const mobNavBtn = document.querySelector('.mob-btn');
const mobNavBtnClose = document.querySelector('.mob-nav__close');
const mobNavBtnContatcUs = document.querySelector('.mob-nav__btn');
const mobNavBg = document.querySelector('.mob-nav__bg');
const mobNav = document.querySelector('.mob-nav');

function openMainMenu() {
  toggleOverflowOnBody();

  if (mobNavBtn.classList.contains('mob-btn')) 
    mobNavBtn.classList.add('active');

  mobNav.classList.add('active', 'opening');

  setTimeout(function() {
    mobNav.classList.remove('opening');    
    mobNav.classList.add('open');    
  }, 1000);
}

function closeMainMenu(event, callback) {
  if(mobNav.classList.contains('open')) {
    mobNav.classList.add('closing');

    setTimeout(function() {
      mobNavBtn.classList.remove('active');
    }, 500);

    setTimeout(function() {
      mobNav.classList.remove('closing', 'active', 'open');
      toggleOverflowOnBody();

      if (typeof callback == 'function')
        callback()

    }, 1000);
  }
}

if (mobNavBtn)
  mobNavBtn.addEventListener('click', openMainMenu);
if (mobNavBtnClose)
  mobNavBtnClose.addEventListener('click', closeMainMenu);
if (mobNavBg)
  mobNavBg.addEventListener('click', closeMainMenu);
if (mobNavBtnContatcUs) {
  mobNavBtnContatcUs.addEventListener('click', function() {
    return closeMainMenu(null, contactUsOpenForm)
  });
}
// End Main Menu

// Contact Us
const contactUsWrapper = document.querySelector('.contact-us-wrapper');
const contactUsInner = document.querySelector('.contact-us-inner');

function contactUsOpenForm() {
  toggleOverflowOnBody();

  contactUsWrapper.classList.add('active', 'opening');

    setTimeout(function() {
      contactUsWrapper.classList.add('open');
      contactUsInner.classList.add('auto-scroll');
      contactUsWrapper.classList.remove('opening');
    }, 3500);
}

function contactUsCloseForm() {
  if (contactUsWrapper.classList.contains('open')) {
    contactUsWrapper.classList.add('closing');
    contactUsInner.classList.remove('auto-scroll');

    setTimeout(function() {
      contactUsWrapper.classList.remove('open', 'closing', 'active');
      toggleOverflowOnBody()
    }, 2000);
  }
}

if (document.querySelector('.contact-us-btn')) {
  document.querySelector('.contact-us-btn')
    .addEventListener('click', contactUsOpenForm);
}

if (document.querySelector('.contact-us-form__btn')) {
  document.querySelector('.contact-us-form__btn')
    .addEventListener('click', contactUsCloseForm);
}
// End Contact Us

// Thank You Modal
const orederButton = document.querySelector('#sendMessage');
const thankYouModal = document.querySelector('#thankYouModal');

function openModal() {
  toggleOverflowOnBody()

  thankYouModal.classList.add('opening', 'active');

  setTimeout(function() {
    thankYouModal.classList.add('open');    
    thankYouModal.classList.remove('opening');    
  }, 1400)
}

function closeModal() {
  if (thankYouModal.classList.contains('open')) {
    thankYouModal.classList.add('closing');
    thankYouModal.classList.remove('open');

    setTimeout(function() {
      thankYouModal.classList.remove('closing', 'active');
      toggleOverflowOnBody()
    }, 700);

  }
}

if (orederButton)
  orederButton.addEventListener('click', openModal);

document.addEventListener('click', function(event) {
  if (event.target.classList.contains('modal__close') || 
      event.target.classList.contains('order-send__btn') || 
      event.target.classList.contains('modal-inner')) {
    closeModal()
  }
});

// End Thank You Modal

// Main Nav Active Link
let headerHeight = header.clientHeight;

function removeSiblingsLinkClass(element, className) {
  if (element.parentElement.previousElementSibling) {
    element.parentElement.previousElementSibling.querySelector('.' + className).classList.remove('active');
  }
  if (element.parentElement.nextElementSibling != null) {
    element.parentElement.nextElementSibling.querySelector('.main-nav__link').classList.remove('active');
  }
}

function switchingMainNavItem(section, wrapper, isRemove) {
  const currentActiveLink = getElementByHref(section.getAttribute('id'), wrapper);
  if (isRemove)
    currentActiveLink.classList.remove('active');
  else
    currentActiveLink.classList.add('active');
  removeSiblingsLinkClass(currentActiveLink, 'main-nav__link')
}

function checkingScrollToSection() {
  if (document.querySelector('.main-nav')) {
    if (window.visualViewport.pageTop > rewiews.offsetHeight + rewiews.offsetTop - parseInt(getComputedStyle(rewiews)['padding-top']) ||
        window.visualViewport.pageTop < about.offsetTop - headerHeight)
      switchingMainNavItem(beforeAfter, 'main-nav', true);
    else if (window.visualViewport.pageTop + headerHeight + 20 >= rewiews.offsetTop)
      switchingMainNavItem(rewiews, 'main-nav');
    else if (window.visualViewport.pageTop + headerHeight + 20 >= beforeAfter.offsetTop)
      switchingMainNavItem(beforeAfter, 'main-nav');
    else if (window.visualViewport.pageTop + headerHeight + 20 >= about.offsetTop)
      switchingMainNavItem(about, 'main-nav');
  }
}

function changeActiveMainNavItem() {
  const mainNavList = document.querySelector('.main-nav__list');
  if (mainNavList) {

    const about = document.querySelector('#about');
    const beforeAfter = document.querySelector('#beforeAfter');
    const rewiews = document.querySelector('#rewiews');

    window.addEventListener("scroll", function() {
      checkingScrollToSection();
    });
  }
}
// End Main Nav Active Link

function scrollToBlockByMainNavLink(linkClass, callback) {
  const anchors = document.querySelectorAll(linkClass + '[href*="#"]');

  for (let anchor of anchors) {

    anchor.addEventListener('click', function(event) {
      event.preventDefault();

      if (typeof callback == 'function')
        callback();

      const blockId = anchor.getAttribute('href');
      const section = document.querySelector(blockId);
      
      let toScroll = null;
      
      if (blockId == '#rewiews')
        toScroll = section.offsetTop + parseInt(getComputedStyle(section)['padding-top']) - header.clientHeight - 30;
      else if (blockId == '#about')
        toScroll = section.offsetTop + parseInt(getComputedStyle(section)['padding-top']) - header.clientHeight + 50;
      else
        toScroll = section.offsetTop + parseInt(getComputedStyle(section)['padding-top']) - header.clientHeight

      window.scrollTo({
        top: toScroll,
        behavior: "smooth"
      });
    });
  }
}

function headerChangeBackground() {
  if (window.visualViewport.pageTop > 0) {
    header.classList.add('fixed');
  } else {
    header.classList.remove('fixed');
  }
}

function headerMovement() {
  window.addEventListener("scroll", function() {
    headerChangeBackground();
  });
}

function main() {
  headerMovement();
  headerChangeBackground();

  checkingScrollToSection();
  changeActiveMainNavItem();

  if (document.querySelector('.main-nav')) {
    scrollToBlockByMainNavLink('.main-nav__link');
  }

  if (document.querySelector('.mob-nav__list')) {
    scrollToBlockByMainNavLink('.mob-nav__link', closeMainMenu);
  }

  if (document.querySelector('.click-down')) {
    document.querySelector('.click-down').addEventListener('click', function(event) {
      const section = document.querySelector('#about');
      const toScroll = section.offsetTop + parseInt(getComputedStyle(section)['padding-top']) - header.clientHeight + 50;

      window.scrollTo({
        top: toScroll,
        behavior: "smooth"
      });
    });
  }

  document.addEventListener('input', function(event) {
    const element = event.target;
    if (element.classList.contains('input') && element.value.length > 0) {
      element.parentElement.classList.add('with-data');
    } else if (element.classList.contains('input') && element.value.length < 1) {
      element.parentElement.classList.remove('with-data');
    }
  });

  const beforeAfterCount = document.querySelectorAll('.b-dics').length;

  for (let i = 0; i < beforeAfterCount; i++) {
    new Dics({
      container: document.querySelectorAll('.b-dics')[i],
      linesOrientation: 'vertical',
    });    
  }

}

document.addEventListener("DOMContentLoaded", main);

if (document.querySelector('.swiper-container')) {
  let appendNumber = 600;
  let prependNumber = 1;
  const progressCountWrap = document.querySelector('.before-after-progress-count');
  

  const swiper = new Swiper('.swiper-container', {
    on: {
      init: function () {
        swiperCurrentSlide(this)
        progressCountWrap.querySelector('.before-after-progress-count-total').innerText = this.slides.length;
      },
    },
    slidesPerView: 3,
    spaceBetween: 60,
    
    pagination: {
      el: '.before-after-progress-scrollbar',
      type: 'progressbar',
    },
    navigation: {
      nextEl: '.before-after-progress-next',
      prevEl: '.before-after-progress-prev',
    },

    breakpoints: {
      0: {
        slidesPerView: 1.2,
        spaceBetween: 30,
      },
      400: {
        slidesPerView: 1.3,
        spaceBetween: 30,
      },
      480: {
        slidesPerView: 1.4,
        spaceBetween: 30,
      },
      576: {
        slidesPerView: 1.5,
        spaceBetween: 30,
      },
      600: {
        slidesPerView: 1.4,
        spaceBetween: 40,
      },
      640: {
        slidesPerView: 1.5,
        spaceBetween: 40,
      },
      680: {
        slidesPerView: 1.6,
        spaceBetween: 40,
      },
      720: {
        slidesPerView: 1.7,
        spaceBetween: 40,
      },
      760: {
        slidesPerView: 1.8,
        spaceBetween: 40,
      },
      800: {
        slidesPerView: 1.9,
        spaceBetween: 40,
      },
      840: {
        slidesPerView: 2,
        spaceBetween: 40,
      },
      920: {
        slidesPerView: 2.3,
        spaceBetween: 40,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      1200: {
        spaceBetween: 25,
      },
      1340: {
        spaceBetween: 30,
      },
      1440: {
        spaceBetween: 40,
      },
      1590: {
        spaceBetween: 50,
      },
      1690: {
        spaceBetween: 60,
      }
    }
  });

  function swiperCurrentSlide(swiper, slideActive) {
    if (window.screen.width < 1024) 
      progressCountWrap.querySelector('.before-after-progress-count-current').innerText = swiper.activeIndex + 1;
    else
      progressCountWrap.querySelector('.before-after-progress-count-current').innerText = swiper.activeIndex + 3;
  }
  
  swiper.on('slideChange', function() {
    swiperCurrentSlide(swiper);
  });

  window.onresize = function() {
    swiperCurrentSlide(swiper);
    swiper.init()
  };
}