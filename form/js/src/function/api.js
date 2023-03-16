export default ({ conf, hook, html }) => {
    function errApi(err) {
        html.info.append(html.infoItem(false, err));
        console.error(err);
    }

    let {host, port, path} = conf.api;
    let test= false;
    hook = hook.get();

    if(hook[0] == '*'){
        path += '-test';
        hook = hook.slice(1);
        test = true;
    }

    return {
        host,port,path,hook, test,
        url: `http://${host}:${port}/${path}/`,

        testConnection() {
            fetch(this.url + 'testConnectionGet')
                .catch(err => {
                    errApi(err)
                })
        },

        send(data) {
            const op = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            };

            fetch(this.url + hook, op)
                .then(res => {
                    html.info.append(html.infoItem(true));
                })
                .catch(err => {
                    errApi(err)
                })
        }

    }
}