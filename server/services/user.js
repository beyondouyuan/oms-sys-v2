const BaseService = require('../core/base-service');
const query = require('../db');
const UUID = require('node-uuid');


class UserService extends BaseService {
    constructor(props) {

    }

    static async created(ctx, request) {
        try {
            request = typeof request == 'string' ? JSON.parse(request) : request
            const {
                account,
                password,
                userType,
                name
            } = request;
            const user = await query(`SELECT * FROM users WHERE account = ? AND off != 1`, [account])
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
            const uuid = UUID.v1();
            const createTime = new Date().getTime()
            await query(`INSERT INTO users (uuid, name, account, password, type, root, createTime) VALUES ( ?, ?, ?, ?, ?, ?, ? )`, [uuid, name, account, password, userType, userType, createTime])
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
        const res = await query(`SELECT * FROM users WHERE off != 1`);
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