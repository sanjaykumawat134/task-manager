const jwt = require("jsonwebtoken");
const User = require("../models/User");
const auth = async (req, res, next) => {
  console.log("middleware running");
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    console.log(token);
    const decode = jwt.verify(token, "taskmangerapp");
    console.log(decode);
    const user = await User.findOne({ _id: decode._id, "tokens.token": token });
    console.log(user);
    if (!user) {
      throw new Error("user not found");
    }
    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    res.status(404).send({ error: "please authenticate!" });
  }
};

module.exports = auth;
