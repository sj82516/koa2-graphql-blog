![](https://circleci.com/gh/sj82516/koa2-graphql-blog.svg?style=shield&circle-token=44a20b01a0dce27c045aefa9d01c3e27507bf8a9)
![](https://codecov.io/gh/sj82516/koa2-graphql-blog/branch/master/graph/badge.svg)

練習Koa2 + GraphQL，並整合CI/CD的流程

### 執行
資料庫使用mysql，可以用以下指令執行，或是改connection.js中的連結參數
> docker run --name mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=helloworld -d mysql

> npm install

> npm start

因為有用上async/await，必須用node v7.6以上執行，另外package使用ES Module
如果出現import錯誤等字樣，請在全域安裝babel-cli，並重新執行 npm start

### 測試
> npm test

### 檔案架構說明
- config: 主要放DB的設定文件
- coverage: 程式覆蓋率自動生成的文件，已放入.gitignore
- docker_file: 就是Dockerfile
- script: 在Dockerfile中的最後一步CMD預設啟動container的shell script
- app.js: Nodejs主程式
- deploy.sh: circleci在佈建階段所需的shell script
- *.js: Nodejs其他相關的程序