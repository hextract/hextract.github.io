

function daysTillGraduation() {
    const element = document.querySelector('.about__counter');
    const now = new Date();
    const graduation = new Date('06/30/2027')

    element.innerText = Math.floor((graduation - now) / (1000 * 60 * 60 * 24));
}

daysTillGraduation()