const jwt = require("jsonwebtoken");

const jwtAuthMiddleware = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: "please e provide a token" });
  }
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, "secretKey");
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

const genrateToken = (user) => {
  const token = jwt.sign(user, "secretKey", { expiresIn: "1h" });
  return token;
};

module.exports = { jwtAuthMiddleware, genrateToken };
