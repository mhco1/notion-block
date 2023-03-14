
export default ({ callback }) => ({
    normal(value, hook) {
        const button = document.createElement('button');
        button.setAttribute('type', 'button');
        button.classList.add('btn', 'btn-primary', 'me-2');
        button.innerText = value;
        button.onclick = callback.event.send;
        return button
    }
})