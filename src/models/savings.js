const mongoose = require('mongoose')

const savingSchema = new mongoose.Schema({
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
        required: true,
    },
    balance: {
        type: Number,
        default: 0
    },
    goal: {
        type: Number,
        default: 0
    },
    deadline: {
        type: Date,
        required: true,
        validate(value) {
            if(value <= Date.now){
                throw new Error("Date should be in future.")
            }
        }
    }
}, {
    timestamps: true
})
const Saving = mongoose.model('Saving', savingSchema)
module.exports = Saving