const {main_handler} = require('./index');

let ret = main_handler({
    body: JSON.stringify({
        url: 'http://2021.ip138.com/'
    })
}, null);
console.log(ret);