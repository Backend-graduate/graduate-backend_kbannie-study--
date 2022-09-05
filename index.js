const express = require('express');
const app = express();

const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://kabeen:kabeen@cluster0.uftgx17.mongodb.net/?retryWrites=true&w=majority", { 
    useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('Successfully connected to mongodb!'))
    .catch(e => console.error(e));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true,}));
app.use(bodyParser.json());

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
})


app.listen(3000, () => console.log('3000번 포트 대기'));