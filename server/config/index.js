/*
* @Author: beyondouyuan
* @Date:   2019-02-20 13:31:31
* @Last Modified by:   beyondouyuan
* @Last Modified time: 2019-02-28 03:06:30
* @E-mail: beyondouyuan@gmail.com
* @Github: https://beyondouyuan.github.io/
* @description: 写代码就像写诗一样
* @version: 1.0.0
*/

/**
 * [exports databases config]
 * @type {Object}
 */
module.exports = {
  port: 3000,
  database: {
    DATABASE: 'koassr',
    USER: 'root',
    PASSWORD: 'oujunyuan',
    PORT: '3306',
    HOST: 'localhost',
    multipleStatements: true
  }
}
