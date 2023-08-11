const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
// used to parse req.body
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
//Cross Origin Resource Sharing : enables frontend to communicate with backend
const cors = require("cors");

const app = express();

//======================== Middle wares ========================//
// for handling the data coming through url
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());

//=========================  Routes ============================//
const adminRoutes = require("./routes/adminRoutes");
app.use("/", adminRoutes);

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
