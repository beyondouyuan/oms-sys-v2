/**
 * ssr 渲染react页面中间件
 */

const { renderToString } = require('react-dom/server');

// 替换 client/index.html中的 <!--html--> 和 <!--store-->
function renderTemplate(template) {
    return props => template.replace(/<!--([\s\S]*?)-->/g, (_, key) => props[key.trim()]);
}

module.exports = async function(ctx, serverBundle, template) {
    try {
        const render = renderTemplate(template);
        const jsx = await serverBundle(ctx);
        
        const html = renderToString(jsx);
        /**
         * 1、renderTemplate方法将替换client/index.html中的 <!--html--> 和 <!--store-->
         * 
         * 2、`<script>window.__INITIAL__STORE__ = ${JSON.stringify(ctx.store.getState())}</script>`
         * 
         * 3、首先：asyncData中的代码必须是redux的方式获取数据的请求，如此，客户端的state才有数据
         *    然后：在服务端通过ctx.store.getState()获取得到state并注入到window.__INITIAL__STORE__
         *    再然后，客户端redux的初始state从indow.__INITIAL__STORE__中获取，=> 即const initalStore = window.__INITIAL__STORE__ || {};的这句代码
         * 
         * 如此，即可服务端和客户端数据互通并且一致，即所谓同构
         */
        const body = render({
            html,
            store: `<script>window.__INITIAL__STORE__ = ${JSON.stringify(ctx.store.getState())}</script>`,
        });
        ctx.body = body;
        ctx.type = 'text/html';
    }
    catch (err) {
        console.error(err.message);
        ctx.body = err.message;
        ctx.type = 'text/html';
    }
} 