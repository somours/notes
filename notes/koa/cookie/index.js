const Koa = require('koa')
app = new Koa()

app.use(async (ctx) => {
  if(ctx.url === '/index') {
    ctx.cookies.set(
      'somours',
      'hell, somours',
      {
        domain: 'localhost',
        path: '/index',
        maxAge: 10 * 60 * 1000,
        expires: 2000,
        httpOnly: false,
        overwrite: false
      }
    )
    ctx.body = 'cookie is OK'
  } else {
    ctx.body = 'hahha, cookie is fail'
  }
})

app.listen(3000, () => {
  console.log('[demo] cookie is starting at port 3000')
})