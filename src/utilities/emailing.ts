import nodemailer from "nodemailer";

const data = {
  host: "smtp-relay.sendinblue.com",
  port: 587,
  auth: {
    user: "yusufanka54@gmail.com",
    pass: "vpJOwbK1AdL0zIQ4",
  },
  secured: false,
};
const transport = nodemailer.createTransport(data);

async function sendMail(name: String, email: String, password: String) {
  const mail = {
    from: "Admin <admin@decagon.hq>",
    to: `${email}`,
    subject: "Email verification",
    text: `Hi ${name}, \n 
        An Admin account has been created for you on scorecard Decagon:\n
        Please, use the following information to sign-in \n
        Email: ${email} \n 
        Password: ${password}\n 
        You can change your Password later 
        \n

        Kind Regards,
        Group 2 Team
        `,
  };
  const info = await transport.sendMail(mail);
  return info;
}
export { sendMail };
