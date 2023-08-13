const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const nocache = require("nocache");
// used to parse req.body
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
//Cross Origin Resource Sharing : enables frontend to communicate with backend
const cors = require("cors");

const morgan = require("morgan");

const app = express();

//======================== Middle wares ========================//
// for handling the data coming through url
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());
app.use(nocache());
app.use(morgan("tiny"));

// cross origin set up
// app.use(
//   cors({
//     origin: ["http://localhost:3000"],
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//   })
// );

app.use(cors());

// //  ============  setting up credentials in server to access cookies ======//
// app.use(function (req, res, next) {
//   res.header("Content-Type", "application/json;charset=UTF-8");
//   res.header("Access-Control-Allow-Credentials", true);
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

//=========================  Routes ============================//
const adminRoutes = require("./routes/adminRoutes");
app.use("/", adminRoutes);

const productRoutes = require("./routes/productRoutes");
app.use("/products", productRoutes);

// ============ connect to mongoDB and start server ===========//
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => console.log(error));
