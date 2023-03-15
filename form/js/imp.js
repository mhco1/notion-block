import conf from "../../conf.json" assert {type: 'json'}
import callbackButton from './src/callback/button.js'
import callbackEvent from './src/callback/event.js'
import callbackGroup from './src/callback/group.js'
import callbackInput from './src/callback/input.js'
import callbackQuery from './src/callback/query.js'
import checkInput from './src/check/input.js'
import functionGenerateQuery from './src/function/generate/query.js'
import functionApi from './src/function/api.js'
import functionParse from './src/function/parse.js'
import html from './src/html.js'

let hook;

const imp = {
    conf,
    parse: functionParse,

    hook:{
        set: (value)=>(hook = value),
        get: ()=>hook,
    },

//---

    removeSelf(element){
        const parent = element.parentElement;
        const newChildren = [...parent.children].filter(el => el !== parent);
        parent.innerHTML = '';
        parent.append(...newChildren);
    },

    manyKey([value], ...keys) {
        let res = {};
        keys.map(el => res[el] = value);
        return res
    },

//---

    check: {
        get input() { return checkInput(imp) },
    },

    callback: {
        get button() { return callbackButton(imp) },
        get event () { return callbackEvent (imp) },
        get group () { return callbackGroup (imp) },
        get input () { return callbackInput (imp) },
        get query () { return callbackQuery (imp) },

    },

    generate: {
        get query() { return functionGenerateQuery(imp) },
    },

    get api() { return functionApi(imp) },
    get html() { return html(imp) },
}

export default imp