const express = require('express')
const router = new express.Router()
const Spending = require('../models/spendings')
const auth = require('../middleware/auth')

/*****************************************/
/*****************************************/
router.post('/spendings', auth, async (req,res) => {
    const spending = new Spending({
        ...req.body,
        ownerId: req.user._id
    })
    try {
        await spending.save()
        res.status(201).send(spending)
    } catch (e){
        res.status(404).send(e.message)
    }
})

router.get('/spendings', auth, async (req,res) => {

    try{
        const spendings = await Spending.find({ownerId: req.user._id})
        res.status(200).send(spendings)
    } catch (e) {
        res.status(404).send(e.message)
    }
})

router.get('/spendings/:id', auth, async (req, res) => {
    const _id = req.params.id

    try{
        
        const spending = await Spending.findOne({_id, ownerId: req.user._id})
        if(!spending){
            return res.status(404).send()
        }
        res.status(200).send(spending)
    } catch {
        res.status(500).send(e.message)
    }
    
})

router.patch('/spendings/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['type', 'amount', 'category', 'date', 'description']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    
    if(!isValidOperation){
        return res.status(400).send({ error: 'Invalid updates'})
    }
    const _id = req.params.id
    try{
        const spending = await Spending.findOne({_id, ownerId: req.user._id})
        if(!spending){
            return res.status(404).send()
        } 

        updates.forEach((update) => spending[update] = req.body[update] )
        await spending.save()
        res.status(200).send(spending)
    } catch (e) {
        res.status(400).send(e.message)
    }
    
})

router.delete('/spendings/:id', auth, async (req, res) => {
    const _id = req.params.id
    try {
        const spending = await Spending.findOneAndDelete({_id, ownerId: req.user._id})
        if(!spending){
            return res.status(404).send()
        }

        res.status(200).send(spending)
    } catch (e) {
        res.status(400).send(400)
    }
})
/*****************************************/
/*****************************************/
module.exports = router