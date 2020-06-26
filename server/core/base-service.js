const { renderApiData, renderApiError } = require('../helpers/response');

class BaseService {
    constructor(props) {

    }
    static renderApiData(ctx, response) {
        return renderApiData(ctx, response)
    }
    static renderApiError(ctx, error) {
        return renderApiError(ctx, error)
    }
}

module.exports = BaseService;