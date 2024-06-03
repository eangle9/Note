const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userShema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    pic: {
      type: String,
      required: true,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
  },
  {
    timestamps: true,
  }
);

userShema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) {
    next();
  }

  try {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;
    next();
  } catch (error) {
    res.status(400);
    throw new Error("something went wrong when bcrypt the password");
  }
});

userShema.methods.matchPassword = async function (enteredPassword) {
    const isMatch = await bcrypt.compare(enteredPassword, this.password);
    return isMatch;
};

const User = mongoose.model("User", userShema);

module.exports = User;
