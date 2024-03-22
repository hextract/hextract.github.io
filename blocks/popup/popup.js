let openButton = document.querySelector('.cover__image');
let popup = document.querySelector('.popup');
let popupImage = document.querySelector('.popup__image');
let closeButton = document.querySelector('.popup__close-button');

let leftButton = document.querySelector('.popup__side-button_side_left');
let rightButton = document.querySelector('.popup__side-button_side_right');



let imageList = [
    'media/popup/1.jpg',
    'media/popup/2.jpg',
    'media/popup/3.jpg'
]
let currentImage = 0;

function reloadButtons() {
    leftButton.classList.remove('popup__button_hide');
    rightButton.classList.remove('popup__button_hide');

    if (currentImage === 0) {
        leftButton.classList.add('popup__button_hide');
    }
    if (currentImage === imageList.length - 1) {
        rightButton.classList.add('popup__button_hide');
    }
}

function updateImage() {
    popupImage.src = imageList[currentImage];
}


openButton.addEventListener('click', function (event) {
    popup.classList.add('popup_opened')
    currentImage = 0;
    document.querySelector('body').classList.add('no_overflow');

    reloadButtons();
    updateImage();
})

closeButton.addEventListener('click', async function () {
    popup.classList.remove('popup_opened')
    document.querySelector('body').classList.remove('no_overflow')
})

leftButton.addEventListener('click', function () {
    currentImage = Math.max(0, currentImage - 1);
    reloadButtons();
    updateImage();
})

rightButton.addEventListener('click', function () {
    currentImage = Math.min(imageList.length - 1, currentImage + 1);
    reloadButtons();
    updateImage();
})

