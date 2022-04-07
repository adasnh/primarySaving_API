const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace("Bearer ", '')
        const decoded = jwt.verify(token, '$2a$08$2J9BhHV6rKpag3AGKBHXgeMrmgwWi0P3RNn.xn5m97/247gQGGF46')
        const user = await User.findOne({_id: decoded._id, 'tokens.token': token})
        if(!user){
            throw new Error()
        }
        req.token = token
        req.user = user
        next()
    } catch (e) {
        res.status(401).send({error: 'Please authenticate.'})
    }
}

module.exports = auth