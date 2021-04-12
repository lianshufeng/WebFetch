const {crossFetch, ParameterTemplate} = require("WebFetch")

/**
 * 构建返回的模板
 * @param code
 * @param body
 * @returns {{isBase64Encoded: boolean, headers: {"Content-Type": string}, body: string, statusCode}}
 */
let buildResponseTemplate = (body) => {
    return {
        "isBase64Encoded": false,
        "statusCode": 200,
        "headers": {"Content-Type": "application/json;charset=UTF-8"},
        "body": JSON.stringify(body)
    }
}

exports.main_handler = async (event, context) => {
    try {
        let reqBody = JSON.parse(event.body);
        return buildResponseTemplate(await crossFetch(reqBody))
    } catch (e) {
        console.error(e)
        return buildResponseTemplate({
            status: 500,
            body: e,
            try: ParameterTemplate.request
        })
    }
};
