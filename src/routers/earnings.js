const express = require('express')
const router = new express.Router()
const Earning = require('../models/earnings')
const auth = require('../middleware/auth')

/*****************************************/
/*****************************************/
router.post('/earnings', auth, async (req,res) => {
    const earning = new Earning({
        ...req.body,
        ownerId: req.user._id
    })
    try {
        await earning.save()
        res.status(201).send(earning)
    } catch (e){
        res.status(404).send(e.message)
    }
})

router.get('/earnings', auth, async (req,res) => {

    try{
        if(req.query.category !== undefined && req.query.firstDate !== undefined && req.query.secondDate !== undefined) {
            const earnings = await Earnings.find({
                ownerId: req.user._id,
                dateOfEarning: {
                    $gte: req.query.firstDate,
                    $lte: req.query.secondDate
                }
            }).skip(parseInt(req.query.skip)).limit(parseInt(req.query.limit)).sort({
                dateOfEarning: -1
            })
            res.status(200).send(earnings)
        } else if(req.query.category !== undefined && req.query.firstDate === undefined && req.query.secondDate === undefined) {
            const earnings = await Earning.find({
                ownerId: req.user._id,
                category: req.query.category
            }).skip(parseInt(req.query.skip)).limit(parseInt(req.query.limit)).sort({
                dateOfEarning: -1
            })
            res.status(200).send(earnings)
        } else if(req.query.category === undefined && req.query.firstDate !== undefined && req.query.secondDate !== undefined){
            const earnings = await Earning.find({
                ownerId: req.user._id,
                dateOfEarning: {
                    $gte: req.query.firstDate,
                    $lte: req.query.secondDate
                }
            }).skip(parseInt(req.query.skip)).limit(parseInt(req.query.limit)).sort({
                dateOfEarning: -1
            })
            res.status(200).send(earnings)
        } else {
            const earnings = await Earning.find({
                ownerId: req.user._id
            }).skip(parseInt(req.query.skip)).limit(parseInt(req.query.limit)).sort({
                dateOfEarning: -1
            })
            res.status(200).send(earnings)
        }
        
    } catch (e) {
        res.status(404).send(e.message)
    }
})

router.get('/earnings/:id', auth, async (req, res) => {
    const _id = req.params.id

    try{
        
        const earning = await Earning.findOne({_id, ownerId: req.user._id})
        if(!earning){
            return res.status(404).send()
        }
        res.status(200).send(earning)
    } catch {
        res.status(500).send(e.message)
    }
    
})

router.patch('/earnings/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['amount', 'category', 'dateOfEarning', 'description']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    
    if(!isValidOperation){
        return res.status(400).send({ error: 'Invalid updates'})
    }
    const _id = req.params.id
    try{
        const earning = await Earning.findOne({_id, ownerId: req.user._id})
        if(!earning){
            return res.status(404).send()
        } 

        updates.forEach((update) => earning[update] = req.body[update] )
        await earning.save()
        res.status(200).send(earning)
    } catch (e) {
        res.status(400).send(e.message)
    }
})

router.get('/earnings/:id', auth, async (req, res) => {
    const _id = req.params.id

    try{
        
        const earning = await Earning.findOne({_id, ownerId: req.user._id})
        if(!earning){
            return res.status(404).send()
        }
        res.status(200).send(earning)
    } catch {
        res.status(500).send(e.message)
    }
    
})

router.delete('/earnings/:id', auth, async (req, res) => {
    const _id = req.params.id
    try {
        const earning = await Earning.findOneAndDelete({_id, ownerId: req.user._id})
        if(!earning){
            return res.status(404).send()
        }

        res.status(200).send(earning)
    } catch (e) {
        res.status(400).send(400)
    }
})
/*****************************************/
/*****************************************/
module.exports = router