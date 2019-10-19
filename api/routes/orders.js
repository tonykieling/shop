const express   = require("express");
const router    = express.Router();

const mongoose  = require("mongoose");
const Order     = require("../models/order.js");


// creation order function
router.post("/", async (req, res) => {
  try {
    const order = new Order ({
      _id: mongoose.Types.ObjectId(),
      productId: req.body.productId,
      quantity: req.body.quantity
    });
    
    await order.save();

    res.status(201).json({
      message: "Order created",
      order
    });
  } catch (err) {
    console.trace("Error => ", err.message);
    res.status(500).json({ msg: "Something bad"});
  }
});


// it returns info about all orders
router.get("/", async (req, res) => {
  try {
      const order = await Order
        .find()
        .select("_id productId quantity");
      
      res.status(200).json({ Count: order.length, order});
  } catch (err) {
    console.trace("Error => ", err.message);
    res.status(500).json({ msg: "Something bad"});
  }
});


// it returns info about a specific order
router.get("/:orderID", async (req, res) => {
  const id = req.params.orderID;

  try {
    const order = await Order
      .find({ _id: id})
      .select(" _id productId quantity");
    
    console.log("order: ", order);
    res.json(order);
  } catch (err) {
    console.trace("Error => ", err.message);
    res.status(500).json({ msg: "Something bad!!"});
  }
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