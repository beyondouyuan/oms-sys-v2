import axios from 'axios'

/**
 * [创建axios 实例]
 * @type {[type]}
 */
// 初始化请求配置


const service = axios.create({
    // 本地开发不转发80端口时需要注意；
    // 1、对于客户端请求数据时，baseURL可以是 '/',
    // 2、但是在ssr执行的asyncData中发起请求走的是node环境，如是写 '/'默认是80端口即默认访问的是127.0.0.1:80
    baseURL: 'http://localhost:9000',
    timeout: 3000,
    withCredentials: true,
})

/**
 * [统一拦截请求]
 * @param  {[type]} config [description]
 * @return {[type]}        [description]
 */
service.interceptors.request.use(config => {
    config.headers['Content-Type'] = 'application/json;charset=utf-8'
    return config
}, error => {
    console.log(error) // 打印测试
    Promise.reject(error)
})
/**
 * [统一拦截响应]
 * @param  {[type]} response [description]
 * @return {[type]}          [description]
 */
service.interceptors.response.use(
    response => {
        // 返回一个promise
        // return Promise.resolve(response)
        // 不返回promise，直接返回响应的数据
        const body = response ? response.data : {};
        const config = response ? response.config : undefined;
        // ajax错误
        if (!body) {
            throw new ApiServiceError(config, '没响应数据', 500);
        }
        // node服务端错误
        if (body.code !== 0) {
            throw new ApiServerError(config, `${body.msg}`, body.code);
        }
        return body;
    },
    // error => {
    //     console.log('error response ' + error) // 打印测试
    //     return Promise.reject(error)
    // }

)


class AxiosInterceptorError extends Error {
    constructor(config, message, code = 666) {
        super(message);
        this.name = 'AxiosInterceptorError';
        this.code = code;
        this.config = config;
    }
}

class ApiServiceError extends AxiosInterceptorError {
    constructor(config, message, code) {
        super(config, message, code);
        this.name = 'ApiServiceError';
        this.message = message;
    }
}

export class ApiServerError extends AxiosInterceptorError {
    constructor(config, message, code) {
        super(config, message, code);
        this.name = 'ApiServerError';
        this.code = code;
        this.message = message;
    }
}

/**
 * get请求
 * @param {string} url 请求路径
 * @param {object} params 请求参数
 * @param {object} options 配置参数
 */
const apiGet = (url, params, options) => {
    return service({
        url,
        method: 'GET',
        params,
        ...options,
    });
};

/**
 * post请求
 * @param {string} url 请求路径
 * @param {object} data 提交数据
 * @param {object} options 配置参数参数
 */
const apiPost = (url, data, options) => {
    return service({
        url,
        method: 'POST',
        data,
        ...options,
    });
};


/**
 * put请求
 * @param {string} url 请求路径
 * @param {object} data 提交数据
 * @param {object} options 配置参数参数
 */
const apiPut = (url, data, options) => {
    return service({
        url,
        method: 'apiPut',
        data,
        ...options,
    });
};

/**
 * delete请求
 * @param {string} url 请求路径
 * @param {object} data 提交数据
 * @param {object} options 配置参数参数
 */
const apiDelete = (url, data, options) => {
    return service({
        url,
        method: 'DELETE',
        data,
        ...options,
    });
};

export { apiGet, apiPost, apiPut, apiDelete };

export default service;