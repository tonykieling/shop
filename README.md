# shop
This project is aimed to practice:
- concepts such as RESTful and MVC
- Javascript/Node
- Express, middleware and routes
- MongoDB and Mongoose
- Authentication, Bcrypt and JWT.   

It was based on https://www.youtube.com/watch?v=0oXYLzuucwE.

Basically it is composed by:  
- server.js - it is the main file that hosts the server (listening at 3333 port).
- package.json - it holds the dependencies and configurations.
- nodemon.json - this file can be used to set the environment variables.
- api directory has  
a) controllers: resposanble for the logic implementation  
b) middleware: contains the function to protect the routes  
c) models: has the database models  
d) routes: aggregates the set of routes for a particular context, such as user, product and orders.  

It is backend and database parts of a system which is possible
- Signup a user
- Sign the user
- Insert Products,
- Get info,
- Modify, and
- Delete them
- Create Orders
- Check, and
- Delete them

**Dependencies:**
  - express
  - nodemon
  - body-parser
  - morgan
  - mongoose
  - bcrypt
  - jsonwebtoken

  *p.s.1: the database used is MongoDB and its connections settings are based on nodemon.js file.*  
  *p.s.2: the nodemon.js file has the following variables.*  
    "URI_DB" - which is the database path with password within it  
    "JWT_KEY" - the key used by JWT  
    "JWT_expiration" - JWT expiration time  
  *p.s.3: the client side was executed using Postman.*

  **How to install:**  
  `# git clone https://github.com/tonykieling/shop.git .`  
  `# npm i`  
  `# npm start`    

  **How to use:**  
  On Postman, use http://localhost:3333 plus HTTP methods 
  - GET:  
  /             => It is the service's root  
  /products     => It shows all products  
  /procusts/id  => It shows data about a particular products  
  /orders       => It lists all orders for a especific logged user  
  /orders/id    => Same as above regarding a particular order  

  - POST:  
  /products => It inserts data about a product  
  /orders => It inserts data about a product  

  - PATCH:  
  /product/id   =>  
  /orders/id    =>  
  /user/id      =>  

  - DELETE:  
  /product/id   =>  
  /orders/id    =>
  /user/id      => 