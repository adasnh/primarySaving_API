const mongoose = require('mongoose')


const connectionURL = "mongodb+srv://adasnh:Adamo1234@cluster0.wu0v5.mongodb.net/primarySaving?retryWrites=true&w=majority";

mongoose.connect(connectionURL)


// const me = new User({
//     name: "   Mikeeee   ",
//     email: 'MYEMAIL@MEAD.IO   ',
//     password: "Mikeeee"
// })

// me.save().then((me) => {
//     console.log(me)
// }).catch((error) => {
//     console.log("Error", error)
// })

// const Task = mongoose.model('Task', {
//     description: {
//         type: String,
//         required: true,
//         trim: true
//     }, 
//     completed: {
//         type: Boolean,
//         default: false
//     },
//     dateCreated: {
//         type: Date
//     }
// })

// const task = new Task({
//     description: "Nauczyc sie node.js",
//     completed: false,
//     dateCreated: new Date().toISOString().slice(0,10)
// })

// task.save().then((task) => {
//     console.log(task)
// }).catch((error) => {
//     console.log("Error", error)
// })