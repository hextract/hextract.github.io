let notify = document.querySelector('.notify');
let closeButton = document.querySelector('.notify__close-button');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function openNotify() {
    const closed = localStorage.getItem('notify_closed');
    if (closed === null || Boolean(closed) === false) {
        await sleep(30 * 1000);
        notify.classList.add('notify_shown')
    }
}

closeButton.addEventListener('click', async function () {
    notify.classList.remove('notify_shown');
    localStorage.setItem('notify_closed', 'yes')
})

await openNotify();