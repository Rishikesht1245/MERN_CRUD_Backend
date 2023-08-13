const AdminCLTN = require("../models/adminSchema");
const ManagerCLTN = require("../models/managerSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ProductCLTN = require("../models/productSchema");

// generate Token : JWt.sign takes payload secret key and expires as arguments
const generateToken = (id, isAdmin) => {
  return jwt.sign({ id, isAdmin }, process.env.JWT_SECRET, { expiresIn: "1d" });
};
// user verification
exports.LoginVerification = async (req, res) => {
  //collecting email password and sent from front end using axios
  const { email, password } = req.body;
  try {
    const adminCheck = await AdminCLTN.findOne({ email: email });
    const managerCheck = await ManagerCLTN.findOne({ email: email });
    if (adminCheck || managerCheck) {
      if (adminCheck) {
        const checkPassword = await bcrypt.compare(
          password,
          adminCheck.password
        );
        if (checkPassword) {
          const token = await generateToken(adminCheck._id, adminCheck.isAdmin);

          // converting mongoose objects into plain javascript object
          const admin = adminCheck.toObject();
          admin.token = token;

          //if user is a authorized user set the cookie and send token in json response (cookies not working so trying state approach )
          res
            .cookie("token", token, {
              path: "/",
              httpOnly: true,
              expires: new Date(Date.now() + 1000 * 86400), // 1 day in milliseconds
              sameSite: "none", // cross site requests enabling
            })
            .status(200)
            .json({ status: "OK", loginDetails: admin });
        } else {
          res.json("incorrectPassword");
        }
      } else {
        const checkPassword = await bcrypt.compare(
          password,
          managerCheck.password
        );
        if (checkPassword) {
          const token = generateToken(managerCheck._id, managerCheck.isAdmin);
          const manager = managerCheck.toObject();
          manager.token = token;
          //if user is a authorized user set the cookie and send token in json response (cookies not working)
          res
            .cookie("token", token, {
              path: "/",
              httpOnly: true,
              expires: new Date(Date.now() + 1000 * 86400), // 1 day in milliseconds
              sameSite: "none", // cross site requests enabling
              secure: false, // sent only through https
            })
            .status(200)
            .json({ status: "OK", loginDetails: manager });
        } else {
          res.json("incorrectPassword");
        }
      }
    } else {
      res.status(400).json("invalidCredentials");
    }
  } catch (error) {
    console.log("Error in Login" + error);
    res.json("error");
  }
};

exports.getHomeData = async (req, res) => {
  try {
    const productCount = await ProductCLTN.countDocuments({});

    const managerCount = await ManagerCLTN.countDocuments({});

    const count = {
      managerCount,
      productCount,
    };

    res.send({ success: true, count: count });
  } catch (error) {
    console.log("Error in Get Home Data :" + error);
    res.send({ success: false, message: "Get Home data failed" });
  }
};
exports.SignUpVerification = async (req, res) => {
  console.log(req.body);
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const data = {
    name: name,
    email: email,
    //     password: hashedPassword,
  };

  try {
    const check = await ManagerCLTN.findOne({ email: email });
    if (check) {
      res.json("exist");
    } else {
      res.json("not exists");
      // saving data in collection
      await ManagerCLTN.insertMany([data]);
    }
  } catch (error) {
    console.log("error in Signup Verification" + error);
  }
};
