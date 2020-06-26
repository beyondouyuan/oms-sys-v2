import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Table,
    Divider,
    Button
} from 'antd';
const { Column } = Table;

import BasicLayout from '../../layouts/BasicLayout';
import * as userActions from '../../redux/actions/user';
import { requesUserList } from '../../service/user';
import { createCrypto } from '../../utils/crypto';
class User extends Component {
    constructor(props) {
        super(props)
    }
    // componentDidMount() {
    //     this.fetchUserList()
    // }
    // componentDidMount周期在服务端不会执行
    // 在componentDidMount判断userList即是判断是否是ssr，如果走的是ssr，则asyncData被执行了
    // 也即userList
    // 若是走的非ssr渲染而是client端的ract路由渲染，则userList为空，需要在客户端获取数据
    // 什么时候是ssr？
    // 1、直接在浏览器地址栏输入url并按下回车键
    // 2、树洞刷新浏览器的当前页面
    // 什么时候走客户端渲染？
    // 1、利用react-router-dom的Link组件的跳转，走的是客户端渲染！！！！！，比如点击左侧菜单栏时候就是客户端渲染
    // 即“首次”访问走ssr，非首次访问走客服端渲染
    // 当然，即便是走客户端渲染，此时查看网页源码，可以发现html也是一个完整的dom结构，而不是满屏的js文件！！！
    componentDidMount() {
        const { fetchUserList, userList } = this.props;
        userList.length || fetchUserList();
    }
    static asyncData(store, match) {
        const { fetchUserList } = mapDispatchToProps(store.dispatch);
        return fetchUserList();
    }

    fetchUserList = async () => {
        const data = await requesUserList();
        console.log(data)
    }

    createUser = async () => {
        const { requestCreateUser } = this.props;
        try {
            const data = await requestCreateUser({
                account: 'tester2',
                password: createCrypto('test'),
                name: 'ouyuan',
                userType: '0'
            });
            console.log(data)
            console.log(this.props.result)
        } catch (error) {
            console.log(error)
        }
    }
    render() {
        return (
            <BasicLayout>
                <Table
                    dataSource={this.props.userList}
                    rowKey={record => record.id}
                    bordered
                    loading={this.props.loaded}
                >
                    <Column
                        title="姓名"
                        dataIndex="name"
                        key="name"
                        width="150px"
                        align="center"
                    />
                    <Column
                        title="昵称"
                        dataIndex="account"
                        key="account"
                        width="150px"
                        align="center"
                    />
                    <Column
                        title="类型"
                        dataIndex="type"
                        key="type"
                        width="150px"
                        align="center"
                    />
                    <Column
                        title="权限"
                        dataIndex="root"
                        key="root"
                        width="150px"
                        align="center"
                    />
                    <Column
                        title="状态"
                        dataIndex="off"
                        key="off"
                        width="150px"
                        align="center"
                    />
                    <Column
                        title="创建时间"
                        dataIndex="createTime"
                        key="createTime"
                        width="150px"
                        align="center"
                    />
                </Table>
                {/* {
                    this.props.loaded ? (
                        <div>loading...</div>
                    ) : (
                            <ul>
                                {
                                    this.props.userList?.map((item) => <li key={item.id}>
                                        <p>{item.name}</p>
                                        <p>{item.account}</p>
                                    </li>)
                                }
                            </ul>
                        )
                }
                <div onClick={this.createUser}>注册用户</div> */}
            </BasicLayout>

        )
    }
}

function mapStateToProps(state) {
    return { ...state.user };
}

function mapDispatchToProps(dispath) {
    return {
        fetchUserList: () => dispath(userActions.fetchUserList()),
        requestCreateUser: (request) => dispath(userActions.requestCreateUser(request)),
        reset: () => dispath(userActions.reset())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(User);