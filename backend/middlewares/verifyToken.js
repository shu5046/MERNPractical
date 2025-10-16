const jwt = require("jsonwebtoken");
function verifyToken(req, res, next) {
  const authHeaders = req.headers.authorization;
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

module.exports = verifyToken;
