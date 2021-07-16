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
  res.send(req.user.getPublicProfile());
});

//get user by id
userRoutes.get("/users/:id", async (req, res) => {
  const _id = req.params.id;
  if (_id.match(/^[0-9a-fA-F]{24}$/)) {
    // User.findById(_id)
    //   .then((user) => {
    //     if (user) {
    //       res.send(user);
    //     } else {
    //       res.status(404).send("user not found");
    //     }
    //   })
    //   .catch((error) => {
    //     res.status(500).send(error);
    //   });
    try {
      const user = await User.findById(_id);
      if (user) {
        res.send(user);
      } else {
        res.status(404).send("user not found");
      }
    } catch (error) {
      res.send(500).send(error);
    }
  } else {
    res.status(500).send("user id is not valid");
  }
});
//update the user
userRoutes.patch("/user/:id", async (req, res) => {
  const allowedUpdates = ["name", "email", "password", "age"];
  const updates = Object.keys(req.body);
  const isvalidOperation = updates.every((update) => {
    return allowedUpdates.includes(update);
  });
  if (!isvalidOperation) {
    return res.status(404).send({ error: "Invalid updates" });
  }
  try {
    const _id = req.params.id;
    // const updatedUser = await User.findByIdAndUpdate(_id, req.body, {
    //   new: true,
    //   runValidators: true,
    // });

    const userTobeUpdated = await User.findById(_id);
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
userRoutes.delete("/user/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const deletedUser = await User.findByIdAndRemove(_id);

    if (!deletedUser) {
      return res.status(404).send();
    }
    return res.send(deletedUser);
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
    res.send({ user: user.getPublicProfile(),token:token});
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
