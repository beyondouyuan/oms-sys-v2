import React, { Component } from 'react';
import { connect } from 'react-redux';
import BasicLayout from '../../layouts/BasicLayout';

import * as detailActions from '../../redux/actions/detail';

class Detail extends Component {
    // 若页面有定义次方法，则该方法将会在服务端完成请求
    static asyncData(store, match) {
        // 此处依然使用mapDispatchToProps 是为了给服务端用哦
        // 否则只是在客服端使用 如下componentDidMount直接通过this.props即可取的
        const { fetchDetail } = mapDispatchToProps(store.dispatch);
        return fetchDetail(match.params.id);
    }

    // componentDidMount周期在服务端不会执行
    componentDidMount() {
        const { fetchDetail, match, data } = this.props;
        data || fetchDetail(match.params.id);
    }
    render() {
        return (this.props?.data) ? (
            <BasicLayout>
                <div>
                    <h1>{this.props?.data?.name}</h1>
                </div>
            </BasicLayout>
        ) : null
    }
}

function mapStateToProps(state) {
    return { ...state.detail };
}

function mapDispatchToProps(dispath) {
    return {
        fetchDetail: (id) => dispath(detailActions.fetchDetail(id)),
        reset: () => dispath(detailActions.reset())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Detail);