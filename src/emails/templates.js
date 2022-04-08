const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)


const sendConfirmationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'adasnh@gmail.com',
        subject: 'Please verify Your primarySaving account',
        text: `Hello, ${name}! \n Please verify your account by clicking this link`
    })
}   

const sendResignationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'adasnh@gmail.com',
        subject: 'Confirmation of removing your primarySaving account',
        text: `Hello, ${name}! \n Please note that your primarySaving account has been removed.`
    })
}   

module.exports = {
    sendConfirmationEmail,
    sendResignationEmail
}
