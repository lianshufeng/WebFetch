const {handler} = require('./index');

let callback = (p1, body) => {
    console.log(body);
}


handler({
    body: JSON.stringify({
        url: 'http://2021.ip138.com/'
    })
}, null, callback);