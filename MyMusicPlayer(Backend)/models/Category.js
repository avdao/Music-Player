const mongoose = require("mongoose")
const { ObjectID } = require("bson");
const Category = new mongoose.model("Category",{
    category_name:{ type: String},
    songs_in_category:[{
        songs_id:ObjectID
        
    }]
})

module.exports =Category;