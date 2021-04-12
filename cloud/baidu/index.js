const {crossFetch, ParameterTemplate} = require("WebFetch")

/**
 * 构建返回的模板
 * @param code
 * @param body
 * @returns {{isBase64Encoded: boolean, headers: {"Content-Type": string}, body: string, statusCode}}
 */
let sendResponseTemplate = (callback, body) => {
    callback(null, {
        "isBase64Encoded": false,
        "statusCode": 200,
        "headers": {"Content-Type": "application/json;charset=UTF-8"},
        "body": JSON.stringify(body)
    })
}


exports.handler = async (event, context, callback) => {
    try {
        let ret = await crossFetch(JSON.parse(event.body));
        sendResponseTemplate(callback, ret);
    } catch (e) {
        console.error(e)
        sendResponseTemplate(callback, {
            status: 500,
            body: e,
            try: ParameterTemplate.request
        })
    }
};

