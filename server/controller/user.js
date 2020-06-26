const UserService = require('../services/user');

module.exports = {
    created: async (ctx, next) => {
        const body = ctx.request.body;
        const result = await UserService.created(ctx, body);
        return result;
    },
    get: async (ctx, next) => {
        const { id } = ctx.query;
        const req = {
            id
        }
        const result = await UserService.get(ctx, req);
        return result;
    }
}