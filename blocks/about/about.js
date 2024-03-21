

function daysTillGraduation() {
    let element = document.querySelector('.about__counter');
    let now = new Date();
    let graduation = new Date('06/30/2027')


    let daysLeft = Math.floor((graduation - now) / (1000 * 60 * 60 * 24));
    element.innerText = daysLeft;
}

daysTillGraduation()