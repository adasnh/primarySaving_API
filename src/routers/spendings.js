const express = require('express')
const router = new express.Router()
const Spending = require('../models/spendings')
const auth = require('../middleware/auth')

/*****************************************/
/*****************************************/
router.post('/spendings', auth, async (req, res) => {
    const spending = new Spending({
        ...req.body,
        ownerId: req.user._id
    })
    try {
        await spending.save()
        res.status(201).send(spending)
    } catch (e) {
        res.status(404).send(e.message)
    }
})

router.get('/spendings', auth, async (req, res) => {

    try {
        const spendings = await Spending.find({
            ownerId: req.user._id,
            ...req.query.category ? {
                category: req.query.category
            } : {},
            ...req.query.amount ? {
                amount: req.query.amount
            } : {},
            ...req.query.dateOfSpending ? {
                dateOfSpending: {
                    $gte: req.query.dateOfSpending,
                }
            } : {
                dateOfSpending: {
                    $gte: (req.query.startDate === undefined ? req.query.startDate = new Date(1960,01,01) : req.query.startDate),
                    $lte: (req.query.endDate === undefined ? req.query.endDate = new Date(3000,12,12) : req.query.endDate)
                }
            }
        }).skip(parseInt(req.query.skip)).limit(parseInt(req.query.limit)).sort({
            dateOfSpending: -1
        })
        res.status(200).send(spendings)
        console.log(spendings)
    } catch (e) {
        res.status(404).send(e.message)
    }
})

router.get('/spendings/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {

        const spending = await Spending.findOne({
            _id,
            ownerId: req.user._id
        })
        if (!spending) {
            return res.status(404).send()
        }
        res.status(200).send(spending)
    } catch {
        res.status(500).send(e.message)
    }

})

router.patch('/spendings/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['amount', 'category', 'dateOfSpending', 'description']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({
            error: 'Invalid updates'
        })
    }
    const _id = req.params.id
    try {
        const spending = await Spending.findOne({
            _id,
            ownerId: req.user._id
        })
        if (!spending) {
            return res.status(404).send()
        }

        updates.forEach((update) => spending[update] = req.body[update])
        await spending.save()
        res.status(200).send(spending)
    } catch (e) {
        res.status(400).send(e.message)
    }

})

router.delete('/spendings/:id', auth, async (req, res) => {
    const _id = req.params.id
    try {
        const spending = await Spending.findOneAndDelete({
            _id,
            ownerId: req.user._id
        })
        if (!spending) {
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