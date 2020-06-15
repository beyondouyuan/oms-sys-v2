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
const renderApiData = response => {
    const {
        responseCode = 0,
        responseMessage = 'Successed',
        data = {}
    } = response
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
const renderApiError = error => {
    const {
        responseCode = 101,
        responseMessage = 'error',
        data = {}
    } = error
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