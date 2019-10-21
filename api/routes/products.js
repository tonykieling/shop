const express   = require("express");
const router    = express.Router();

const checkAuth = require("../middleware/check-auth.js")  // it calls the middleware which checks if user's autorized
const mongoose  = require("mongoose");
const Product   = require("../models/product.js");

// list of all products
router.get("/", async (req, res) => {
  try {
    const allProducts = await Product
      .find()
      .select("_id name price");

    res.json({"count": allProducts.length, allProducts});
  } catch (error) {
    console.trace("Error => ", err.message);
    res.status(500).json({ 
      error: error.message 
    });
  }
});


// creation product function
router.post("/", checkAuth, async (req, res) => {
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price
  });

  try {
    const addProduct = await product.save();
    res.status(201).json(addProduct);
  } catch (err) {
    console.trace("Error => ", err.message);
    res.status(500).json({ 
      error: "Something wrong happend" 
    });
  }
});


// it returns info about a specific product
router.get("/:productID", async (req, res) => {
  const id = req.params.productID;

  try {
    const productInfo = await Product
      .findById(id)
      .select("_id name price");

    res.status(200).json(productInfo);
  } catch (err) {
    console.trace("Error => ", err.message);
    res.status(500).json({
      error: "Invalid id"
    });
  }

});


// it changes a specific product
router.patch("/:productID", checkAuth, async (req, res) => {
  const id = req.params.productID;

  try {
    const result = await Product.updateOne({
       _id: id
      }, {
        $set: {
          name: req.body.name,
          price: req.body.price
        }
      });
    
    if (result.nModified) {
      const newProduct = await Product
        .find({_id: id})
        .select(" _id name price");

      return res.json(newProduct);
    } else
      res.json({
        error: `Product ${id} has NOT been updated`
      });
  } catch (err) {
    console.trace("Error => ", err.message);
    res.json({
      error: "Error Update"
    });
  }
});


// it deletes a specific product
router.delete("/:productId", checkAuth, async (req, res) => {
  console.log("inside DELETE PRODUCT");
  const productId = req.params.productId;

  const productToBeDeleted = await Product.findById(productId);
  if (!productToBeDeleted || productToBeDeleted.length < 1)
    return res.status(409).json({
      error: "Product not found"
    });
  
  else {
    try {
      const result = await Product.deleteOne({_id: productId});

      if (result.deletedCount)
        return res.status(200).json({
          message: `Product ${productId} has been deleted`
        });
      else
        return res.json({
          message: `Product ${productId} has already been deleted`
        });
    } catch (err) {
      console.trace("Error => ", err.message);
      res.status(404).json({
        error: `Something bad with id - ${id}`
      })
    }
  }
});

module.exports = router;