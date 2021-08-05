/*
 * @Author: Lvhz
 * @Date: 2021-06-25 09:00:44
 * @Description: Description
 */
const Koa = require('koa');
const Router = require('koa-router');
const app = new Koa();
const router = new Router();

const echartsRouter = require('./echartsRouter');
const mapRouter = require('./mapRouter');



router.get('/', ctx => {
  ctx.body = '这是主页';
});


app.use(router.routes());
app.use(echartsRouter.routes());
app.use(mapRouter.routes());

app.listen(3000);




