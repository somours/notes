## 初始化项目及常见提交命令
- git init 
- git add .
- git commit -m 'first commit'
- git remote add origin {远程地址}
- git remote -v (Verifies the new remote URL)
- git push origin master
- git push -f origin master //强制push

### 配置用户信息
- git config --global user.name "John Doe"
- git config --global user.email johndoe@example.com

### 生成私钥
- ssh-keygen -t rsa -C "johndoe@example.com"(密码一般我设置的空，直接enter)
- 查看是否已经有了ssh密钥：cd ~/.ssh
- 成功后的文件有id_rsa和id_rsa.pub