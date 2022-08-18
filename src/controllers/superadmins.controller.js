const bcrypt = require("bcryptjs");
const userOps = require("../lib/userOps");

const SuperAdmin = require("../models/superadmins.model.js");
const User = require("../models/users.model.js");

const Sib = require("sib-api-v3-sdk");
require("dotenv").config();

const client = Sib.ApiClient.instance;
const apiKey = client.authentications["api-key"];
apiKey.apiKey = process.env.SENDINBLUE_API_KEY;

const tranEmailApi = new Sib.TransactionalEmailsApi();
const sender = {
  email: "haseebudeen@karigar.pk",
  name: "Haseeb",
};
exports.signin = async (req, res) => {
  return userOps.userSignin(req, res, SuperAdmin);
};

exports.reset = async (req, res) => {
  return userOps.userReset(req, res, SuperAdmin);
};
exports.createuser = async (req, res) => {
  let { email, password, category } = req.body;

  try {
    if (!email || !password || !category) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({ message: "Provided email already exists" });
    }
    let passwordToSend = password;
    password = await bcrypt.hash(password, 12);
    return User.create({ email, password, category }).then(async () => {
      await tranEmailApi
        .sendTransacEmail({
          sender,
          to: [{ email }],
          subject: "The Chunks LMS Portal",
          htmlContent: `
           <h1>Welcome to Chunks LMS</h1>
           <h3>Here are your credentials to login to the system:</h3>
           <p>Email: ${email} </p> <p> Password: ${passwordToSend}</p>
              <p> Please change your password after the first sign in. </p>    `,
        })
        .then(() => {
          return res.status(201).json({
            message: `New user successfully created. Email sent successfully!`,
          });
        })
        .catch(() => {
          return res.status(201).json({
            message: `New user successfully created. Email was not sent due to some problem.`,
          });
        });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
