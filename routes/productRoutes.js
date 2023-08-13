const express = require("express");
const router = express.Router();
const Product = require("../controllers/productController");
const authCheck = require("../middlewares/authCheck");

//fetching all the products
router.get("/", Product.viewAll);

// add new product
router.post("/add-product", authCheck, Product.addProduct);

// edit existing Product
router.put("/edit-product", authCheck, Product.editProduct);

// delete product
router.delete("/delete-product/:id", authCheck, Product.deleteProduct);

module.exports = router;
