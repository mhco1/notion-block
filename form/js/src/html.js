export default ({ callback }) => {
    const html = {
        main: document.getElementById('main'),
        err(err) {
            const div = document.createElement('div');

            div.classList.add('alert', 'alert-danger');
            div.setAttribute('rule', 'alert');
            div.innerText = err;

            return div
        },

        nothing() {
            const div = document.createElement('div');

            div.classList.add('alert', 'alert-primary');
            div.setAttribute('rule', 'alert');
            div.innerText = 'nothing...';

            return div
        },

        group(opGroup = {}) {
            const div = document.createElement('div');
            let arr = Object.keys(opGroup)
                .filter(el => el !== 'group' && el !== '')
                .map(el => {
                    typeof callback.group[el].group !== 'undefined' &&
                        callback.group[el].group(div, opGroup[el]);
                })
            div.append(
                ...opGroup.group.map(el => html.input(el, opGroup))
            )
            return div
        },

        input(opInput = {}, opGroup = {}) {
            const div = document.createElement('div');
            const { node, get } = callback.input[opInput.type](opInput);
            callback.event.stack.add([opInput.id, get]);
            div.id = opInput.id;
            div.append(...node);
            Object.keys(opGroup)
                .filter(el => el !== 'group' && el !== '')
                .map(el => {
                    typeof callback.group[el].input !== 'undefined' &&
                        callback.group[el].input(div, opGroup[el])
                })
            return div
        },

        button(opButton) {
            const div = document.createElement('div');
            //div.classList.add('mt-2');
            div.append(
                ...Object.keys(opButton)
                    .map(el => callback.button[opButton[el]](el))
            )
            return div
        },

        test: () => callback,
    }

    return html
}