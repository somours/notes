const Koa = require('koa')
const jsonp = require('koa-jsonp')
const app = new Koa()

//使用中间件
app.use(jsonp())

app.use( async(ctx) => {
  // if(ctx.url === '/getData.jsonp' && ctx.method === 'GET') {
    let returnData = {
      success: true,
      data: {
        text: 'this is a jsonp api',
        time: new Date().getTime()
      }
    }
    ctx.body = returnData
  // } 
  // else {
  //   ctx.body = 'hello jsonp middleware'
  // }
}) 



app.listen(3000, () => {
  console.log('jsonp is reading')
})