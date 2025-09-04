const burgerMenu = document.querySelector('.menu-button__menu');
const accordionCols = document.querySelectorAll('.accordion__col');
const lenis = new Lenis();

if (burgerMenu) {
    const menuBackground = document.querySelector('.main-menu-background');
    const mainMenu = document.querySelector('.main-menu');

    burgerMenu.addEventListener('click', function () {
        burgerMenu.classList.toggle('active');

        if (burgerMenu.classList.contains('active')) {
            lenis.stop();
            menuBackground.classList.add('active');
            mainMenu.classList.add('active');
        } else {
            lenis.start();
            menuBackground.classList.remove('active');
            mainMenu.classList.remove('active');
        }
    })
}

gsap.utils.toArray('[data-parallax-wrapper]').forEach(container => {
    const image = container.querySelector('[data-parallax-target]');

    const timeline = gsap.timeline({
        scrollTrigger: {
            trigger: container,
            scrub: true
        }
    });

    timeline.fromTo(image, {
        yPercent: -15,
        ease: 'none'
    }, {
        yPercent: 15,
        ease: 'none'
    })
});

accordionCols.forEach(col => {
    col.addEventListener('mouseenter', () => {
        accordionCols.forEach(c => {
            c.classList.remove('active');
            col.classList.add('active');
        });
    });
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

function globalGradient() {
    const interactiveBubble = document.querySelector('.interactive');

    let curX = 0,
        curY = 0,
        tgX = 0,
        tgY = 0

    function move() {
        curX += (tgX - curX) / 20;
        curY += (tgY - curY) / 20;

        gsap.set(interactiveBubble, {
            x: Math.round(curX),
            y: Math.round(curY)
        });

        requestAnimationFrame(() => {
            move();
        })
    }

    window.addEventListener('mousemove', (event) => {
        tgX = event.clientX;
        tgY = event.clientY;
    });

    move();
}

globalGradient();