let postRequestUrl = 'https://h4x4dtg.pythonanywhere.com/send';

const emailRegexp = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

let contactOpenButton = document.querySelector('.contact__button');
let contactPopup = document.querySelector('.contact-popup');
let contactCloseButton = document.querySelector('.contact-popup__close-button');
let contactForm = document.querySelector('.contact-form');
let contactAlertField = document.querySelector('.contact-popup__alert');

let contactThemeField = document.querySelector('.contact-popup__theme');
let contactContactField = document.querySelector('.contact-popup__contact');
let contactSendButton = document.querySelector('.contact-popup__save-button');

let themeValues = new Set;
let contactValues = new Set;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function sendData(theme, contact){
    let response = await fetch(postRequestUrl, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "theme": theme, 'contact': contact })
    })
    let json = await response.json();

    return json['success'];
}

contactOpenButton.addEventListener('click', function () {
    contactPopup.classList.add('contact-popup_opened')
    document.querySelector('body').classList.add('page_overflow_no');

    contactSendButton.disabled =  contactThemeField.disabled = contactContactField.disabled = false;
})

contactCloseButton.addEventListener('click', async function () {
    contactPopup.classList.remove('contact-popup_opened')

    contactAlertField.classList.remove('contact-popup__alert_type_error')
    contactAlertField.classList.remove('contact-popup__alert_type_warning')
    contactAlertField.classList.remove('contact-popup__alert_type_success')

    document.querySelector('body').classList.remove('page_overflow_no')
})

contactForm.addEventListener('submit', async function (event) {
    event.preventDefault();
    let theme = contactThemeField.value;
    let contact = contactContactField.value;

    if (contactValues.has(contact) && themeValues.has(theme)) {
        contactAlertField.innerText = 'you have already sent this request';
        contactAlertField.classList.add('contact-popup__alert_type_error');
        return;
    }

    if (10 >= theme.length) {
        contactAlertField.innerText = 'theme must be longer than 10 symbols';
        contactAlertField.classList.add('contact-popup__alert_type_error');
        return;
    }
    if (5 >= contact.length) {
        contactAlertField.innerText = 'contact must be longer than 5 symbols';
        contactAlertField.classList.add('contact-popup__alert_type_error');
        return;
    }

    if (contact.indexOf('@') !== -1) {
        if (!contact.match(emailRegexp)) {
            contactAlertField.innerText = 'email you provided is invalid';
            contactAlertField.classList.add('contact-popup__alert_type_error');
            return;
        }
    }

    if (contact[0] === '+' || contact[0] === '8') {
        if (!contact.slice(1).match(/^\d+$/)) {
            contactAlertField.innerText = 'dont use any non-digit symbols while writing phone';
            contactAlertField.classList.add('contact-popup__alert_type_error');
            return;
        }
        if (contact.length < 10) {
            contactAlertField.innerText = 'your phone is too small';
            contactAlertField.classList.add('contact-popup__alert_type_error');
            return;
        }
    }


    contactAlertField.classList.remove('contact-popup__alert_type_error');

    contactSendButton.disabled = contactThemeField.disabled = contactContactField.disabled = true;

    contactAlertField.innerText = 'sending...';
    contactAlertField.classList.add('contact-popup__alert_type_warning');

    // await sleep(1000); // use this if form is sent too fast

    const response = await sendData(theme, contact);
    contactAlertField.classList.remove('contact-popup__alert_type_warning');
    if (response) {
        contactAlertField.innerText = 'successfully send';
        contactAlertField.classList.add('contact-popup__alert_type_success');
        contactValues.add(contact);
        themeValues.add(theme);
    } else {
        contactAlertField.innerText = 'unexpected error while sending form';
        contactAlertField.classList.add('contact-popup__alert_type_error');
    }
    contactThemeField.value = contactContactField.value = '';

    contactSendButton.disabled =  contactThemeField.disabled = contactContactField.disabled = false;

})