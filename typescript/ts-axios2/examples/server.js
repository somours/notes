/*
 * @Author: your name
 * @Date: 2021-12-03 14:06:48
 * @LastEditTime: 2021-12-27 15:21:33
 * @LastEditors: somours
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \ts-axios2\examples\server.js
 */
const express = require('express')
const bodyParser = require('body-parser')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackConfig = require('./webpack.config')

const app = express()
const compiler = webpack(webpackConfig)

app.use(webpackDevMiddleware(compiler, {
  publicPath: '/__build__/',
  stats: {
    colors: true,
    chunks: false
  }
}))

app.use(webpackHotMiddleware(compiler))

app.use(express.static(__dirname, {
  setHeaders (res) {
    res.cookie('XSRF-TOKEN-D', '1234abc')
  }
}))

app.use(express.static(__dirname))

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({extended: true}))

const router = express.Router()

registerSimleRouter()

registerBaseRouter()

registerErrorRouter()

registerExtendRouter()

registerInterceptorRouter()

registerConfigRouter()

registerCancelRouter()

registerMoreRouter()

function registerSimleRouter() {
  router.get('/simple/get', function(req, res) {
    res.json({
      msg: 'hello world'
    })
  })
}
function registerBaseRouter () {
  router.get('/base/get', function(req, res) {
    res.json(req.query)
  })
  router.post('/base/post', function(req, res) {
    res.json(req.body)
  })
  
  router.post('/base/buffer', function(req, res) {
    let msg = [];
    req.on('data', (chunk) => {
      if(chunk) {
        msg.push(chunk)
      }
    })
    req.on('end', () => {
      let buf = Buffer.concat(msg)
      res.json(buf.toJSON())
    })
  })
}
function registerErrorRouter() {
  router.get('/error/get', function(req, res) {
    if(Math.random() > 0.5) {
      res.json({
        msg: 'hello world'
      })
    } else {
      res.status(500)
      res.end()
    }
  })
   router.get('/error/timeout', function(req, res) {
     setTimeout(() => {
       res.json({
         msg: `hello world`
       })
     }, 3000);
   })
}

 function registerExtendRouter () {
  router.get('/extend/get', function(req, res) {
    res.json({
      msg: 'hello world'
    })
  })

  router.options('/extend/options', function(req, res) {
    res.end()
  })

  router.delete('/extend/delete', function(req, res) {
    res.end()
  })

  router.head('/extend/head', function(req, res) {
    res.end()
  })

  router.post('/extend/post', function(req, res) {
    res.json(req.body)
  })

  router.put('/extend/put', function(req, res) {
    res.json(req.body)
  })

  router.patch('/extend/patch', function(req, res) {
    res.json(req.body)
  })

  router.get('/extend/user', function(req, res) {
    res.json({
      code: 0,
      message: 'ok',
      result: {
        name: 'jack',
        age: 18
      }
    })
  })
}

 function registerInterceptorRouter () {
   router.get('/interceptor/get', function(req, res){
     res.end('hello')
   })
 }

 function registerConfigRouter () {
   router.post('/config/post', function(req,res) {
     res.json(req.body)
   })
 }

 function registerCancelRouter () {
   router.get('/cancel/get', function(req, res) {
     setTimeout(() => {
       res.json('hello')
     }, 1000)
   })
   router.post('/cancel/post', function(req, res) {
     setTimeout(() => {
       res.json(req.body)
     }, 1000)
   })
 }

  function registerMoreRouter () {
    router.get('/more/get', function(req, res) {
      res.json(req.cookies)
    })
   router.post('/more/post', function (req, res) {
     const auth = req.headers.authorization
     const [type, credentials] = auth.split(' ')
     console.log(atob(credentials))
     const [username, password] = atob(credentials).split(':')
     if(type === 'Basic' && username === 'Yee' && password === '123456') {
       res.json(req.body)
     } else {
       res.end('UnAuthorization')
     }
   })
   router.get('/more/304', function(req, res) {
     res.status(304)
     res.end()
   })
   router.post('/more/upload', function(req, res) {
     console.log(req.body, req.files)
     res.end('upload success')
   })
 }
app.use(router)


const port = process.env.PORT || 8000

module.exports = app.listen(port, () => {
  console.log(`Server listening on http://loaclhost:${port}, Ctrl + C to stop`)
})
