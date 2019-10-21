const express   = require("express");
const router    = express.Router();

const mongoose  = require("mongoose");
const User      = require("../models/user.js");
const bcrypt    = require("bcrypt");


// it returns all users
router.get("/", async (req, res) => {
  const allUsers = await User.find();
  res.json(allUsers);
});


// it returns info about a particular user
router.get("/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await User
      .findById(userId)
      .select(" email ");

    if (!user || user.length < 1)
      return res.status(409).json({
        error: `User <id: ${userId}> does not exist.`
      });
    
    res.status(200).json({
      message: user
    });
  } catch(err) {
    console.log("Error => ", err.message);
    res.status(422).json({
      error: "Something got wrong."
    });
  }
});


// it creates an user account
router.post("/signup", async (req, res) => {
  const email = req.body.email;

  // it checks whether the email is already been used by an user account
  // if so, it returns an error message
  const userExist = await User
    .find({ email });

  if (userExist.length > 0)
    return res.status(409).json({ error: `User <email: ${email}> alread exists.`});


  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err)
      return res.json({
        error: "Something bad at the password process."
      });
    else {

      try{
      const user = new User({
        _id: new mongoose.Types.ObjectId(),
        email,
        password: hash
      });

        user.save();
        return res.status(201).json({ message: `User ${user.email} has been created.`});

      } catch(err) {
        console.trace("Error: ", err.message);
        res.status(422).json({
          error: "Something bad at the User save process."
        });
      };
    }
  });
});


// it deletes a user account
router.delete("/:userId", async (req, res) => {
  const userId = req.params.userId;

  const userToBeDeleted = await User.findById(userId);
  console.trace(userToBeDeleted);
  if (!userToBeDeleted || userToBeDeleted.length < 1)
    return res.status(409).json({
      error: "User not found"
    });
  
  else {
    try {
      const userDeleted = await User.deleteOne({ _id: userId});

      if (userDeleted.deletedCount)
        return res.status(200).json({
          message: `User ${userId} has been deleted`
        });
      else
        return res.json({
          message: `User ${userId} has already been deleted`
        });
    } catch (err) {
      console.trace("Error => ", err.message);
      res.status(404).json({
        error: `Something bad with User id = ${id}`
      })
    }
  }
});


module.exports = router;