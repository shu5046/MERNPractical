const express = require("express");
const app = express();

require("dotenv").config();
const cors = require("cors");
const profileController = require("./controllers/profileController");
const loginController = require("./controllers/loginController");
const productsController = require("./controllers/productsController");
const verifyToken = require('./middlewares/verifyToken')
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.post("/login",loginController.login);
app.get("/products",verifyToken,productsController.getProducts);
app.get("/profile",verifyToken,profileController.profile);

app.listen(5000, () => {
  console.log(`Server is listening to port 5000`);
});
