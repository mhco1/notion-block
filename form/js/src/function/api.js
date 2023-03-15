export default ({ conf, hook, html }) => {
    function errApi(err) {
        html.info.append(html.infoItem(false, err));
        console.error(err);
    }

    return {
        ...conf.api,
        url: `http://${conf.api.host}:${conf.api.port}/${conf.api.path}/`,

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

            fetch(this.url + hook.get(), op)
                .then(res => {
                    html.info.append(html.infoItem(true));
                })
                .catch(err => {
                    errApi(err)
                })
        }

    }
}