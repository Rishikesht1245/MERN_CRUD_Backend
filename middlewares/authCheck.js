const ManagerCLTN = require("../models/managerSchema");
const AdminCLTN = require("../models/adminSchema");
const jwt = require("jsonwebtoken");

const protect = async (req, res) => {
  console.log("Reached Protect");
  try {
    console.log(req.cookies); // undefined
    const token = req.cookies.token;
    if (!token) {
      res.status(401).json("notAuthorized");
    }

    //verify token : verified will contain id and isAdmin
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    if (isAdmin) {
      const admin = await AdminCLTN.fingById(verified.id).select("-password");
      if (!admin) {
        req.status(401).json("Admin not found");
      }
      req.user = admin;
      next();
    } else {
      const manager = await ManagerCLTN.findById(verified.id).select(
        "-password"
      );
      if (!manager) {
        req.status(401).json("Manager not found");
      }
      req.user = manager;
      next();
    }
  } catch (error) {
    console.log("Error in Authentication check : " + error);
    res.status(401).json("Not authorized, please login");
  }
};

module.exports = protect;
