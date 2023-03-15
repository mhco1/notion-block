import imp from './imp.js'
const { html, generate, api, hook } = imp;

//window.onload = function () {
    try {
        const query = generate.query();
        hook.set(query.hook)

        console.log(location.search);
        console.log(query);

        const button = [html.button(query.button)];
        let main = query.list.map(el => html.group(el));
        main = main.length < 1 ? [html.nothing()] : main;

        api.testConnection();

        html.main.classList.add('d-flex','flex-column','gap-3');
        //document.body.append(html.info('success: test ok', true));
        
        //setTimeout(()=> html.info.append(html.infoItem(true)),1000)
        //setTimeout(()=> html.info.append(html.infoItem(false)),2000)
        //setTimeout(()=> html.info.append(html.infoItem(true)),3000)
        html.main.append(...main, ...button);
    } catch (err) {
        html.main.innerHTML = '';
        html.main.append(html.err(err));
        console.error(err);
    }
//}