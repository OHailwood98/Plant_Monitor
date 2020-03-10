import nodemailer from "nodemailer";

const sender = '"Brands Hatch Timer" <confirmation@BrandsHatch.com>'

function setup(){
  return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS
      }
  });
}

export function sendConfirmEmail(user){
    const transport = setup()
    const email = {
        from: sender,
        to: user.email,
        subject: "Brands Hatch Confirmation",
        text: `
        Welcome to The Brands Hatch Track Timer, Please Confirm you Email.
        
        ${user.genConfirmUrl()}`
    }
    transport.sendMail(email);
}