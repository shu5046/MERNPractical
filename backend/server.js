const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
require("dotenv").config();
const products = require('./products.json')
const users = [];

app.use(express.json());

//controllers
app.post("/register", (req, res) => {
  const { email, password } = req.body;
  const exists = users.find((u) => u.email === email);
  if (exists)
    return res.status(400).json({
      message: "User already exists",
    });
  users.push({ email, password });
  res.status(201).json({
    message: "User regitered",
  });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const exists = users.find((u) => u.email === email);
  if (!exists)
    return res.status(400).json({
      message: "Invalid",
    });
  const isMatch = users.find((u) => u.password === password);
  if (!isMatch)
    return res.status(400).json({
      message: "Invalid",
    });
  const token = jwt.sign({ email: exists.email }, process.env.jwt_secret, {
    expiresIn: "1h",
  });
  res.json({
    message: "Login successful",
    token: token,
  });
});

app.get("/products",verifyToken,(req,res)=>{
     const { category } = req.query;
    if (category) {
    const lowerCat = category.toLowerCase();
    products = products.filter((p) => p.category.toLowerCase() === lowerCat);
  }
})
function verifyToken(req, res, next) {
  const authHeaders = req.headers.authrization;
  if (!authHeaders)
    return res.status(401).json({
      message: "NO token ",
    });
  const token = authHeaders.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = user;
    next();
  });
}

app.listen(5000, () => {
  console.log(`Server is listening to port 5000`);
});
