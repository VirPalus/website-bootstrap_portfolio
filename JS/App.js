// NavBar & Footer

fetch("navbar.html").then(r => r.text()).then(h => navbar.innerHTML = h);
fetch("footer.html").then(r => r.text()).then(h => footer.innerHTML = h);

// Skill Swiper

document.addEventListener("DOMContentLoaded", function () {
    new Swiper(".skillSwiper", {
        loop: true,
        spaceBetween: 24,
        slidesPerView: 1,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
        },
        breakpoints: {
            768: {
                slidesPerView: 2
            },
            992: {
                slidesPerView: 3
            }
        }
    });
});
