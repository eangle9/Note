const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");
const bcrypt = require("bcrypt");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("User Already Exist");
  }
  try {
    const user = new User({
      name,
      email,
      password,
      pic,
    });

    // save the user to database
    await user.save();

    // respond to the user
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
      pic: user.pic,
    });
  } catch (error) {
    res.status(400);
    throw new Error("Error Occured!");
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
      pic: user.pic,
    });
  } else {
    res.status(400);
    throw new Error("Invalid password or email");
  }
});

const editUserProfile = asyncHandler(async (req, res) => {
  const user_id = req.user._id;
  const user = await User.findById(user_id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.pic = req.body.pic || user.pic;
    // if(req.body.password){
    //   user.password = req.body.password;
    // }
    const updatedUser = await user.save();
    res.status(201).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      token: generateToken(updatedUser._id),
      pic: updatedUser.pic,
    });
  } else {
    res.status(404);
    throw new Error("User not Found");
  }
});

const comparePasswords = async (oldPassword, hashedPassword) => {
  try {
    isMatch = await bcrypt.compare(oldPassword, hashedPassword);
    return isMatch;
  } catch (error) {
    res.status(500).json({message:"something went wrong on"});
  }
};

const updatePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const user_id = req.user._id;
  const user = await User.findById(user_id);
  const hashedPassword = user.password.toString();

  try{
    const isMatch = await comparePasswords(oldPassword, hashedPassword)
    if (isMatch) {
      user.password = newPassword;
      const updatedUser = await user.save();
      res.status(201).json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        token: generateToken(updatedUser._id),
        pic: updatedUser.pic,
      });
    } else {
      res.status(401).json({message: "you entered an incorrect old password"});
    }
  } catch (error) {
    console.log("error: ", error)
    res.status(500).json({message: "something went wrong in the server!"});
  };

  // bcrypt.genSalt(saltRounds, (err, salt) => {
  //   if (err) {
  //     console.log("bcrypt round error", err);
  //     return;
  //   }
  //   bcrypt.hash(oldPassword, salt, async (err, hash) => {
  //     if (err) {
  //       console.log("bcrypt hash error", err);
  //       return;
  //     }
  //     const oldHashedPassword = hash;
  //     const isMatch = await bcrypt.compare(oldHashedPassword, hashedPassword);
  //     console.log("isMatch", hashedPassword);
  //   });
  // });

  // res.status(201).json({
  //   _id: user._id,
  //   name: user.name,
  //   email: user.email,
  //   token: generateToken(user._id),
  //   pic: user.pic,
  // });
  // } else {
  //   throw new Error("the old password you entered doesn't match with the previous one");
  // }
});

module.exports = { registerUser, authUser, editUserProfile, updatePassword };
