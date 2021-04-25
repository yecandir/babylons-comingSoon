function toggleAccordion(accordion) {
  if (accordion.classList.contains('accordion--expanded')) {
    shrinkAccordion(accordion);
  } else {
    expandAccordion(accordion);
  }
}

function expandAccordion(accordion) {
  const content = accordion.querySelector('.accordion__content');
  content.style.height = content.scrollHeight + 'px';
  accordion.classList.add('accordion--expanded');
}

function shrinkAccordion(accordion) {
  const content = accordion.querySelector('.accordion__content');
  content.style.height = '0';
  accordion.classList.remove('accordion--expanded');
}

function createAccordion(element) {
  const action = element.querySelector('.accordion__action')

  shrinkAccordion(element);

  action.addEventListener('click', () => {
    toggleAccordion(element);
  })
}

function createCarousel(selector, infinite) {
  const track = document.querySelector(selector).children[0];

  const trackCount = track.children.length;

  function addTracks(n) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < trackCount; j++) {
        track.appendChild(track.children[j].cloneNode(true));
      }
    }
  }

  function removeTracks(n) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < trackCount; j++) {
        track.removeChild(track.children[0]);
      }
    }
  }

  if (infinite) {
    addTracks(3);
  }


  const carousel = {
    track: track,
    total: trackCount,
    current: 0,
    goNext() {
      console.log('children count', this.track.children.length);
      console.log('current', this.current);

      if (infinite && ((this.track.children.length - this.current) <= this.total)) {
        console.log('children count before add', this.track.children.length);

        addTracks(2);

        console.log('children count after add', this.track.children.length);

        removeTracks(2);

        this.current -= 2 * this.total;

        console.log('children count after remove', this.track.children.length);

      }

      this.current = Math.min(this.current + 1, this.track.children.length - 1);

      this.update();
    },
    goBack() {
      this.current = Math.max(this.current - 1, 0);
      this.update();
    },
    update() {
      let translateAmount = 0;

      for (let i = 0; i < this.current; i++) {
        translateAmount += track.children[i].clientWidth;
      }

      this.track.style.transform = `translateX(-${translateAmount}px)`;

      for (let i = 0; i < this.track.children.length; i++) {
        if (this.current === i) {
          this.track.children[i].classList.add('current');
        } else {
          this.track.children[i].classList.remove('current');
        }
      }
    }
  }
  carousel.update();
  return carousel;
}

function createModal() {
  const modalBg = document.querySelector('.modal-bg');
  modalBg.style.display = 'none';

  const modal = {
    isOpened: false,
    openModal() {
      modalBg.style.display = 'flex';
    },
    closeModal() {
      modalBg.style.display = 'none';
    }
  }

  modalBg.addEventListener('click', (e) => {
    modal.closeModal();
  })

  return modal;
}

document.addEventListener('DOMContentLoaded', () => {
  const accordions = document.querySelectorAll('.accordion');

  accordions.forEach(accordion => createAccordion(accordion));

  const carousel = createCarousel('.roadmap__timeline', false);
  document.querySelector('.roadmap__nav').children[0].addEventListener('click', carousel.goBack.bind(carousel));
  document.querySelector('.roadmap__nav').children[1].addEventListener('click', carousel.goNext.bind(carousel));

  // const intCarousel = createCarousel('.partners__track', true);
  // setInterval(() => {
  //   intCarousel.goNext();
  // }, 1500);

  const modal = createModal();
  document.querySelector('.hero__video').addEventListener('click', modal.openModal.bind(modal));

  const navbar = document.querySelector('.nav');

  document.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');

    if (window.scrollY > hero.clientHeight) {
      navbar.style.backgroundColor = 'rgba(30, 30, 30, 1)';
    } else {
      navbar.style.backgroundColor = 'rgba(30, 30, 30, 0.4)';
    }
  });
})
function toggleMobileMenu() {
  document.querySelector('.nav-links').classList.toggle('active')
  document.querySelector('.mobile-bar').classList.toggle('active')
}
