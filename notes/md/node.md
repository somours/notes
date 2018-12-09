#node

##path
- path.dirname('path') //返回path的目录名
```javascript
  path.dirname('/foo/bar/baz/asdf/quux');
  // 返回: '/foo/bar/baz/asdf'
```

##fs
- fs.stat('path', (err, stats) => {}) 此处stats相当于fs.Stats类，用于检查文件是否存在，
- fs.Stats类， let stat = fs.Stats, stat.isFile(), stat.isDirectory()，
- fs.readdir(), fs.readdirSync() 读取文件下内容，相当于遍历此文件夹
- fs.readFile('....', (err, data) => {}) fs.readFileSync()`

##util

- util.inherits(constructor, superConstructor)是用来实现对象间原型继承的函数
- util.inspect(object,[showHidden],[depth],[colors])是一个将任意对象转换为字符串的方法，通常用于调试和错误输出。
- util.isArray(object)，传一个参数，如果是数组返回true，else就返回false
- util.isDate(object)，传一个参数，如果是日期返回true，else就返回false

##MongoDB的安装
- 下载4.0长期稳定版，会自带data和log两个文件，我们只需配置一个文件，mongo.conf，
  内容： dbpath=D:\Program Files\MongoDB\Server\4.0\data
        logpath=D:\Program Files\MongoDB\Server\4.0\log\mongod.log
        logappend=true 
  另外配置网络服务
  在相应cmd下，mongod.exe --config 'mongo.conf的路劲' --serveiceName MongoDB
  然后net start MongoDB , net stop MongoDB

