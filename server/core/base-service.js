const { renderApiData, renderApiError } = require('../helpers/response');

class BaseService {
    constructor(props) {

    }
    static renderApiData(response) {
        return renderApiData(response)
    }
    static renderApiError(error) {
        return renderApiError(error)
    }
}

module.exports = BaseService;