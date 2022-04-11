const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Spending = require('./spendings')
const Earning = require('./earnings')
const Saving = require('./savings')

const userSchema = new mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now
    },
    name: {
        type: String,
        required: true,
        trim:true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error("Email is invalid")
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if(value.length < 8 ){
                throw new Error("Password should have at least 6 characters")
            } else if(value.includes(this.name)){
                throw new Error("Password cannot contain username")
            } 
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    accounts: [{
        account: {
            type: String,
            default: "Main"
        }
    }],
    expireAt: {
        type: Date,
        default: Date.now() + 86400000,
      },
}, {
    timestamps: true
})

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })

    if(!user){
        throw new Error('Unable to login')
    } 

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch){
        throw new Error('Unable to login')
    }

    return user
}


// Virtual property (relationship beetwen two entities)

userSchema.virtual('userSpendings', {
    ref: 'Spending',
    localField: '_id',
    foreignField: 'ownerId'
})

// userSchema.virtual('userAccounts', {
//     ref: 'Account',
//     localField: '_id',
//     foreignField: 'ownerId'
// })

userSchema.virtual('userEarnings', {
    ref: 'Earning',
    localField: '_id',
    foreignField: 'ownerId'
})

userSchema.virtual('userSavings', {
    ref: 'Saving',
    localField: '_id',
    foreignField: 'ownerId'
})

//Hiding user data
userSchema.methods.toJSON = function () {
    const user = this
    const rowUserObject = user.toObject()

    delete rowUserObject.password
    delete rowUserObject.tokens
    
    return rowUserObject
}

//Generating Auth Token
userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user.id.toString() }, process.env.JWT_SECRET)
    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
}

// Hash the password
userSchema.pre('save', async function (next) {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

//Delete all user spendings / earning and accounts when user is removed
userSchema.pre('remove', async function (next) {
    const user = this
    await Spending.deleteMany({ownerId: user._id})
    await Earning.deleteMany({ownerId: user._id})
    await Saving.deleteMany({ownerId: user._id})
    // await Account.deleteMany({ownerId: user._id})
    next()
})


const User = mongoose.model('User', userSchema)

module.exports = User
