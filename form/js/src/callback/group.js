
export default ({ manyKey }) => ({
    ...manyKey([{
        group(div, value) {
            if (value === true) {
                div.classList.add('d-flex', 'flex-row');
            }
        },
        input(div, value) {
            if (value === true) {
                div.classList.add('d-flex', 'flex-row', 'align-items-center', 'me-3','mb-3');
            }
        },
    }], 'horizontal', 'h'),

    ...manyKey([{
        group(div, value) {
            if (value === true) {
                div.classList.add('d-flex', 'flex-column');
            }
        },
        input(div, value) {
            if (value === true) {
                div.classList.add('mb-3');
            }
        },
    }], 'vertical', 'v'),
})