const body = document.querySelector('body');

// Main Menu
const mobNavBtn = document.querySelector('.mob-btn');
const mobNavBtnClose = document.querySelector('.mob-nav__close');
const mobNavBg = document.querySelector('.mob-nav__bg');
const mobNav = document.querySelector('.mob-nav');

function openMainMenu() {
  body.style.overflow = 'hidden';

  if (this.classList.contains('mob-btn')) 
    this.classList.add('active');

  mobNav.classList.add('active', 'opening');

  setTimeout(function() {
    mobNav.classList.remove('opening');    
    mobNav.classList.add('open');    
  }, 1000);
}

function closeMainMenu() {
  mobNav.classList.add('closing');

  setTimeout(function() {
    mobNavBtn.classList.remove('active');
  }, 500);

  setTimeout(function() {
    mobNav.classList.remove('closing', 'active', 'open');
    body.style.overflow = '';
  }, 1000);
}

mobNavBtn.addEventListener('click', openMainMenu);
mobNavBtnClose.addEventListener('click', closeMainMenu);
mobNavBg.addEventListener('click', closeMainMenu);
// End Main Menu

function getElementByHref(value, wrapper) {
  return document.querySelector((wrapper ? '.' + wrapper + ' ' : '') + 'a[href="#' + value + '"]');
}

function removeSiblingsClass(element, className, isParent) {
  if (isParent) {
    if (element.parentElement.previousElementSibling) {
      element.parentElement.previousElementSibling.querySelector('.main-nav__link').classList.remove('active');
    }
    if (element.parentElement.nextElementSibling != null) {
      element.parentElement.nextElementSibling.querySelector('.main-nav__link').classList.remove('active');
    }
  }
}

const header = document.querySelector('.header');
let headerheight = header.clientHeight;

function scrollToBlockByMainNavLink() {
  const anchors = document.querySelectorAll('.main-nav__link[href*="#"]');

  for (let anchor of anchors) {
    anchor.addEventListener('click', function(event) {
      event.preventDefault();

      const blockId = anchor.getAttribute('href');

      if (document.querySelector(blockId)) {
        document.querySelector(blockId).scrollIntoView({
          behavior: "smooth",
          block: 'start'
        });
      }

    });
  }
}

function changeActiveMainNavItem() {
  const about = document.querySelector('#about');
  const beforeAfter = document.querySelector('#beforeAfter');
  const rewiews = document.querySelector('#rewiews');

  if (window.visualViewport.pageTop + headerheight >= rewiews.offsetTop) {
    getElementByHref('rewiews', 'main-nav').classList.add('active');
    removeSiblingsClass(getElementByHref('rewiews', 'main-nav'), 'active', true);
  } else if (window.visualViewport.pageTop + headerheight >= beforeAfter.offsetTop) {
    getElementByHref('beforeAfter', 'main-nav').classList.add('active');
    removeSiblingsClass(getElementByHref('beforeAfter', 'main-nav'), 'active', true);
  } else if (window.visualViewport.pageTop + headerheight >= about.offsetTop) {
    getElementByHref('about', 'main-nav').classList.add('active');
    removeSiblingsClass(getElementByHref('about', 'main-nav'), 'active', true);
  } else if (document.querySelector('.main-nav__link.active')) {
    document.querySelector('.main-nav__link.active').classList.remove('active');
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
    changeActiveMainNavItem();
  });
}

function openModal() {
  const button = document.querySelector('#sendMessage');
  const modal = document.querySelector('#thankYouModal');
  const body = document.querySelector('body');
  const differenceWindowPage = window.innerWidth - body.clientWidth;
  button.addEventListener('click', function() {
    modal.style.display = 'block';
    modal.classList.add('open');
    body.style.overflow = "hidden";

    if (differenceWindowPage > 0) {
      body.style.paddingRight = differenceWindowPage + "px";
    }

  });

  document.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal__close') || event.target.classList.contains('modal-inner')) {
      modal.classList.add('closing');
      setTimeout(function() {
        modal.classList.remove('open');
        modal.style.display = 'none';
        body.style.overflow = "";
        modal.classList.remove('closing');
        body.style.paddingRight = '';
      }, 1500);
    }
  });
} 



function main() {
  headerMovement();
  changeActiveMainNavItem();
  headerChangeBackground();
  scrollToBlockByMainNavLink();

  openModal();


  document.querySelector('.intro__btn').addEventListener('click', function(e) {
    const contactUsWrapper = document.querySelector('.contact-us-wrapper');

    contactUsWrapper.classList.add('active');
    contactUsWrapper.classList.add('opening');

    setTimeout(function() {
      contactUsWrapper.classList.add('open');
      contactUsWrapper.classList.remove('opening');
    }, 3600);

  });

  

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

let appendNumber = 600;
let prependNumber = 1;
const progressCountWrap = document.querySelector('.before-after-progress-count');

const swiper = new Swiper('.swiper-container', {
  on: {
    init: function () {
      progressCountWrap.querySelector('.before-after-progress-count-current').innerText = this.activeIndex + 3;
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

swiper.on('slideChange', function() {
  console.log(swiper.progress)
  progressCountWrap.querySelector('.before-after-progress-count-current').innerText = swiper.activeIndex + 3;
});

document.addEventListener("DOMContentLoaded", main);