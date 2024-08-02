const jwt = require("jsonwebtoken");

const validateToken = async (req, res, next) => {
  let authHeader = req.headers.Authorization || req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    let token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SERCET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "User is not authorized" });
      }
      req.user = decoded.user;
      next();
    });
  } else {
    return res.status(401).json({ message: "Token is missing or invalid" });
  }
};

module.exports = validateToken;
