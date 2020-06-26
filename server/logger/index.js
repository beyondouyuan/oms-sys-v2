const log4js = require('log4js');
const fs = require('fs');
const logConfig = require('../config/log');


log4js.configure(logConfig)

const errorLogger = log4js.getLogger('errorLogger')
const resLogger = log4js.getLogger('resLogger')

module.exports = {
    initPath: async () => {
        if (logConfig.baseLogPath) {
            confirmPath(logConfig.baseLogPath)
            // 根部不同logType常见不同文件目录
            for (let key in logConfig.appenders) {
                if (logConfig.appenders.hasOwnProperty(key)) {
                    confirmPath(logConfig.baseLogPath + logConfig.appenders[key].path)
                }
            }
        }
    },
    error(error, req, resTime) {
        if (error) {
            if (typeof error == 'string') {
                errorLogger.error('/********** node server error **********/', error)
            } else {
                errorLogger.error(formatError(req, error, 'node', resTime))
            }
        }
    },
    res(msg, req, resTime) {
        // console.log(resTime)
        // console.dir(req)
        if (msg) {
            resLogger.info(formatResLog(req, resTime))
        }
    },
    info(key, info = '') {
        if (key) {
            resLogger.info(key, info)
        }
    }
}



const confirmPath = path => {
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path)
    }
}
/**
 * 格式化响应日志
 * @param  {[type]} req     [description]
 * @param  {[type]} resTime [description]
 * @return {[type]}         [description]
 */
const formatResLog = (req, resTime) => {
    let logText = new String()
    // 响应日志开始
    logText += "\n" + "/********** response log start **********/" + "\n"
    // 添加请求日志
    logText += formatReqLog(req, resTime) + "\n"
    // 响应状态码
    logText += "response statusCode " + req.statusCode + "\n"
    // 响应时间
    logText += "response time " + resTime + "\n"
    // 响应内容
    logText += "response body: " + "\n" + JSON.stringify(req.body) + "\n"
    // 响应结束
    logText += "\n" + "/********** response log end **********/" + "\n"

    return logText
}
/**
 * 格式化错误日志
 * @param  {Object} req     [description]
 * @param  {Object} error   [description]
 * @param  {String} type    [description]
 * @param  {Number} resTime [description]
 * @return {[type]}         [description]
 */
const formatError = (req = {}, error = {}, type = 'node', resTime = 0) => {
    let logText = new String()
    const err = type === 'h5' ? req.query : error
    // 错误日志开始
    logText += "\n" + "/********** " + type + "error log start **********/" + "\n"
    // 添加请求日志
    if (req.url) {
        logText += formatReqLog(req)
    }
    if (type === 'h5') {
        // 用户信息
        if (err.userInfo) {
            logText += 'request user info: ' + err.userInfo + "\n"
        }
        // 客户端通道信息
        if (err.pageParams) {
            logText += 'request client channel info: ' + err.pageParams + "\n"
        }
        // 客户端设备信息
        if (err.clientInfo) {
            logText += 'request mobile info: ' + err.clientInfo + "\n"
        }
        // 报错位置
        logText += "err at line: " + err.line + ", col: " + err.col + "\n"
        // 错误信息
        logText += "err message " + err.msg + "\n"
        // 错误页面
        logText += "err url: " + err.url + "\n"
    } else { // node server error
        // 错误名称
        logText += "err name: " + error.name + "\n"
        // 错误信息
        logText += "err message: " + error.message + "\n"
        // 错误详情
        logText += "err stack: " + error.stack + "\n"
    }
    // 错误信结束
    logText += "\n" + "/********** " + type + "error log end **********/" + "\n"

    return logText
}

const formatReqLog = (req, resTime) => {
    let logText = new String()
    const { method, url, baseUrl, originalUrl, ip, params, query } = req
    // api根路径
    logText += "request api base url: " + baseUrl + "\n"
    // api路径
    logText += "request original url: " + originalUrl + "\n"
    // 访问路径
    logText += "request url: " + url + "\n"
    // 访问方法
    logText += "request method: " + method + "\n"
    // 请求参数
    logText += "request params: " + "\n" + JSON.stringify(params) + "\n"
    // 查询参数
    logText += "request query: " + "\n" + JSON.stringify(query) + "\n"
    // 客户端IP
    logText += "request client IP: " + ip + "\n"
    // 请求时间
    logText += "request time: " + resTime + "\n"
    return logText
}
