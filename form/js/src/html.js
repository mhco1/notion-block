export default ({ callback, removeSelf }) => {
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
            return Object.keys(opButton)
                .map(el => callback.button[opButton[el]](el))
        },

        info: (() => {
            const main = document.getElementById('main');
            const div = document.createElement('div');
            div.id = 'info'
            div.classList.add('position-absolute', 'bottom-0', 'end-0', 'd-flex', 'flex-column', 'gap-0', 'm-3')
            main.append(div);

            return div
        })(),

        infoItem(success, msg = '') {
            const div = document.createElement('div');
            div.classList.add('alert', 'info');
            if (success) {
                div.classList.add('alert-success');
                div.innerText = msg ? msg : 'Form was submit with success';
            } else {
                div.classList.add('alert-danger');
                div.innerText = msg ? msg : 'Error on submit form'
            }

            setTimeout(() => {
                div.classList.add('info-on');
            }, 1)

            setTimeout(() => {
                div.classList.remove('info-on');
                setTimeout(() => {
                    removeSelf(div);
                }, 500)
            }, 2500)

            return div
        }
    }

    return html
}