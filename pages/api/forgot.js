import Forgot from "@/models/Forgot";
import User from "@/models/User";
const nodemailer = require("nodemailer");
var jwt = require("jsonwebtoken");
var CryptoJS = require("crypto-js");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  auth: {
    user: "mirza_shah@ndiit.org",
    pass: "pdpwalaqmgoacsrk",
  },
});

function generateUniqueToken() {
  let token = "";
  const characters =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+[]{}|;:,.<>?";
  const charactersLength = characters.length;

  for (let i = 0; i < 30; i++) {
    token += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return token;
}

export default async function handler(req, res) {
  try {
    if (req.body.sendMail) {
      const url = "http://localhost:3000/forgot";
      let token = generateUniqueToken();

      let user = await User.findOne({ email: req.body.email });

      if (!user) {
        res.status(404).json({ success: false, error: "User Not Found" });
      }

      let forgot = new Forgot({
        email: req.body.email,
        token: token,
      });

      await forgot.save();

      // console.log(user)

      let mail = `Hello ${user.username},
  
      Somebody requested a new password for the Forget Password account associated with ${req.body.email}.
      
      No changes have been made to your account yet.
      
      You can reset your password by clicking the link below:
      
      <a href="${url}?token=${token}">Click here to reset your password</a>
  
      If you did not request a new password, please let us know immediately by replying to this email.
      
      Yours,
      The NextWear team`;
      const info = await transporter.sendMail({
        from: "mirza_shah@ndiit.org", // sender address
        to: req.body.email, // list of receivers
        subject: "Reset Password", // Subject line
        html: mail, // html body
      });

      res.status(200).json({ success: true });
    } else {
      let token = await Forgot.findOne({ token: req.body.token });
      //   console.log(token);
      if (!token) {
        res.status(404).json({ success: "false", error: "Invalid Token" });
      }

      let dbuser = await User.findOneAndUpdate(
        { email: token.email },
        {
          password: CryptoJS.AES.encrypt(
            req.body.password,
            process.env.JWT_SECRET
          ).toString(),
        }
      );

      await Forgot.findOneAndDelete({ token: req.body.token });
      res.status(200).json({ success: true });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: "false", error: "Internal Server Error" });
  }
}
