const mongoose = require('mongoose')

const accountSchema = new mongoose.Schema({
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'User'
    },
    balance: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
})


accountSchema.virtual('accountSpendings', {
    ref: 'Spending',
    localField: '_id',
    foreignField: 'accountId'
})

accountSchema.virtual('accountEarnings', {
    ref: 'Earning',
    localField: '_id',
    foreignField: 'accountId'
})

//Delete all spendings / earning connected to account when it is removed.
accountSchema.pre('remove', async function (next) {
    const account = this
    await Spending.deleteMany({accountId: user._id})
    await Earning.deleteMany({accountId: user._id})
    next()
})

const Account = mongoose.model('Account', accountSchema)
module.exports = Account