const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const spendingRouter = require('./routers/spendings')
const earningRouter = require('./routers/earnings')
const savingRouter = require('./routers/savings')
const swaggerUI = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')
//const accountRouter = require('./routers/accounts')
/*****************************************/
/*****************************************/

// const options = {
//     definition: {
//         openapi: "3.0.0",
//         info: {
//            title: "primarySaving API",
//            version: "1.0.0",
//         },
//         servers: [{
//             url:"https://wsei-primary-saving.herokuapp.com",
//             description: "Production"
//         }, {
//             url:"https://localhost:3000"
//         }]
//     },
//     apis: ["./routers/*js"]
// }

//const specs = swaggerJsDoc(options)

const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(userRouter)
app.use(spendingRouter)
app.use(earningRouter)
app.use(savingRouter)
//app.use("/swagger", swaggerUI.serve, swaggerUI.setup(specs))
//app.use(accountRouter)




app.listen(port, () => {
    console.log("Server is up on port " + port)
})
