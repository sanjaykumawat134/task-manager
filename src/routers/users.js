const express = require("express");
const userRoutes = new express.Router();
const User = require("../models/User");
const auth = require("../middleware/auth");
userRoutes.post("/users", async (req, res) => {
  try {
    const user = await new User(req.body).save();
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
  // return res.send("Hello world");
});

//get the users
userRoutes.get("/users/me", auth, async (req, res) => {
  res.send(req.user);
});

userRoutes.patch("/user/me", auth,async (req, res) => {
  const allowedUpdates = ["name", "email", "password", "age"];
  const updates = Object.keys(req.body);
  const isvalidOperation = updates.every((update) => {
    return allowedUpdates.includes(update);
  });
  if (!isvalidOperation) {
    return res.status(404).send({ error: "Invalid updates" });
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
userRoutes.delete("/user/me", auth,async (req, res) => {
  try {
    return res.send(await req.user.remove());
  } catch (error) {
    res.status(500).send(error);
  }
})

//login a user
userRoutes.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredientials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user,token});
  } catch (error) {
    res.send(400);
  }
});
userRoutes.post('/users/logout',auth,async(req,res)=>{
  try{
 const index = req.user.tokens.indexOf(req.token);
 req.user.tokens.splice(index,1);
 await req.user.save();
 res.json("logout successfully").send();
  }
  catch(error){
    res.status(500).send(error)
  }
})
userRoutes.post('/users/logoutAll',auth,async(req,res)=>{
  try{
      req.user.tokens =[];
      await req.user.save();
      res.json('logout successfully').status(200).send();
  }catch(error){
    res.status(500).send(error)
  }
})

module.exports = userRoutes;
