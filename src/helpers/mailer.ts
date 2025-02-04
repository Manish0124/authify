import User from "@/models/userModel";
import nodemailer from "nodemailer";
import bycryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    //TODO: configure mailer for uses

    const hashedToken = await bycryptjs.genSalt(10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyverifyToken: hashedToken,
        verifyTokenExpire: Date.now() + 360000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordExpire: Date.now() + 360000,
      });
    }

    // Looking to send emails in production? Check out our Email API/SMTP product!
    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "f3f0719a51fce0", // wrokng
        pass: "ad317d51afc760", // wrokng
      },
    });

    const mailOptions = {
      from: "manish@ai.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<p >Click <a href= "${
        process.env.DOMAIN
      }/Verifyemail? token=${hashedToken}" > here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your email"
      } 
      or copy paste the below link in your browser
      <br> ${process.env.DOMAIN}/verifyemail ? token=${hashedToken}
      </p>`,
    };

    const mailOption = await await transport.sendMail(mailOptions);
    return mailOption;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
