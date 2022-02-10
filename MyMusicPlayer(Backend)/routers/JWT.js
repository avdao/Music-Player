const jwt=require('jsonwebtoken');
const {provjera} = require("./JWT");
function verifyJWT(req,res,next) {
    const token = req.headers['x-access-token'];
console.log(token)
    if (token) {


        jwt.verify(token, "122f332211fgvfe", (err, decoded) => {

            req.user = {};


            module.exports.ime=decoded.username;

            next()
        })
    } else {
        res.json({message: "Incorrect Token Given", isLoggedIn: false})

    }
}
module.exports=verifyJWT;