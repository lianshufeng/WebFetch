const encoding = require('encoding');


/**
 * 参数模板
 * @type {{request: {headers: {"User-Agent": string}, method: string, url: string}, response: {headers: null, body: null, status: number}}}
 */
exports.ParameterTemplate = {
    request: {
        url: 'https://www.example.com/',
        method: 'GET',
        charset: null,
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36'
        },
        body: null
    },
    response: {
        "status": 200,
        "headers": null,
        "body": null
    }
}

/**
 * 合并对象
 */
exports.assignObject = function (sources) {
    let ret = {};
    for (let i in sources) {
        for (let name in sources[i]) {
            ret[name] = sources[i][name];
        }
    }
    return ret;
}

exports.crossFetch = async (reqBody) => {
    return request(require('cross-fetch'), reqBody)
}

exports.nativeFetch = async (reqBody) => {
    return request(fetch, reqBody)
}


/**
 * 请求
 * @param requestBody
 */
let request = async (reqFetch, reqBody) => {
    let requestBody = this.assignObject([this.ParameterTemplate.request, reqBody])
    //合并请求头
    if (reqBody['headers']) {
        requestBody.headers = this.assignObject([this.ParameterTemplate.request.headers, reqBody.headers]);
    }

    let response = await reqFetch(requestBody.url, requestBody);

    //取出编码
    var charset = "UTF-8";
    if (requestBody.charset) {
        charset = requestBody.charset;
    } else if (response.headers.get("content-type")) {
        let charsetItem = response.headers.get("content-type").split("charset=");
        if (charsetItem && charsetItem.length > 1) {
            charset = charsetItem[1]
        }
    }


    let headers = {}
    //响应头
    if (typeof (response.headers.forEach) == "function") {
        response.headers.forEach((value, name) => {
            headers[name] = value;
        })
    } else {
        for (let [name, value] of response.headers) {
            headers[name] = value
        }
    }


    let arrayBuffer = await response.arrayBuffer();
    let retBody = encoding.convert(Buffer.from(arrayBuffer), "utf-8", charset).toString('utf-8');
    let ret = this.assignObject([
        this.ParameterTemplate.response,
        {
            status: response.status,
            body: retBody,
            headers: headers
        }
    ]);
    return ret


}

