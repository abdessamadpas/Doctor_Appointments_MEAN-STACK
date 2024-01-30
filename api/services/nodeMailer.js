require("dotenv").config();
const nodemailer = require("nodemailer");




const sendEmail = async ( mailOptions) => {
  try {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          // TODO: replace `user` and `pass` values from <https://forwardemail.net>
          user: "boughadoin@gmail.com",
          pass: "jeaj asfp tpas orgl",
        },
      });
    await transporter.sendMail(mailOptions).then((res) => {
    }
    )} catch (error) {
    console.log(error);
  }
};

module.exports = {
    sendEmail
};