//let unquide = [];
//
//function createId(id) {
//    id = id.replaceAll(' ', '-').toLowerCase();
//    id = `input-g${res.list.length}-${id}`;
//    return id
//}

export default ({ check }) => (set, get, createId) => {
    let fn = {
        interage: (callback = () => { }, close, def = true) => (char, el, { check, add, next }) => {
            const target = {};
            let key = null;

            function fn_key(char) {
                char == '=' && !!(key = el()) && check(',', close) && add(fn_value);
                char == ',' && (target[el()] = def) && check('=', ',', close) && add(fn_key);
                char == close && (target[el()] = def) && next(callback(target));
            }

            function fn_value(char) {
                target[key] = el();
                check('=', ',', close);
                char == ',' && add(fn_key);
                char == close && next(callback(target));
            }

            check('=', ',', close) && add(fn_key);
        },

        hook(char, el, { check, add }) {
            set.hook(el());
            check('=', ',', '(', '[') && add(fn.label)
        },

        label(char, el, { check, add, next }) {
            const id = createId(el());
            const input = get.input();

            input.label = el();
            input.id = id;

            char == '[' && next(fn.openPrototype);
            char == '=' && check(',', '(') && add(fn.type);

            if (char == '(' || char == ',') {
                set.group({
                    ...input,
                    type: 'text'
                });

                char == '(' && next(fn.openParaments);
                char == ',' && check('=', ',', '(', '[') && add(fn.label);
            }
        },

        openPrototype(char, el, { check, next }) {
            check('=', ',', ']') && next(fn.interage(fn.closePrototype, ']'));
        },

        closePrototype: (target) => (char, el, { check, add, ignore }) => {
            const input = get.input();
            set.input({ ...target, ...input });
            check(',', '=', '(') && add(fn.isType);
        },

        isType(char, el, { check, add, next }) {
            const input = get.input();
            char == '=' && check(',', '(') && add(fn.type);
            if (char == ',' || char == '(') {
                set.group({
                    ...input,
                    type: 'text'
                });
                next(fn.isEndGroup);
            }
        },

        type(char, el, { next }) {
            const input = get.input();
            const type = check.input[el()];

            if (typeof type == 'undefined') throw new Error(`url:Type of "${el()}" not exist`)
            set.group({
                ...input,
                type: type
            });
            next(fn.isEndGroup);
        },

        isEndGroup(char, el, { check, add, next }) {
            char == ',' && check('=', ',', '(', '[') && add(fn.label);
            char == '(' && next(fn.openParaments)
        },

        openParaments(char, el, { check, next }) {
            check('=', ',', ')') && next(fn.interage(fn.closeParaments, ')'));
        },

        closeParaments: (target) => (char, el, { check, add }) => {
            const group = get.group();
            set.list({ ...target, ...group });
            check('=', ',', '(', '[') && add(fn.isButton);
        },

        isButton(char, el, { next }) {
            char == '(' && el() == '' ?
                next(fn.openButton) :
                next(fn.label)
        },

        openButton(char, el, { check, next }) {
            check('=', ',', ')') && next(fn.interage(fn.closeButton, ')', 'normal'));
        },

        closeButton: (target) => (char, el, { check, add }) => {
            set.button({ ...target })
        },
    }
    return fn
}