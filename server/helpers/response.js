
const logger = require('../logger');
const moment = require('moment');

/**
 * [render response data of API request]
 * @Author    beyondouyuan
 * @DateTime  2019-02-22
 * @copyright [copyright]
 * @license   [license]
 * @version   [version]
 * @param     {object}     error [description]
 * @return    {object}            [description]
 */
const renderApiData = (ctx, response) => {
    const {
        responseCode = 0,
        responseMessage = 'Successed',
        data = {}
    } = response;
    const resTime = moment().format('YYYY年MM月DD日 HH:mm:ss')
	// 记录响应日志
	logger.res(responseMessage, ctx, resTime)
    const responseData = {
        status: responseCode,
        code: responseCode,
        success: true,
        message: responseMessage,
        request_time: (new Date()).getTime(),
        data
    }
    return responseData
}

/**
 * [render error data of API of request]
 * @Author    beyondouyuan
 * @DateTime  2019-02-22
 * @copyright [copyright]
 * @license   [license]
 * @version   [version]
 * @param     {object}     error [description]
 * @return    {object}            [description]
 */
const renderApiError = (ctx, error) => {
    const {
        responseCode = 101,
        responseMessage = 'error',
        data = {}
    } = error;
    // 记录错误日志
	logger.error(responseMessage, ctx)
    const responseData = {
        status: responseCode,
        code: responseCode,
        success: false,
        message: responseMessage,
        request_time: (new Date()).getTime(),
        data
    }
    return responseData
}

module.exports = {
    renderApiData,
    renderApiError
}