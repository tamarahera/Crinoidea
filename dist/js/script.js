/* hamburger */

const hamburger = document.querySelector('.hamburger'), 
      menu = document.querySelector('.menu'),
      menuOverlay = document.querySelector('.menu__overlay'),
      closeElem = document.querySelector('.menu__close');
    
hamburger.addEventListener('click', () => {
    menu.classList.add('active');
});

closeElem.addEventListener('click', () => {
    menu.classList.remove('active');
});

menu.addEventListener('click', (event) => {
    if (event.target == menuOverlay) {
        menu.classList.remove('active');
    }
});

/* percents */
const percents = document.querySelectorAll('.scale__item-percent'),
      lines = document.querySelectorAll('.scale__item-progress span');

percents.forEach( (item, i) => {
      lines[i].style.width = item.innerHTML;
});

/* scroll to a section */
let linksScroll = document.querySelectorAll('[href^="#"]'),
    speed = 0.2;
linksScroll.forEach(item => {
    item.addEventListener('click', function(event) {
        event.preventDefault();

        let heightTop = document.documentElement.scrollTop, // scrolled px from top 
            hash = this.hash,
            toBlock = document.querySelector(hash).getBoundingClientRect().top, // distance from one element to another
            start = null;
            elementPosition = heightTop + toBlock; // element`s position from top

        requestAnimationFrame(frame);

        function frame(time) {
            if (start === null) {
                start = time;
            }

            let progress = time - start,
                r = (toBlock < 0 ? Math.max(heightTop - progress / speed, elementPosition) : Math.min(heightTop + progress / speed, elementPosition));

            document.documentElement.scrollTo(0, r);

            if (r != elementPosition) {
                requestAnimationFrame(frame);
            } else {
                location.hash = hash;
            }
        }

        if (this == event.target && menu.classList.contains('active')) {
            menu.classList.remove('active');
        }
    })
})


//scroll to top
const pageUp = document.querySelector('[href="#promo"]');

window.addEventListener('scroll', () => {
    if (document.documentElement.scrollTop > 600) {
        pageUp.classList.add('show');
        pageUp.classList.remove('hide');
    } 
    if (document.documentElement.scrollTop < 600) {
        pageUp.classList.add('hide');
        pageUp.classList.remove('show');
    }
});

pageUp.addEventListener('click', (event) => {
    event.preventDefault();

    let a = setInterval(() => {
        document.documentElement.scrollTop -= 40;
        if (document.documentElement.scrollTop == 0) {
            clearInterval(a);
        }
    }, 4);
});


const links = document.querySelectorAll('.contact__link'),
      linkWrapper = document.querySelector('.contact');

function addForwardAnimation() {
    links.forEach(item => {
        item.style.top = 50 + '%';
        item.style.transform = 'translateY(-50%)';
    });
}

function addBackwardAnimation() {
    links.forEach(item => {
        item.style.top = '';
        item.style.transform = '';
    });
}

if (document.documentElement.clientWidth >= 768) {
    linkWrapper.addEventListener('mouseenter', () => {
        addForwardAnimation();
    });

    linkWrapper.addEventListener('mouseleave', () => {
        addBackwardAnimation();
    });
}

if (document.documentElement.clientWidth < 768) {
    linkWrapper.addEventListener('touchstart', () => {
        addForwardAnimation();
    });
}