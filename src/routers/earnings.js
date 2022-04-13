const express = require('express')
const router = new express.Router()
const Earning = require('../models/earnings')
const auth = require('../middleware/auth')
const m2s = require('mongoose-to-swagger');

/*****************************************/
/*****************************************/


router.post('/earnings', auth, async (req, res) => {
    const earning = new Earning({
        ...req.body,
        ownerId: req.user._id,
    })
    try {
        await earning.save()
        res.status(201).send(earning)
    } catch (e) {
        res.status(404).send(e.message)
    }
})

router.get('/earnings', auth, async (req, res) => {

    try {
        const earnings = await Earning.find({
            ownerId: req.user._id,
            ...req.query.category ? {
                category: req.query.category
            } : {},
            ...req.query.amount ? {
                amount: req.query.amount
            } : {},
            ...req.query.dateOfEarning ? {
                dateOfEarning: {
                    $gte: req.query.dateOfEarning,
                }
            } : {
                dateOfEarning: {
                    $gte: req.query.startDate,
                    $lte: req.query.endDate
                }
            }
        }).skip(parseInt(req.query.skip)).limit(parseInt(req.query.limit)).sort({
            dateOfEarning: -1
        })
        res.status(200).send(earnings)
    } catch (e) {
        res.status(404).send(e.message)
    }
})
0
router.get('/earnings/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {

        const earning = await Earning.findOne({
            _id,
            ownerId: req.user._id
        })
        if (!earning) {
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

    if (!isValidOperation) {
        return res.status(400).send({
            error: 'Invalid updates'
        })
    }
    const _id = req.params.id
    try {
        const earning = await Earning.findOne({
            _id,
            ownerId: req.user._id
        })
        if (!earning) {
            return res.status(404).send()
        }
        updates.forEach((update) => earning[update] = req.body[update])
        await earning.save()
        res.status(200).send(earning)
    } catch (e) {
        res.status(400).send(e.message)
    }
})

router.get('/earnings/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {

        const earning = await Earning.findOne({
            _id,
            ownerId: req.user._id
        })
        if (!earning) {
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
        const earning = await Earning.findOneAndDelete({
            _id,
            ownerId: req.user._id
        })
        if (!earning) {
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