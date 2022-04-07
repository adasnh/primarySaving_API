const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const spendingRouter = require('./routers/spendings')
/*****************************************/
/*****************************************/
const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(userRouter)
app.use(spendingRouter)

app.listen(port, () => {
    console.log("Server is up on port " + port)
})

const Spending = require('./models/spendings')
const User = require('./models/user')

const main = async () => {


    //const task = await Spending.findById("624f489485c1ffa33b68a4fe")
    //await task.populate([{path: 'ownerId'}])
    //console.log(task.ownerId)

    const user = await User.findById('624f489185c1ffa33b68a4f9')
    await user.populate([{path: 'userSpendings'}])
    console.log(user.userSpendings)
} 

main()