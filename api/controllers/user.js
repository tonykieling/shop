const mongoose  = require("mongoose");
const bcrypt    = require("bcrypt");
const jwt       = require("jsonwebtoken");
const User      = require("../models/user.js");


// it gets all users from the system - on purpose with no auth
get_all = async (req, res) => {
  const allUsers = await User
    .find()
    .select(" email ");

  if (allUsers.length < 1)
    return res.json({
      message: "No users at all"
    });
  res.json(allUsers);
}


// it gets one user - on purpose with no auth
get_one = async (req, res) => {
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
}


// it creates an user account
signup = async (req, res) => {
  const email     = req.body.email;
  const password  = req.body.password;

  // it checks whether the email is already been used by an user account
  // if so, it returns an error message
  try {
    const userExist = await User
      .find({ email });
  
    if (userExist.length > 0)
      return res.status(409).json({ error: `User <email: ${email}> alread exists.`});
  } catch(err) {
    console.trace("Error: ", err.message);
    return res.status(409).json({
      error: `Email <${email}> is invalid`
    });
  }

  bcrypt.hash(password, 10, async (err, hash) => {
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

        await user.save();

        const token = jwt.sign({
          email,
          userId: user._id
        },
        process.env.JWT_KEY,
        {
          expiresIn: process.env.JWT_expiration,
        });

        res.json({
          message: `User ${user.email} has been created.`, 
          user, 
          token
        });

      } catch(err) {
        console.trace("Error: ", err.message);
        res.status(422).json({
          error: "Something wrong with email."
        });
      };
    }
  });
}


// it logs the user
login = async (req, res) => {
  const email     = req.body.email;
  const password  = req.body.password;
console.log(email, password);
  try {
    const user = await User
      .findOne({ email });

    if (!user || user.length < 1)
      return res.status(401).json({ error: "Authentication has failed"});
    else {
      bcrypt.compare(password, user.password, (err, result) => {
        if (err)
          return res.status(401).json({ error: "Authentication has failed"});

        if (result){
          const token = jwt.sign({
            email,
            userId: user._id
          },
          process.env.JWT_KEY,
          {
            expiresIn: process.env.JWT_expiration,
          });

          res.json({
            message: "success", 
            user, 
            token
          });
        }
        else
          res.status(401).json({ error: "Authentication has failed"});
      });
    }
  } catch(err) {
    console.trace("Error: ", err.message);
    res.status(401).json({ error: "Authentication has failed"});
  }
}


modify_user = async (req, res) => {
  const user = req.params.userId;

  try {
    const checkUser = await User
      .findById(user);
    
    if (!checkUser)
      return res.status(404).json({
        error: `User <${user}> NOT found.`
      });

    const email = req.body.email;
    if (!email) {
      console.trace("Error: ", email);
      return res.status(409).json({
        error: `Email <${email}> is invalid.`
      });
    }
    
    const changeUser = await User
      .updateOne({
        _id: checkUser._id
      }, {
        $set: {
          email: req.body.email
        }
      }, {
        runValidators: true
      });
    
    if (changeUser.nModified) {
      const modifiedUser = await User
        .findById({ _id: user})
        .select(" email ");

      res.json({
        message: `User <${modifiedUser.email}> has been modified.`
      });
    } else
      res.status(409).json({
        error: `User <${user}> not changed.`
      });

  } catch(err) {
    console.trace("Error: ", err.message);
    res.status(409).json({
      error: "Something bad"
    });
  }
}


// it deletes an user account
delete_user = async (req, res) => {
  const userId = req.params.userId;

  try {
    const userToBeDeleted = await User.findById(userId);
    if (!userToBeDeleted || userToBeDeleted.length < 1)
      throw Error;
  } catch(err) {
    console.trace("Error: ", err.message);
    return res.status(409).json({
      error: `User <${userId} NOT found.`
    });
  }

  try {
    const userDeleted = await User.deleteOne({ _id: userId});

    if (userDeleted.deletedCount)
      return res.status(200).json({
        message: `User <${userId}> has been deleted`
      });
    else
      throw Error;
  } catch (err) {
    console.trace("Error => ", err.message);
    res.status(404).json({
      error: `Something bad with User id <${userId}>`
    })
  }
}


module.exports = {
  get_all,
  get_one,
  signup,
  login,
  modify_user,
  delete_user
}