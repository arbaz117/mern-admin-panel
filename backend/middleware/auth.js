const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json("Access denied ❌ (no token)");
  }

  const token = authHeader.split(" ")[1];

  try {
    const verified = jwt.verify(token, "secretkey");
    req.user = verified; // { id, role }
    next();
  } catch (err) {
    res.status(400).json("Invalid token ❌");
  }
};

module.exports = verifyToken;