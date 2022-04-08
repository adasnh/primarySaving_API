const mongoose = require('mongoose')

const spendingSchema = new mongoose.Schema({
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'User'
    },
    type: {
        type: String,
        enum: ['spendings', 'incomes'],
        required: true
    },
    amount: {
        type: Number,
        required: true,
        trim: true,
        validate(value) {
            if(value <= 0){
                throw new Error("Incorrect amount entered.")
            }
        }
    },
    category: {
        type: String,
        required: true,
    },
    dateOfSpending: {
        type: Date,
        default: Date.now,
        required: true,
    },
    description: {
        type: String,
        required: false,
        default: "",
        validate(value) {
            if(value.length > 4096){
                throw new Error("Desription is to long. Maximum number of characters is 4096.")
            }
        }
    }
}, {
    timestamps: true
})

const Spending = mongoose.model('Spending', spendingSchema)


module.exports = Spending