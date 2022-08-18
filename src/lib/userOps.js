const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.userSignin = async (req, res, dbCollection) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide email and password" });
    }

    const user = await dbCollection.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "Provided email is not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Provided password is incorrect" });
    }

    const payload = {
      id: user._id,
      email: user.email,
    };

    jwt.sign(
      payload,
      "secretsecretsecret",
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;
        return res.status(200).json({ token });
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

exports.userReset = async (req, res, dbCollection) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide email and password" });
    }
    const user = await dbCollection.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "Provided email is not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Provided old password is incorrect" });
    }

    user.password = await bcrypt.hash(req.body.new_password, 12);
    return user.save(function (err) {
      if (err) return handleErr(err);
      return res.status(200).json({ message: "Password reset successfully" });
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
