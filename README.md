# shop
This project is aimed to practice:
- concepts such as RESTful and MVC
- Javascript/Node
- Express, middleware and routes
- MongoDB and Mongoose
- Authentication, Bcrypt and JWT.

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

Dependencies:
  - express
  - nodemon
  - body-parser
  - morgan
  - mongoose
  - bcrypt
  - jsonwebtoken

  *p.s.1: the database used is hosted at Atlas MongoDB*  
  *p.s.2: the client side was executed using Postman*

  How to install:  
  `# git clone https://github.com/tonykieling/shop.git .`  
  `# npm i`  
  `# npm start`    

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