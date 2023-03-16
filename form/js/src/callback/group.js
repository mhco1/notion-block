
export default ({ manyKey }) => ({
    ...manyKey([{
        group(div, value) {
            if (value === true) {
                div.classList.add('d-flex', 'flex-row','align-items-end','gap-3');
            }
        },
        //input(div, value) {
        //    if (value === true) {
        //        div.classList.add('me-3','mb-3');
        //    }
        //},
    }], 'horizontal', 'h'),

    ...manyKey([{
        group(div, value) {
            if (value === true) {
                div.classList.add('d-flex', 'flex-column','justify-content-start','gap-3');
            }
        },
        //input(div, value) {
        //    if (value === true) {
        //        div.classList.add('mb-3');
        //    }
        //},
    }], 'vertical', 'v'),
})