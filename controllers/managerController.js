const ManagerCLTN = require("../models/managerSchema");

//All Managers
// "http://localhost:5000/managers"
exports.viewALL = async (req, res) => {
  try {
    const data = await ManagerCLTN.find({});
    res.send({ success: true, data: data });
  } catch (error) {
    console.log(error);
  }
};

// add-manager
// "http://localhost:5000/managers/add-manager"
exports.addManager = async (req, res) => {
  try {
    console.log(req.body);
    const managerCheck = await ManagerCLTN.findOne({ email: req.body.email });
    if (managerCheck) {
      res.send({ success: false, message: "Manager already exists!" });
    } else {
      //save manager to DB
      const data = new ManagerCLTN(req.body);
      await data.save();

      res.send({
        success: true,
        message: "Data added successfully",
        data: data,
      });
    }
  } catch (error) {
    console.log("Error in Adding Manager : " + error);
    res.send({ success: false, message: "Error in data save" });
  }
};

// edit-manager
// "http://localhost:5000/managers/edit-manager"
exports.editManager = async (req, res) => {
  try {
    const { id, ...rest } = req.body;

    const data = await ManagerCLTN.updateOne({ _id: id }, rest);
    console.log(data);

    res.send({
      success: true,
      message: "Data updated successfully",
      data: data,
    });
  } catch (error) {
    console.log("error in edit manager : " + error);
    res.send({ success: false, message: "error in data edit" });
  }
};

// delete-manager
// "http://localhost:5000/managers/delete/id"
exports.deleteManager = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await ManagerCLTN.deleteOne({ _id: id });

    res.send({
      success: true,
      message: "Data deleted successfully",
      data: data,
    });
  } catch (error) {
    console.log("Error in deleting Manager : " + error);
    res.send({ success: false, message: "error in data deletion" });
  }
};
