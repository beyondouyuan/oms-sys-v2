const Router = require('koa-router');
const router = new Router()
const UserController = require('../../../controller/user');

router.get('/', async (ctx, next) => {
    const result = await UserController.get(ctx, next);
    ctx.body = result;
})

router.post('/', async (ctx, next) => {
    const result = await UserController.created(ctx, next);
    ctx.body = result;
})

module.exports = router;