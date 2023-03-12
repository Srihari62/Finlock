const express = require('express');
const mongoose = require('mongoose');
const Registeruser = require('./model');
const jwt = require('jsonwebtoken');
const middleware = require('./middleware');
const cors = require('cors');
const app = express();


mongoose.connect("mongodb+srv://test:test@cluster0.iuu8d.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",{
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex : true
}).then(
    () => console.log('DB Connection established')
)

app.use(express.json());

app.use(cors({origin:"*"}))

app.post('/register',async (req, res) =>{
    try{
        const {username,email,password} = req.body;
        let exist = await Registeruser.findOne({email})
        if(exist){
            return res.send('User Already Exist')
        }
        
        let newUser = new Registeruser({
            username,
            email,
            password,
        })
        await newUser.save();
        res.status(200).send('Registered Successfully')

    }
    catch(err){
        console.log(err)
        return res.status(500).send('Internel Server Error')
    }
})

app.post('/login',async (req, res) => {
    try{
        const {email,password} = req.body;
        let exist = await Registeruser.findOne({email});
        if(!exist) {
            return res.send('User Not Found');
        }
        if(exist.password !== password) {
            return res.send('Invalid credentials');
        }
        let payload = {
            user:{
                id : exist.id
            }
        }
        jwt.sign(payload,'jwtSecret',{expiresIn:3600000},
          (err,token) =>{
              if (err) throw err;
              return res.json({token})
          }  
            )

    }
    catch(err){
        console.log(err);
        return res.status(500).send('Server Error')
    }
})

app.get('/myprofile',middleware,async(req, res)=>{
    try{
        let exist = await Registeruser.findById(req.user.id);
        if(!exist){
            return res.status(400).send('User not found');
        }
        res.json(exist);
    }
    catch(err){
        console.log(err);
        return res.status(500).send('Server Error')
    }
})

app.get('/', (req,res) => {
    res.send("Hello World")
})

app.listen(5009,()=>{
    console.log('Server running...')
})