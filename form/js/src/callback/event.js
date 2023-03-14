const stack = [];

export default ({ api }) => {
    const event = {
        stack: {
            add(value) {
                stack.push(value);
            }
        },

        send() {
            const res = {}
            stack.map(el => {
                const str = el[0].slice(el[0].indexOf('-') + 1);
                const [group, name] = [str.slice(0, str.indexOf('-')), str.slice(str.indexOf('-') + 1)];

                typeof res[group] === 'undefined' && (res[group] = {});

                res[group][name] = el[1]();
            })
            api.send(res);
        },
    }
    return event
}