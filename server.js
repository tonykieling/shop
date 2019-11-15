const express     = require("express");
const PORT        = process.env.PORT || 3333;
const app         = express();
const morgan      = require("morgan");
const bodyParser  = require("body-parser");
const mongoose    = require("mongoose");

const productRoutes   = require("./api/routes/products.js");
const orderRoutes     = require("./api/routes/orders.js");
const userRoutes      = require("./api/routes/user.js");


// connection to the database regarding the environment variable URI
console.log("process.env.URI_DB", process.env.URI_DB);
mongoose.connect(process.env.URI_DB, { 
  useNewUrlParser: true,
  useUnifiedTopology: true });


// it logs the actions on the screen
app.use(morgan("dev"));


// settings related to boy-parser, which allows extended urlencoder and enables to receive json format
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());


// settings related to CORS
// it allows other clients (other than the SPA provided for this app) access these APIs
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Autorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});


// it handles the root calling
app.get("/", (req, res) => {
  res.send(`This is root "/"`);
});


// it calls products routes - there the HTTP verb is gonna be checked and proceed accordingly
app.use("/products", productRoutes);

// it calls orders routes - there the HTTP verb is gonna be checked and proceed accordingly
app.use("/orders", orderRoutes);

// it calls user routes - there the HTTP verb is gonna be checked and proceed accordingly
app.use("/user", userRoutes);


// the two below functions are designed to handle error
// the first one will be called only if the server could not handle the request by /products. /orders or /user middlewares
// the second one is just to practice how to call a next function
//   p.s. when dealing error message, it has to have 4 parameters (error, req, res, next)
app.use((req, res, next) => {
  const error = new Error("Route NOT found!!");
  error.status = 400;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500).send(error.message);
});


app.listen(PORT, () => console.log(`Server is running at ${PORT}`));

