// const express = require('express')
// const router = new express.Router()
// const Account = require('../models/accounts')
// const auth = require('../middleware/auth')
// /*****************************************/
// /*****************************************/

// router.post('/accounts', auth, async (req,res) => {
//     const account = new Account({
//         ...req.body,
//         ownerId: req.user._id
//     })
//     try {
//         await account.save()
//         res.status(201).send(account)
//     } catch (e){
//         res.status(404).send(e.message)
//     }
// })

// router.get('/accounts/:id', auth, async (req, res) => {
//     const _id = req.params.id

//     try{
        
//         const account = await Account.findOne({_id, ownerId: req.user._id})
//         if(!account){
//             return res.status(404).send()
//         }
//         res.status(200).send(account)
//     } catch {
//         res.status(500).send(e.message)
//     }
// })

// router.delete('/accounts/:id', auth, async (req, res) => {
//     const _id = req.params.id
//     try {
//         const account = await Account.findOneAndDelete({_id, ownerId: req.user._id})
//         if(!account){
//             return res.status(404).send()
//         }

//         res.status(200).send(account)
//     } catch (e) {
//         res.status(400).send(400)
//     }
// })
// /*****************************************/
// /*****************************************/
// module.exports = router