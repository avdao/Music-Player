const express = require('express')
const Category = require('../models/Category')
const Songs = require('../models/songs')
const router = new express.Router()
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart(undefined);
const JWT=require('../routers/JWT')
const use = require("../routers/JWT");

router.post('/category',multipartMiddleware, async (req, res) => {
    if(use.ime!==undefined){
    const songs = new Category(req.body)

    try {
        songs.save()
        console.log(songs)
        res.status(200).send(songs)
    } catch (eror) {
        res.status(400).send(eror)
    }}else{
        res.send("Nemate pravo")
    }


})
router.get('/category', async (req, res) => {
    try {
        const songs = await Category.find({})
        res.status(200).send(songs)
    } catch (eror) {
        res.status(400).send(eror)
    }


})
router.get('/category/songs/:id', async (req, res) => {

    const _id = req.params.id
    try {
        const category = await Category.findById(_id)
        const projects = await Songs.find({'category':_id})
        console.log(projects)

        let object=[]
        for (var i = 0; i < projects.length; i++) {

           // var company =  await Category.findOne({_id:currentProject._id})

            object.push({
               // company_name: company.name,
                project_name:projects[i].song_name,
                team_name: category.category_name,
                project_id: projects[i].id,

            })
        }


        res.status(200).send(object)
    } catch (eror) {
        res.status(400).send("Nije dobro")
    }

})
module.exports = router