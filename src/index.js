const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const spendingRouter = require('./routers/spendings')
const earningRouter = require('./routers/earnings')
/*****************************************/
/*****************************************/
const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(userRouter)
app.use(spendingRouter)
app.use(earningRouter)

app.listen(port, () => {
    console.log("Server is up on port " + port)
})
