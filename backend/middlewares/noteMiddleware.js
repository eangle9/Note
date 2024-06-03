const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      
      decoded_id = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded_id.id).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("unAuthorized, token failed");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("unAuthorized, no token");
  }
});

module.exports = protect;
