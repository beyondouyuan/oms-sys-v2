/*
 * @Author: beyondouyuan
 * @Date:   2020-06-24 12:14:34
 * @Last Modified by:   beyondouyuan
 * @Last Modified time: 2020-06-24 12:14:34
 */

const path = require('path');

// 日志根目录
const baseLogPath = path.resolve(__dirname, '../logs');
// 错误日志目录
const errorPath = '/errors'
// 错误日志文件名
const errorFileName = 'error'
// 错误日志输出完整路径
const errorLogPath = `${baseLogPath}${errorPath}/${errorFileName}`
// 响应日志根目录
const responsePath = '/response'
// 响应日志文件名
const responseFileName = 'response'
// 响应日志完整路径
const responseLogPath = `${baseLogPath}${responsePath}/${responseFileName}`

module.exports = {
    baseLogPath: baseLogPath,
    appenders: {
        errorLogger: {
            type: 'dateFile', // 日志类型
            filename: errorLogPath, // 输出日志文件
            pattern: '-yyyy-MM-dd.log', // 文件格式
            path: errorPath, // 日志根路径
            alwaysIncludePattern: true
        },
        resLogger: {
            type: 'dateFile', // 日志类型
            filename: responseLogPath, // 输出日志文件
            pattern: '-yyyy-MM-dd.log', // 文件格式
            path: responsePath, // 日志根路径
            alwaysIncludePattern: true
        }
    },
    categories: {
        errorLogger: {
            appenders: ['errorLogger'],
            level: 'ERROR'
        },
        resLogger: {
            appenders: ['resLogger'],
            level: 'ALL'
        },
        default: {
            appenders: ['resLogger'],
            level: 'ALL'
        }
    }
}