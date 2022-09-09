# Backend study for WISCOM 

## 0. Concept

+ request : 클라이언트는 서버에 필요한 정보를 요청

+ response : 서버는 요청을 해석하여 필요한 정보로 응답
+  웹서비스 : WWW (World Wide Web)
+ 웹서비스 개발 : Front-End, Back-End, Full stack

    사용자가 서버에 웹 서비스를 요청 -> 서버는 해당 웹 페이지 또는 index.html을 전달 -> 사용자는 웹 페이지를 읽어서 웹 브라우저에 보여줌(렌더링)
    + *Back-End* 
        + 웹 서버 : 클라이언트와 서버의 통신을 위해서 프로토콜이 필요 -> HTTP 사용
        + 애플리케이션 서버 : 클라이언트가 읽을 수 있는 내용을 웹 서버에 전달 
        + 웹 서버 프레임워크 : 생성, 조회, 수정, 삭제 => CRUD
---

## 1. Preparation
### (1) Node.js 초기 세팅
- node 설치 확인 : node -v
- express 설치 

        npm install express 
    
    -> package-lock.json과 package.json 파일 추가됨
- index.js에 작성
    ```js
    const express = require('express');
    const app = express();

    app.get('/', function(req, res){
        res.send('hello NodeJs');//사이트에 나타낼 문구
    }) 
    app.listen(3000, () => console.log('3000번 포트 대기')); 
    ```
- terminal에 node index 작성 -> localhost:3000에 접속 

### (2) MongoDB 연결
- MongoDB cluster 생성
- MongoDB 연결을 위한 Mongoose 설치

        npm install mongoose --save

- index.js에 작성
    ```js
    const mongoose = require('mongoose');
    mongoose.connect("몽고 DB 주소", { 
        useNewUrlParser: true, useUnifiedTopology: true})
        .then(() => console.log('Successfully connected to mongodb!'))
        .catch(e => console.error(e));
    ```

### (3) body-parser
- 클라이언트에서 정보 입력 후 서버에 전달, 서버는 클라이언트에서 보낸 정보를 받음
- 설치

        npm install body-parser

- 클라이언에서 데이터를 입력하면 서버에서 받는 방법
    
    - index.js : body-pareser 이용
    ```js
    const bodyParser = require('body-parser');
    app.use(bodyParser.urlencoded({ extended: true,})); //1. 인코딩된 url을 가져오는 방법
    app.use(bodyParser.json());  //2. json 타입으로 된 것을 가져오는 방법
    ```
    - models/User.js : schema 생성
    ```js
    const mongoose=require('mongoose'); //mongoose를 이용해 Schema 도입

    const userSchema=mongoose.Schema({}) //스키마 생성

    const User=mongoose.model('User',userSchema); //데베 서버로 넣기 위해서는 schema를 model 메소드를 통해 객체로 만들어주어야 함 -> User(첫번째)라는 객체를 생성한 후 그 객체는 스키마 User를 넣어주기

    module.exports={User}; //User 객체를 다른 파일에서 사용할 수 있게 함 => const { User } = require("./models/User");
    ```

    - index.js : 클라이언트에게 받은 데이터를 DB에 넣기
    ```js
    const { User } = require("./models/User");  //인스턴스 생성
    app.post('/api/users', (req, res)=> {
        const user = new User(req.body); 
        user.save((err, userInfo)=>{ 
            if(err){return res.json({sucess: false, err});}
            return res.status(200).json({sucess: true,});
        });
    });
    ```

    - postman 실행
        - node index로 서버 실행
        - post request이니 POST로 바꿔주기
        - url 주소에 맞게 'http://localhost:3000/api/users' 작성 후 Send
        - Body, raw, JSON 선택 후 스키마에 맞게 작성
        - "success":true 뜨면 성공!!
        - mongodb collection을 확인하면 해당 데이터가 저장되어 있음



