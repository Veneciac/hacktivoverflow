var nodemailer = require('nodemailer');
const User = require('../models/User')


var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ciamailervene@gmail.com',
    pass: 'vene12345'
  }
});

function checkDate (list) {
    let today = new Date().getDate()
    let userToday = []
    list.forEach(el => {
        if (new Date(el.createdAt).getDate() == today) {
            userToday.push(el.email)
        }
    })
    return userToday
}

module.exports = {
    sendMail (done) {
        var mailOptions = {
            from: 'ciamailervene@gmail.com',
            to: ``,
            subject: 'Hacktiv Overflow',
            html: `
               <h1> Yeay!!!! Today is your monthsary with HacktivOverflow </h1>
                <p> Don't forget to check us out ! </p>
                <br>
                <p> Be active and you will be smarter (: </p>
                <br>
                <br>
                <p> Thank you. </p> 
                
            `
        }
        User.find({})
            .then(data => {
                let emailList = checkDate(data)
                 if (emailList.length !== 0) {
                     mailOptions.to = emailList.join(', ')
     
                     transporter.sendMail(mailOptions, function(error, info){
                         if (error) {
                           console.log(error);
                         } else {
                             done()
                           console.log('Email sent: ' + info.response);
                         }
                     })

                 }
            })
            .catch(err => {
                console.log(err)
            })
     
       
    }
    

}