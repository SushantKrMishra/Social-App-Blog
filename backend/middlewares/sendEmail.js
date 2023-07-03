const nodeMailer = require('nodemailer')
exports.sendEmail = async(options)=>{
  // const transporer = nodeMailer.createTransport({
  //   host: process.env.SMPT_HOST,
  //   port:process.env.SMPT_PORT,
  //   auth:{
  //     user:process.env.SMPT_MAIL,
  //     pass:process.env.SMPT_PASSWORD,
  //   },
  //   service:process.env.SMPT_SERVICE,
  // })
  var transport = nodeMailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "6b20c1b4f5e017",
      pass: "a6303ffe44259a"
    }
  });
  const mailOptions = {
    from : process.env.SMPT_MAIL,
    to:options.email,
    subject:options.subject,
    text:options.message,
  }
  await transport.sendMail(mailOptions);
}