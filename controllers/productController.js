const ProductCLTN = require("../models/productSchema");

exports.viewAll = async (req, res) => {
  try {
    const allProducts = await ProductCLTN.find({});
    res.send({ success: true, allProducts: allProducts });
  } catch (error) {
    console.log("Error in fetching all Products");
    res
      .status(401)
      .send({ success: false, message: "Error in Products Fetching" });
  }
};

exports.addProduct = async (req, res) => {
  try {
    const { image, formData, updatedBy } = req.body;

    const productDetails = {
      ...formData,
      image,
      updatedBy,
    };
    const newProduct = new ProductCLTN(productDetails);
    await newProduct.save();
    res.send({ success: true, message: "Product added successfully" });
  } catch (error) {
    console.log("Error in adding new Product : " + error);
    res
      .status(401)
      .send({ success: false, message: "Error in Adding new Product" });
  }
};

exports.editProduct = async (req, res) => {
  try {
    const { formData, updatedBy, image } = req.body;
    const id = formData.id;

    const updatedDetails = {
      ...formData,
      updatedBy: updatedBy,
      image,
    };
    console.log(updatedDetails);

    // properties inside the schema and rest should be the same.
    const updateData = await ProductCLTN.updateOne({ _id: id }, updatedDetails);

    res.send({
      success: true,
      message: "Data updated successfully",
      data: updateData,
    });
  } catch (error) {
    console.log("error in edit Product : " + error);
    res.send({ success: false, message: "Error in Product edit" });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await ProductCLTN.deleteOne({ _id: id });

    res.send({
      success: true,
      message: "Product Deleted Successfully",
    });
  } catch (error) {
    console.log("Error in Delete Product" + error);
    res.send({ success: false, message: "Error in Deleting Product " });
  }
};
