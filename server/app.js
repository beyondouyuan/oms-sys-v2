const Koa = require('koa');
const Router = require('koa-router');
const koaBody = require('koa-body');
const path = require('path');
const render = require('./render');
const fs = require('fs');
const api = require('./api/v1');

const resolve = file => path.resolve(__dirname, file);
const app = new Koa();
const env = process.env.NODE_ENV
const config = require('../project.config')[env];
const isPro = process.env.NODE_ENV === 'production';

const logger = require('./logger');

const router = new Router();

let serverBundle;
let template;
let readyPromise;


if (isPro) {
    serverBundle = require('../dist/js/server-bundle').default;
    template = fs.readFileSync(resolve('../dist/server.tpl.html'), 'utf-8');
} else {
    readyPromise = require('../chore/dev-server')(app, resolve('../client/index.html'));
}

router.get('*', async (ctx, next) => {
    if (isPro) {
        await render(ctx, serverBundle, template);
    } else {
        const { bundle, clientHtml } = await readyPromise;
        await render(ctx, bundle, clientHtml);
    }
    next();
})
app.use(koaBody({
    multipart: true,
    // encoding:'gzip',
    formidable: {
        uploadDir: path.join(__dirname, './public/upload/'), // path
        maxFieldsSize: 10 * 1024 * 1024,
        multipart: true
    }
}))

logger.initPath()

app.use(require('koa-static')(path.join(__dirname, '../dist')));
// api
app.use(api.routes()).use(api.allowedMethods())
// ssr
app.use(router.routes()).use(router.allowedMethods())

app.listen(config.port, () => {
    console.log(`node服务已启动，服务地址为：locahost:${config.port}`);
});