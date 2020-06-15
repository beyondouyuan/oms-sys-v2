import React, { Component } from 'react';
import { connect } from 'react-redux';
import BasicLayout from '../../layouts/BasicLayout';
import * as userActions from '../../redux/actions/user';
import { requesUserList } from '../../service/user';

class User extends Component {
    constructor(props) {
        super(props)

    }
    componentDidMount() {
        
        this.fetchUserList()
    }
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
    }
    render() {
        return (
            <BasicLayout>
                {
                    this.props.loaded ? (
                        <div>loading...</div>
                    ) : (
                            <ul>
                                {
                                    this.props.userList?.map((item) => <li key={item.name}>
                                        <p>{item.name}</p>
                                        <p>{item.email}</p>
                                    </li>)
                                }
                            </ul>
                        )
                }

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
        reset: () => dispath(userActions.reset())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(User);