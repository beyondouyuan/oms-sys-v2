import React from 'react'
import ReactDom from 'react-dom';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { matchRoutes } from 'react-router-config';
import createApp from './src/App';


export default ctx => {
    return new Promise((resolve, reject) => {
        const { router, store, routerConfig } = createApp();
        const routes = matchRoutes(routerConfig, ctx.url);
        if(routes.length <= 0) {
            return reject({code: 404, message: 'Not Found'});
        }
        // asyncData是实现服务端获取数据的关键
        const promises = routes
        .filter(item => item.route.component.asyncData)
        .map(item => item.route.component.asyncData(store, item.match));

        Promise.all(promises).then(() => {
            ctx.store = store;
            resolve(
                <Provider store={store}>
                    <StaticRouter location={ctx.url} context={ctx}>
                         { router }
                    </StaticRouter>
                </Provider>
            )
        }).catch(reject)
    })
}
