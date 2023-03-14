export default ({ conf, hook }) => ({
    ...conf.api,
    url: `http://${conf.api.host}:${conf.api.port}/${conf.api.path}/`,

    testConnection() {
        fetch(this.url + 'testConnectionGet')
            .catch(err => {
                throw new Error('api.send:' + err);
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
                console.log('ok');
                console.log(res);
            })
            .catch(err => {
                throw new Error('api.send:' + err);
            })
    }

})