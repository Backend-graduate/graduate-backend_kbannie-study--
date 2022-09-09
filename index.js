const express = require('express');
const nunjucks=require('nunjucks');
const bodyParser = require('body-parser');
const MongoClient=require('mongodb').MongoClient;



const app = express();

let db=null;

app.set('view engine','html'); //app 인스턴스에 set method를 사용하여 key는 view engine, vlaue는 html을 추가
nunjucks.configure('views',{express:app});  //views : html파일을 둘 폴더명 / express 속성에 app을 연결

app.use(bodyParser.urlencoded({extended:true}));

MongoClient.connect(
    'mongodb+srv://kabeen:kabeen@cluster0.uftgx17.mongodb.net/?retryWrites=true&w=majority',
    (error, client) => {
    if (error) {
        return console.log(error);
    }
    db = client.db('backend_study_for_WISCOM');
    


    app.use(express.static(`${__dirname}/public`));

    app.get('/', (req, res) => {
        res.send('hello world');
    });

    app.get('/write', (req, res) => {
        res.render('write.html');
    });

    app.post('/create', (req, res) => {
        db.collection('post').insertOne(
        {
            todo: req.body.todo,
            dudDate: req.body.dueDate,
            num : req.body.num,
        },
        (error, result) => {
            if (error) return console.log(error);
            console.log('저장완료');
            res.redirect('http://localhost:3000/list');
        }
        );
    });


    app.get('/list', async (req, res) => {
        try {
            const postList = await db.collection('post').find().toArray();
            res.render('list.html', { postList });
        } catch (err) {
            console.log(err);
        }
    });


    app.post('/delete', async (req, res) => {
        try {
            const num = Number(req.body.num);
            await db.collection('post').deleteOne({num});
            res.redirect('http://localhost:3000/list');
        } catch (err) {
            console.log(err);
        }
    });


});














/*

const bodyParser = require('body-parser');

app.use(bodyParser.json());

const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://kabeen:kabeen@cluster0.uftgx17.mongodb.net/?retryWrites=true&w=majority", { 
    useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('Successfully connected to mongodb!'))
    .catch(e => console.error(e));
    const db=database.db('backend_study_for_WISCOM')
    const quotesCollection = db.collection('quotes')
    
    app.set('view engine', 'ejs');
    app.use(bodyParser.urlencoded({ extended: true,}));

    app.post('/quotes', (req, res) => {
        quotesCollection.insertOne(req.body)
        .then(result => {
            res.redirect('/') // '/' 로 리디렉션
        })
        .catch(error => console.error(error))
    })

        //app.use('/api/board',require('./routes/board'));  //게시판 라우터 연결
    app.get('/board',function(req,res){
        const cursor = db.collection('quotes').find().toArray()
        .then(results => {
                res.render('board.ejs', { quotes: results })
        })
        .catch(error => console.error(error))
    })






const { User } = require("./models/User");

app.post('/api/users', (req, res)=> {
	const user = new User(req.body); 
    user.save((err, userInfo)=>{ 
        if(err){return res.json({sucess: false, err});}
        return res.status(200).json({sucess: true,});
    });
});

app.get('/', function(req, res){
    res.send('hello NodeJs');
})*/

app.listen(3000, () => console.log('3000번 포트 대기'));