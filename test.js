const {crossFetch} = require('./index');


let main = async () => {
    let rep = await crossFetch({
        url: 'http://2021.ip138.com/'
    })
    console.log(rep);
}

main();
