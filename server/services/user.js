const BaseService = require('../core/base-service');

class UserService extends BaseService {
    constructor(props) {
        
    }
    
    static async created () {
        const data = {
            'name': 'irving',
            'age': 18
        };
        const result = {
            responseCode: 0,
            responseMessage: 'Successed',
            data
        }
        return this.renderApiData(result);
    }

    static async get(request) {
        const data = {
            list: [{
                name: 'ouyuan',
                email: 'ouyuan@163.com'
            }, {
                name: 'irving',
                email: 'irving@163.com'
            }, {
                name: 'oy',
                email: 'oy@163.com'
            }]
        };
        const result = {
            responseCode: 0,
            responseMessage: 'Successed',
            data
        }
        return this.renderApiData(result);
    }
}

module.exports = UserService;