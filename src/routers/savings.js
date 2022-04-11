const express = require('express')
const router = new express.Router()
const Saving = require('../models/savings')
const auth = require('../middleware/auth')

/*****************************************/
/*****************************************/
router.post('/savings', auth, async (req,res) => {
    const saving = new Saving({
        ...req.body,
        ownerId: req.user._id
    })
    try {
        await saving.save()
        res.status(201).send(saving)
    } catch (e){
        res.status(404).send(e.message)
    }
})

router.get('/savings', auth, async (req,res) => {

    try{
        const savings = await Saving.find({
            ownerId: req.user._id
        })
        res.status(200).send(savings)
    } catch (e) {
        res.status(404).send(e.message)
    }
})

router.get('/savings/:id', auth, async (req, res) => {
    const _id = req.params.id

    try{
        const savings = await Saving.findOne({_id, ownerId: req.user._id})
        if(!savings){
            return res.status(404).send()
        }
        res.status(200).send(savings)
    } catch {
        res.status(500).send(e.message)
    }
})

router.patch('/savings/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['balance', 'category', 'deadline']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    
    if(!isValidOperation){
        return res.status(400).send({ error: 'Invalid updates'})
    }
    const _id = req.params.id
    try{
        const saving = await Saving.findOne({_id, ownerId: req.user._id})
        if(!saving){
            return res.status(404).send()
        }
        let newAmount = parseInt(req.body.balance) + parseInt(saving.balance)
        req.body.balance = newAmount.toString()
        updates.forEach((update) => saving[update] = req.body[update] )
        await saving.save()
        res.status(200).send(saving)
    } catch (e) {
        res.status(400).send(e.message)
    }
})

router.get('/savings/:id', auth, async (req, res) => {
    const _id = req.params.id

    try{
        
        const saving = await Saving.findOne({_id, ownerId: req.user._id})
        if(!saving){
            return res.status(404).send()
        }
        res.status(200).send(saving)
    } catch {
        res.status(500).send(e.message)
    }
    
})

router.delete('/savings/:id', auth, async (req, res) => {
    const _id = req.params.id
    try {
        const saving = await Saving.findOneAndDelete({_id, ownerId: req.user._id})
        if(!saving){
            return res.status(404).send()
        }

        res.status(200).send(saving)
    } catch (e) {
        res.status(400).send(400)
    }
})
/*****************************************/
/*****************************************/
module.exports = router