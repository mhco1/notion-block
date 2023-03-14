export default ({ parse, callback }) => () => {
    const res = { hook: '', list: [], button: {} };
    const unquide = [];
    let group = { group: [] };
    let input = {};

    const get = {
        group: () => group,
        input: () => input,
    }
    const set = {
        input(el) {
            input = { ...el }
        },

        group(el) {
            group.group.push({ ...el });
            input = {};
        },

        list(el) {
            res.list.push({ ...el });
            group = { group: [] };
        },

        button(el) {
            res.button = el
        },

        hook(el){
            res.hook = el
        },
    }

    const fn = callback.query(set, get, createId);

    function createId(id) {
        id = id.replaceAll(' ', '-').toLowerCase();
        id = `input-g${res.list.length}-${id}`;

        if (unquide.includes(id)) throw new Error(
            `url: You try set duplicate id: "${id}"`
        );
        unquide.push(id);

        return id
    }

    function start(char, el, { check, next }){
        check('/') && next(fn.hook)
    }

    parse(fn, start, decodeURI(location.search.slice(1)));
    return res;
}