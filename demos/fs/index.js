const fs = require('fs')
const path = require('path')

// function mkdirsSync(dirname) {
//   console.log(dirname, path.dirname(dirname), fs.existsSync(dirname))
//   if(fs.existsSync(dirname)) {
//     return true
//   } else {
//     (mkdirsSync(path.dirname(dirname)))
//     fs.mkdirSync(dirname)
//     return true
//   }
// }

// mkdirsSync('/demos/fs/test/common')

async function dirExists(dirPath) {
  let isExists
  fs.stat(dirPath,(err,stats) => {
    if(err) {
      isExists = false
    } else {
      isExists = stats
    }
  })
  console.log(isExists)
  if(isExists && isExists.isDirectory()) {
    return true
  } else if(isExists) {
    return false
  }
  let tempDir = path.dirname(dirPath)
  let status = await dirExists(tempDir)
  if(status) {
    fs.mkdirSync(dirPath)
  }
}
dirExists('/demos/fs/test')


// function getStat(path){
//   return new Promise((resolve, reject) => {
//       fs.stat(path, (err, stats) => {
//           if(err){
//               resolve(false);
//           }else{
//               resolve(stats);
//           }
//       })
//   })
// }

// /**
// * 创建路径
// * @param {string} dir 路径
// */
// function mkdir(dir){
//   return new Promise((resolve, reject) => {
//       fs.mkdir(dir, err => {
//           if(err){
//               resolve(false);
//           }else{
//               resolve(true);
//           }
//       })
//   })
// }

// /**
// * 路径是否存在，不存在则创建
// * @param {string} dir 路径
// */
// async function dirExists(dir){
//   let isExists = await getStat(dir);
//   //如果该路径且不是文件，返回true
//   if(isExists && isExists.isDirectory()){
//       return true;
//   }else if(isExists){     //如果该路径存在但是文件，返回false
//       return false;
//   }
//   //如果该路径不存在
//   let tempDir = path.parse(dir).dir;      //拿到上级路径
//   //递归判断，如果上级目录也不存在，则会代码会在此处继续循环执行，直到目录存在
//   let status = await dirExists(tempDir);
//   let mkdirStatus;
//   if(status){
//       mkdirStatus = await mkdir(dir);
//   }
//   return mkdirStatus;
