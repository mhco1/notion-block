export default (fn = {}, start = () => { }, query = '') => {
    let stack = {
        now: [],
        will: [],
    };
    let pointStop = [];
    let element = '';
    let store = '';
    let ignore = (char) => false;

    const _interface = {
        next(callback = () => { }) {
            stack.now.push(callback)
            return true
        },

        add(callback = () => { }) {
            stack.will.push(callback)
            return true
        },

        check(...arr) {
            pointStop = arr;
            return true;
        },

        ignore(limit) {
            if (typeof limit == 'number') {
                let store = 0;
                ignore = (char) => ((store < limit) && !isNaN(store++))
            }

            if (typeof limit == 'string') {
                let store = '';
                ignore = (char) => (limit !== store) && !!(store = char)
            }

            return true
        },
    }

    function loop() {
        const char = query[0];
        query = query.slice(1);
        store += char;

        if (typeof char === 'undefined') { return false }

        if (ignore(char)) { return true }
        ignore = (char) => false;

        if (!pointStop.includes(char)) {
            element += char;
            return true
        }

        while (!!stackLoop(char));
        element = '';
        return true
    }

    function stackLoop(char) {
        stack.now.shift()(char, () => element, _interface);
        if (stack.now.length > 0) {
            return true
        }

        stack.now.push(...stack.will);
        stack.will = [];
    };

    start('', element, _interface);
    while (!!loop());
}