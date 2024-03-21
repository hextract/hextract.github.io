function checkIsRight(element) {
    return (element.parentElement.parentElement.classList.contains('skills__collapse-list_right'));
}

function setCustom(element, text) {
    if (checkIsRight(element)) {
        element.setAttribute('after-content', text)
    } else {
        element.setAttribute('before-content', text)
    }
}

function clearAccordions() {
    const acc = document.querySelectorAll(".skills__section");

    for (let i = 0; i < acc.length; ++i) {
        setCustom(acc[i], '//');
        acc[i].nextElementSibling.classList.remove('skills__description_active')
    }
}

function createAccordions() {
    const acc = document.querySelectorAll(".skills__section");

    clearAccordions();

    for (let i = 0; i < acc.length; ++i) {
        acc[i].addEventListener("click", function (event) {
            const to_open = event.target.nextElementSibling;

            if (!to_open.classList.contains('skills__description_active')) {
                clearAccordions();
                setCustom(acc[i], '')
            } else {
                setCustom(acc[i], '//')
            }
            to_open.classList.toggle('skills__description_active');
        });
    }
}


createAccordions();