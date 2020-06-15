const UserService = require('../services/user');

module.exports = {
    created: async (ctx, next) => {
        const result = await UserService.created();
        return result;
    },
    get: async (ctx, next) => {
        const { id } = ctx.query;
        const result = await UserService.get({id});
        return result;
    }
}