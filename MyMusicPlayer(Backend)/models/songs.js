const mongoose = require("mongoose")
const { ObjectID } = require("bson");

const userSchema=mongoose.Schema(
    {

        song_name: {
            type: String
        },
        song_artist:{
            type:String
        },
        songUrl: {
            type: String
        },
        date:{
            type:Date
        },
        songRating:{
            type:String},
        category:{
            type:String
        }



    },  { timestamps: true }
    );
const Songs=mongoose.model('Songs',userSchema)
module.exports =Songs;