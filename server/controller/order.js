const OrderService = require('../services/user');

module.exports = {
    created: async (ctx, next) => {
        const body = ctx.request.body;
        const result = await OrderService.created(body);
        return result;   
    },
    get: async (ctx, next) => {
        const { id } = ctx.query;
        const result = await OrderService.get({id});
        return result;  
    }
}