const express = require("express");
require("./db/mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const jwt=require('jsonwebtoken')
const  bcrypt=require('bcrypt')
const User=require("./models/users")
const JWT=require("./routers/JWT")
const corsOptions = {
    origin: "https://localhost:8080"
};
app.use(cors());
app.options('*', cors());

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin: *');
    res.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');


    next();
});

// parse requests of content-type - application/json
app.use(bodyParser.json());


// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}));

const songsRouter = require("./routers/songs")
const categoryRouter = require("./routers/Category")

app.use(songsRouter);
app.use(categoryRouter);

app.post('/register',async (req,res)=>{
    const user=req.body;
    const takenUsername=await User.findOne({username:user.username})
    const takenEmail=await User.findOne({email:user.email})

    if(takenUsername || takenEmail){
        res.json({message:"Username or email has already been token!"})

    }else{
        user.password=await bcrypt.hash(req.body.password,10)
        const dbUser=new User({
            username:user.username.toLowerCase(),
            email:user.email.toLowerCase(),
            password:user.password
        })
        dbUser.save()
        res.json({message:"Success"})
    }
})
app.post("/login",(req,res)=>{
    const userLoggingIn=req.body;
    User.findOne({username:userLoggingIn.username})
        .then(dbUser=>{
            if(!dbUser){
                return res.json({
                    message:"Invalid Username or Password"
                })

            }
            bcrypt.compare(userLoggingIn.password,dbUser.password)
                .then(isCorrect=>{
                    if(isCorrect){
                        const payload={
                            id:dbUser.id,
                            username:dbUser.username,
                        }
                        jwt.sign(
                            payload,
                            "122f332211fgvfe",
                            {expiresIn:86400},
                            (err,token)=> {
                                if (err) return res.json({message:"Eror"})
                                res.cookie('name',token)
                                return res.json({
                                    message:"Success",
                                    token:token
                                })
                            }
                        )
                    } else {
                        return res.json({
                            message:"Invalid Username or Password!"
                        })
                    }
                })
        })
})

var use=require('./routers/JWT')
app.get("/isUserAuth", JWT, (req, res) => {
    console.log(use.ime)
    return res.json({isLoggedIn: true, username:use.ime})
})
const port = process.env.PORT || 8080;





app.listen(port, () => {
    console.log("Server started on port " + port)
});