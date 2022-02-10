const express = require('express')
const Songs = require('../models/songs')
const router = new express.Router()
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart(undefined);
const JWT=require('../routers/JWT')

const use=require('../routers/JWT')



router.post('/songs',multipartMiddleware,async (req, res) => {
    if(use.ime!==undefined) {
        const songs = new Songs(req.body)

        try {
            songs.save()
            console.log(songs)
            res.status(200).send(songs)
        } catch (eror) {
            res.status(400).send(eror)
        }

    }else{
        res.send("Nemate pravo")
    }
})
router.get('/songs', async (req, res) => {
    if(use.ime!==undefined){
    try {
        const songs = await Songs.find({})
        res.status(200).send(songs)
    } catch (eror) {
        res.status(400).send(eror)
    }}else{
        res.send("Nemate pravo")
    }


})

router.get('/song/:id',async (req, res) => {
console.log("IME",use.ime)
    if(use.ime!==undefined){

    try {
        const _id = req.params.id
        const songs = await Songs.findById(_id)
        if (!songs) {
            req.status(404).send()
        }
        res.status(200).send(songs)
    } catch (eror) {
        res.status(400).send(eror)
    }

}
else{
    res.send("Nemate pravo")
}

})
router.get('/listen/:id', async (req, res) => {

    const _id = req.params.id
    try {
        const songs = await Songs.findById(_id)
        if (!songs) {
            req.status(404).send()
        }
        res.status(200).send(songs)
    } catch (eror) {
        res.status(400).send(eror)
    }

})


router.put('/songs/:id',multipartMiddleware, async (req, res) => {
    if(use.ime!==undefined){
    const updates = Object.keys(req.body)


    try {
        const songs = await Songs.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

        if (!songs) {
            return res.status(404).send()
        }

        res.send(songs)
    } catch (e) {
        res.status(400).send(e)
    }
}else{
        res.send("Nemate pravo")
    }
})

router.delete('/:id',async (req, res) => {
    if(use.ime!==undefined){
    try {
        const songs = await Songs.findByIdAndDelete(req.params.id)

        if (!songs) {
            return res.status(404).send()
        }

        res.send(songs)
    } catch (e) {
        res.status(500).send()
    }}else{
        res.send("Nemate pravo")
    }
})


module.exports = router