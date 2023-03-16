import imp from './imp.js'
const { html, generate, api, hook } = imp;

//window.onload = function () {
    try {
        const query = generate.query();
        hook.set(query.hook)

        console.log(location.search);
        console.log(query);

        const button = html.button(query.button);
        let main = query.list.map(el => html.group(el));
        main = main.length < 1 ? [html.nothing()] : main;
        main.slice(-1)[0].append(...button)
        
        api.testConnection();

        html.main.classList.add('d-flex','flex-column','gap-3');
        html.main.append(...main);
    } catch (err) {
        html.main.innerHTML = '';
        html.main.append(html.err(err));
        console.error(err);
    }
//}