const express   = require("express");
const router    = express.Router();

const mongoose  = require("mongoose");
const Product   = require("../models/product.js");

// list of all products
router.get("/", async (req, res) => {
  try {
    const allProducts = await Product.find({});
    return res.json(allProducts);
  } catch (error) {
    console.trace("error => ", error.message);
    return res.send(error.message);
  }
});


// creation product function
router.post("/", async (req, res) => {
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: Number(req.body.price)
  });

  try {
    const addProduct = await product.save();
    console.log("addProduct => ", addProduct);
    return res.status(201).send(`Product ${product.name}, $${product.price}, has been created`);
  } catch (error) {
    console.trace(error.message);
    return res.status(300).send("Something wrong happend");
  }
});


// it returns info about a specific product
router.get("/:productID", (req, res) => {
  console.log(`# products/GET :productId`);
  const id = Number(req.params.productID);

  if (isNaN(id))
    res.send("Please, only numbers");
  else
    res.json({
      message: `productID is ${id}`
    });
});


// it updatess a specific product
router.patch("/:productID", (req, res) => {
  console.log(`# products/PATCH :productId`);
  const id = Number(req.params.productID);
  res.send(`Product ${id} has been updated`);
});


// it deletes a specific product
router.delete("/:productID", (req, res) => {
  console.log(`# products/DELETE :productId`);
  const id = Number(req.params.productID);
  res.send(`Product ${id} has been deleted`);
});

module.exports = router;