const ManagerCLTN = require("../models/managerSchema");
const AdminCLTN = require("../models/adminSchema");
const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      res.status(401).json("notAuthorized");
    }
    //verify token : verified will contain id and isAdmin
    const token = authorization.split(" ")[1];
    const { id, isAdmin } = jwt.verify(token, process.env.JWT_SECRET);

    if (isAdmin) {
      const admin = await AdminCLTN.findById(id).select("-password");
      if (!admin) {
        res
          .status(401)
          .json({ success: false, message: "Not authorized, please login" });
      }
      req.user = admin;
      next();
    } else {
      const manager = await ManagerCLTN.findById(id).select("-password");
      if (!manager) {
        res
          .status(401)
          .json({ success: false, message: "Not authorized, please login" });
      }
      req.user = manager;
      next();
    }
  } catch (error) {
    console.log("Error in Authentication check : " + error);
    res
      .status(401)
      .json({ success: false, message: "Not authorized, please login" });
  }
};

module.exports = protect;
