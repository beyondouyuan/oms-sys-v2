import React, { Component } from 'react';
import { connect } from 'react-redux';
import BasicLayout from '../../layouts/BasicLayout';
import * as homeActions from '../../redux/actions/home';
import Loading from '@components/Loading'
import { requesUserList } from '../../service/user';

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            
        }
    }
    componentDidMount() {
        // this.fetchUserList()
    }

    // 因此为了能是服务器请求的数据同步到客户端，必须使用redxu，并保证他们一致，
    // 
    /**
     * 若页面有定义asyncData方法，则asyncDataz中的代码将会在服务端完成请求并且输出在window.__INITIAL__STORE__ 上
     * rudex的初始数据由服务端通过window.__INITIAL__STORE__注入（server/render/index.js的renderTemplate方法完成注入）
     * 客户端 client/client.js 完成同步得到服务端的初始化数据 const initalStore = window.__INITIAL__STORE__ || {}
     * 
     * 
     * asyncData 这个方法必须跟 client/server.js中的一致
     */
    static asyncData(store) {
        // 此处依然使用mapDispatchToProps 是为了给服务端用哦
        const { fetchHome, fetchColumn } = mapDispatchToProps(store.dispatch);
        // 这里必须return Promise 并且这里发起请求走的是node环境，api路径必须写绝对路径。
        return Promise.all([
            fetchHome(),
            fetchColumn(),
        ])
    }
    // fetchUserList = async () => {
    //     const data = await requesUserList();
    //     console.log('client fecth')
    //     console.log(data)
    // }
    render() {
        return (
            <BasicLayout>
                <div>
                    <ul>
                        {
                            this.props?.news?.map((item) => {
                            return <li key={item.title}>{item.title}</li>
                            })
                        }
                    </ul>
                    <ul>
                        {
                            this.props?.column?.map((item) => {
                            return <li key={item.title}>{item.title}</li>
                            })
                        }
                    </ul>
                    <Loading />
                </div>
            </BasicLayout>
        )
    }
}

function mapStateToProps(state) {
    return { ...state.home };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchHome: (id) => dispatch(homeActions.fetchHome(id)),
        fetchColumn: (page) => dispatch(homeActions.fetchColumn(page)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);