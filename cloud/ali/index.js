const {crossFetch, ParameterTemplate} = require("WebFetch")
var getRawBody = require('raw-body');


let sendResponseTemplate = (resp, body) => {
    resp.setStatusCode(200);
    resp.setHeader("Content-Type", "application/json;charset=UTF-8");
    resp.send(JSON.stringify(body));
}

getRequestBody = async (req) => {
    return await new Promise((resolve, reject) => {
        getRawBody(req, function (err, body) {
            if (err) {
                reject(err)
            } else {
                resolve(JSON.parse(body.toString()))
            }
        });
    });
}

exports.handler = async (req, resp, context) => {
    try {
        let ret = await crossFetch(await getRequestBody(req));
        sendResponseTemplate(resp, ret);
    } catch (e) {
        console.error(e)
        sendResponseTemplate.send(resp, {
            status: 500,
            body: e,
            try: ParameterTemplate.request
        })
    }

    sendResponseTemplate(resp, body)
}
