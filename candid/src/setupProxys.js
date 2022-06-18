const { createProxyMiddleware } = require('http-proxy-middleware');
const url = "https://candidcleaning.sunnyhome.site:3005";
module.exports = function (app) {

    app.use(
        '/one',
        createProxyMiddleware({
            target: url + '/one',
            changeOrigin: true,
        })
    );
    app.use(
        '/two',
        createProxyMiddleware({
            target: url + '/two',
            changeOrigin: true,
        })
    );
    app.use(
        '/three',
        createProxyMiddleware({
            target: url + '/three',
            changeOrigin: true,
        })
    );
    app.use(
        '/ong',
        createProxyMiddleware({
            target: url + '/ong',
            changeOrigin: true,
        })
    );
    app.use(
        '/nav',
        createProxyMiddleware({
            target: url + '/nav',
            changeOrigin: true,
        })
    );
    app.use(
        '/cont',
        createProxyMiddleware({
            target: url + '/cont',
            changeOrigin: true,
        })
    );
    app.use(
        '/abou',
        createProxyMiddleware({
            target: url + 'abou',
            changeOrigin: true,
        })
    );
    app.use(
        '/hom',
        createProxyMiddleware({
            target: url + '/hom',
            changeOrigin: true,
        })
    );
    app.use(
        '/g',
        createProxyMiddleware({
            target: url + '/g',
            changeOrigin: true,
        })
    );
};