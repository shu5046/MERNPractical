const jwt = require("jsonwebtoken");


const users = [
  { email: "test@scaleboard.com", password: "1234", role: "employee" },
];

exports.login = (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email && u.password === password);
  if (!user)
    return res.status(400).json({
      message: "Invalid",
    });

  const token = jwt.sign({ email: user.email }, process.env.jwt_secret, {
    expiresIn: "1h",
  });
  res.json({
    message: "Login successful",
    token: token,
  });
};
