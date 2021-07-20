const express = require("express");
const userRoutes = new express.Router();
const User = require("../models/User");
const auth = require("../middleware/auth");
const multer = require("multer");
const sharp = require("sharp");
userRoutes.post("/users", async (req, res) => {
  try {
    const user = await new User(req.body).save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
  // return res.send("Hello world");
});

//get the users
userRoutes.get("/users/me", auth, async (req, res) => {
  res.send(req.user);
});
//update user
userRoutes.patch("/user/me", auth, async (req, res) => {
  const allowedUpdates = ["name", "email", "password", "age"];
  const updates = Object.keys(req.body);
  const isvalidOperation = updates.every((update) => {
    return allowedUpdates.includes(update);
  });
  if (!isvalidOperation) {
    return res.status(400).send({ error: "Invalid updates" });
  }
  try {
    // const _id = req.user._id;
    // const updatedUser = await User.findByIdAndUpdate(_id, req.body, {
    //   new: true,
    //   runValidators: true,
    // });

    // const userTobeUpdated = await User.findById(_id);
    const userTobeUpdated = req.user;
    console.log(userTobeUpdated);
    updates.forEach((update) => {
      userTobeUpdated[update] = req.body[update];
    });
    await userTobeUpdated.save();
    if (!userTobeUpdated) {
      return res.status(400).send();
    }
    res.send(userTobeUpdated);
  } catch (error) {
    res.status(500).send(error);
  }
});
//delete a task by its id
userRoutes.delete("/user/me", auth, async (req, res) => {
  try {
    return res.send(await req.user.remove());
  } catch (error) {
    res.status(500).send(error);
  }
});

//login a user
userRoutes.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredientials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (error) {
    res.send(400);
  }
});
userRoutes.post("/users/logout", auth, async (req, res) => {
  try {
    const index = req.user.tokens.indexOf(req.token);
    req.user.tokens.splice(index, 1);
    await req.user.save();
    res.json("logout successfully").send();
  } catch (error) {
    res.status(500).send(error);
  }
});
userRoutes.post("/users/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.json("logout successfully").status(200).send();
  } catch (error) {
    res.status(500).send(error);
  }
});
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "avatars");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({
  fileFilter: function (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("please upload valid avatar file"));
    }
    cb(null, true);
  },
  limits: {
    fileSize: 10000000,
  },
  //  storage:storage
});
userRoutes.post(
  "/user/me/avatar",
  auth,
  upload.single("avatar"),
  async (req, res) => {
    const buffer = await sharp(req.file.buffer)
      .resize(250, 250)
      .png()
      .toBuffer();
    req.user.avatar = buffer;
    await req.user.save();
    res.send();
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);
userRoutes.delete("/user/me/avatar", auth, async (req, res) => {
  req.user.avatar = undefined;
  await req.user.save();
  res.send();
});
//get avatar
userRoutes.get("/user/:id/avatar", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user || !user.avatar) {
      throw new Error();
    }
    res.set("Content-Type", "image/jpg");
    res.send(user.avatar);
  } catch (error) {
    res.status(404).send();
  }
});
module.exports = userRoutes;
