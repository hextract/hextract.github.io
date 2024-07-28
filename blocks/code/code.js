const codeForm = document.querySelector('.code__form')
const codeInput = document.querySelector('.code__input')
const codeButton = document.querySelector('.code__button')
const codeImage = document.querySelector('.code__image')

const codeAlert = document.querySelector('.code__alert')


codeForm.addEventListener('submit', async function (event) {
        event.preventDefault();
        let code = codeInput.value;
        codeButton.disabled = codeInput.disabled = true


        codeAlert.classList.remove('code__alert_type_error')
        codeAlert.innerText = "creating image..."
        codeAlert.classList.add('code__alert_type_wait')

        let response = await fetch("https://ths-gallery.ru/deckview/?code=" + code)

        if (response.ok) {
            let result = await response.blob()
            const urlCreator = window.URL || window.webkitURL;

            codeImage.src = urlCreator.createObjectURL(result);
            codeImage.classList.remove('code__image_not_shown')
            codeAlert.classList.remove('code__alert_type_wait')
        } else {
            codeAlert.classList.remove('code__alert_type_wait')
            codeAlert.innerText = "error occurred while creating"
            codeAlert.classList.add('code__alert_type_error')
        }
        codeButton.disabled = codeInput.disabled = false
    }
)
