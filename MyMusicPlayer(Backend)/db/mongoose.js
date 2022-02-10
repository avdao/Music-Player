

const mongoose = require("mongoose");


mongoose.connect("mongodb+srv://<username>:<password>@cluster0.tjxba.mongodb.net/<collection_name>?retryWrites=true&w=majority",
    { useUnifiedTopology: true, useNewUrlParser: true})
