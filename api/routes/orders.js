const express = require("express");
const router = express.Router();

// list of all products
router.get("/", (req, res, next) => {
  console.log("# orders/GET ", new Date());
  res.send("GET /orders");
});


// creation order function
router.post("/", (req, res, next) => {
  const order = {
    productId: req.body.productId,
    quantd: req.body.qtd
  };

  res.status(201).json({
    message: "Order created",
    order
  });
});


// it returns info about a specific order
router.get("/:orderID", (req, res) => {
  console.log(`# orders/GET :orderId`);
  const id = Number(req.params.orderID);

  if (isNaN(id))
    res.send("Please, only numbers");
  else
    res.json({
      message: `orderID is ${id}`
    });
});


// it updatess a specific order
router.patch("/:orderID", (req, res) => {
  console.log(`# orders/PATCH :orderId`);
  const id = Number(req.params.orderID);
  res.send(`Order ${id} has been updated`);
});


// it deletes a specific order
router.delete("/:orderID", (req, res) => {
  console.log(`# orders/DELETE :orderId`);
  const id = Number(req.params.orderID);
  res.send(`Order ${id} has been deleted`);
});

module.exports = router;