const BaseService = require('../core/base-service');
const sql = require('../db');

class UserService extends BaseService {
    constructor(props) {

    }

    static async created(ctx, request) {
        try {
            request = typeof request == 'string' ? JSON.parse(request) : request
            const {
                userName,
                password
            } = request;
            const user = await sql.findUser(userName);
            if(user.length > 0) {
                const result = {
                    responseCode: 102,
                    responseMessage: 'error',
                    data: {
                        result: '用户已存在'
                    }
                }
                return this.renderApiError(ctx, result);
            }
            const createTime = new Date().getTime()
            const role = '1'
            const avatar = 'https://beyondouyuan.github.io/img/ouyuan.jpg'
            await sql.createUser([userName, password, avatar, role, createTime])
            const data = {
                'result': '注册成功',
            };
            const result = {
                responseCode: 0,
                responseMessage: 'Successed',
                data
            }
            return this.renderApiData(ctx, result);
        } catch (error) {
            const result = {
                responseCode: 101,
                responseMessage: 'error',
                data: {
                    result: '注册失败'
                }
            }
            return this.renderApiError(ctx, result);
        }
    }

    static async get(ctx, request) {
        const res = await sql.findAllUsers();
        const data = {
            list: res
        };
        const result = {
            responseCode: 0,
            responseMessage: 'Successed',
            data
        }
        return this.renderApiData(ctx, result);

    }
}

module.exports = UserService;