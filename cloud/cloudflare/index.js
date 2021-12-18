// import moment from 'moment'
const {nativeFetch, ParameterTemplate} = require("WebFetch")


/**
 * 构建响应对象
 * @param ret
 * @returns {Promise<Response>}
 */
buildResponse = async (ret) => {
    return new Response(JSON.stringify(ret), {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'X-Requested-With,Content-Type',
            'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS',
        },
    })
}

/**
 * Respond with hello worker text
 * @param {Request} request
 */
handleRequest = async (req) => {
    try {
        const {value: bodyIntArray} = await req.body.getReader().read()
        const bodyJSON = new TextDecoder().decode(bodyIntArray)
        let reqBody = JSON.parse(bodyJSON);
        let ret = await nativeFetch(reqBody);
        return buildResponse(ret);
    } catch (e) {
        console.error(e);
        return buildResponse({
            status: 500,
            body: e,
            try: ParameterTemplate.request
        })
    }
}


addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request));
})

