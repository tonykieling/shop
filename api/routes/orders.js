const express   = require("express");
const router    = express.Router();

const mongoose  = require("mongoose");
const Order     = require("../models/order.js");
const Product   = require("../models/product.js");

// it returns info about all orders
router.get("/", async (req, res) => {
  try {
    mongoose.set('debug', true);
    const docs = await Order
      .find()
      .select('_id productId quantity')
      .populate('productId', 'name');

    
    res.status(200).json({ 
      Count   : docs.length,
      orders  : docs.map(doc => {
        return({
          OrderId   : doc._id,
          ProductId : doc.productId,
          Qtd       : doc.quantity,
          request   : {
            type  : "GET",
            url   : `http://localhost:3333/orders/${doc._id}`
          }
        });
      })
    });
  } catch (err) {
    console.trace("Error => ", err.message);
    res.status(500).json({
      error: "Something bad"
    });
  }
});


// creation order function
router.post("/", async (req, res) => {
  const productId = req.body.productId;
  const quantity  = req.body.quantity;

  //before save an order, need to check if the product ordered exists
  try {
    const product = await Product
      .find({_id : productId});

    if (product.length < 1)
      return res.json({
        error: "Product is invalid"
      })
  } catch (err) {
    console.trace("Error => ", err.message);
    return res.status(500).json({ 
      error: "Something VERY bad"
    });
  }

  try {
    const order = new Order ({
      _id: mongoose.Types.ObjectId(),
      productId,
      quantity
    });
    
    await order.save();

    res.status(201).json({
      message: "Order created",
      order
    });
  } catch (err) {
    console.trace("Error => ", err.message);
    res.status(500).json({ 
      error: "Something bad"
    });
  }
});


// it returns info about a specific order
router.get("/:orderId", async (req, res) => {
  const id = req.params.orderId;

  try {
    mongoose.set('debug', true);
    const order = await Order
      .find({ _id: id})
      .select(" _id productId quantity")
      .populate("productId", "name");

    res.json({
      id        : order[0]._id,
      productId : order[0].productId,
      quantity  : order[0].quantity,
      request: {
        type  : "GET",
        url   : `http://localhost:3333/orders/${order._id}`
      }
    });
  } catch (err) {
    console.trace("Error => ", err.message);
    res.status(500).json({ 
      error: "Something bad!!"
    });
  }
});


// it updatess a specific order
router.patch("/:orderID", (req, res) => {
  console.log(`# orders/PATCH :orderId`);
  const id = Number(req.params.orderID);
  res.send(`Order ${id} has been updated`);
});


// it deletes a specific order
router.delete("/:orderID", async (req, res) => {
  const id = req.params.orderID;

  try {
    const deleteOrder = await Order.deleteOne({_id: id});

    if (deleteOrder.deletedCount)
      return res.status(200).json({
        message: `Order ${id} has been deleted`
      });
    else
      return res.json({
        message: `Order ${id} has already been deleted`
      });
  } catch (err) {
    console.trace("Error => ", err.message);
    res.status(404).json({
      error: `Something bad with id - ${id}`
    })
  }

});

module.exports = router;