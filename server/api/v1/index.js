
/**
 * api 路由表
 */
const Router = require('koa-router');
const User = require('./user');
const Order = require('./order');

// api prefix
const router = new Router({
    prefix: '/v1/api'
})

router.use('/user', User.routes())
router.use('/order', Order.routes())

module.exports = router;