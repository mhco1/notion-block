
export default ({ manyKey }) => ({
    ...manyKey([(opInput) => {
        const label = document.createElement('label');
        const input = document.createElement('input');

        label.innerText = opInput.label;
        label.classList.add('form-label', 'p-2', 'm-0');

        input.classList.add('form-control')
        input.setAttribute('type', opInput.type);

        return {
            node: [label, input],
            get: () => input.value
        }
    }], 'text', 'number', 'email', 'password', 'date', 'datetime-local', 'time', 'week', 'month'),

    tag(opInput){
        const label = document.createElement('label');
        const input = document.createElement('input');

        label.innerText = opInput.label;
        label.classList.add('form-label', 'p-2', 'm-0');

        input.classList.add('form-control');
        input.setAttribute('type', 'text');
        input.setAttribute('data-role', 'tagsinput');

        return {
            node: [label, input],
            get: () => input.value
        }
    }
})