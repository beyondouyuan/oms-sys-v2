const Router = require('koa-router');
const router = new Router()
const UserController = require('../../../controller/user');

router.get('/', async (ctx, next) => {
    ctx.body = await UserController.get(ctx, next);
})

router.post('/', async (ctx, next) => {
    ctx.body = await UserController.created(ctx, next);
})

module.exports = router;