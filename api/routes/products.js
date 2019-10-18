const express = require("express");
const router = express.Router();

// list of all products
router.get("/", (req, res) => {
  console.log("# products/GET ", new Date());
  res.send("GET /products");
});


// creation product function
router.post("/", (req, res) => {
  const product = {
    name  : req.body.name,
    price : req.body.price
  };

  res.status(201).send(`Product ${product.name}, $${product.price}, has been created`);
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