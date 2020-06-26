/*
 * @Author: beyondouyuan
 * @Date:   2018-05-15 12:06:27
 * @Last Modified by:   beyondouyuan
 * @Last Modified time: 2019-03-19 01:05:41
 */


const mysql = require('mysql')
const config = require('../config')

const {
    database
} = config

const {
    HOST,
    USER,
    PORT,
    PASSWORD,
    DATABASE
} = database

// create an mysql Pool
const pool = mysql.createPool({
    host:HOST,
    user:USER,
    password:PASSWORD,
    database:DATABASE,
});

// packaged sql handle
/**
 * [description]
 * @method
 * It is not time to explain! get in the car quickly!
 * @Author    beyondouyuan
 * @date      2019-02-28
 * @DateTime  2019-02-28T03:06:55+0800
 * @copyright All                  Rights Reserved      beyondouyuan
 * @version   1.0.0
 * @param     {[type]}                 sql    [description]
 * @param     {[type]}                 val    [description]
 * @return    {[type]}                        [description]
 */
const query = (sql, val) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                console.error('connection databases error', err)

                return resolve(err)
            } else {
                console.info('connection databases success')
                connection.query(sql, val, (err, rows) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(rows)
                    }
                    // release session
                    connection.release()
                })
            }
        })
    })
}

/********************* commen /*********************/

const findAllData = table => {
    const _sql = `select * from ${table};`
    return query(_sql)
}

const findDataByPage = (table, page, pageSize) => {
    const _sql = `select * from ${table} limit ${(page - 1) * pageSize},${pageSize};`
    return query(_sql)
}

/********************* user /*********************/

const createUser = value => {
    const _sql = `insert into users set userName=?,password=?,avatar=?,role=?,createTime=?;`
    return query(_sql, value)
}

const deleteUser = id => {
    const _sql = `delete from users where id="${id}";`
    return query(_sql)
}

const findUser = name => {
    const _sql = `select * from users where userName="${name}";`
    return query(_sql)
}

const findUserById = id => {
    const _sql = `select * from users where id="${id}";`
    return query(_sql)
}
const findAllUsers = () => {
    return findAllData('users')
}




/********************* search /*********************/

const search = value => {
    const _sql = `select * from movies where name like '%${value}%';`
    return query(_sql)
}

module.exports ={
    createUser,
    deleteUser,
    findUser,
    findUserById,
    findAllData,
    findDataByPage,
    search,
    findAllUsers,
    query
}
