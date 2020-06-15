const Router = require('koa-router');
const router = new Router()
const OrderController = require('../../../controller/order');

router.get('/', async (ctx, next) => {
    ctx.body = await OrderController.get(ctx, next);
})

router.post('/', async (ctx, next) => {
    ctx.body = await OrderController.created(ctx, next);
})

module.exports = router;