#node

##path

##fs
- fs.stat('path', (err, stats) => {}) 此处stats相当于fs.Stats类，用于检查文件是否存在，
- fs.Stats类， let stat = fs.Stats, stat.isFile(), stat.isDirectory()，
- fs.readdir(), fs.readdirSync() 读取文件下内容，相当于遍历此文件夹
- fs.readFile('....', (err, data) => {}) fs.readFileSync()`