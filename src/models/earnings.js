const mongoose = require('mongoose')

const earningSchema = new mongoose.Schema({
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'User'
    },
    // accountId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     required:true,
    //     ref: 'Account'
    // },
    type: {
        type: String,
        default: "Earning"
        
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
    dateOfEarning: {
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

const Earning = mongoose.model('Earning', earningSchema)


module.exports = Earning