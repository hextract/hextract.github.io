addEventListener("scroll", () => {
    const yPos = document.documentElement.scrollTop || document.body.scrollTop;
    if (yPos + 100 >= window.innerHeight) {
        document.querySelector('.header').classList.add('header_active')
    } else {
        document.querySelector('.header').classList.remove('header_active')
    }
});