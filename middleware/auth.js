const jwt = require("jsonwebtoken");

const config = process.env;


const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"]
  const token = authHeader && authHeader.split(' ')[1]
  console.log(token)
  if (!token) {
    return res.status(403).send({
      error: true,
      message: "A token is required for authentication"
    });
  }
  try { 
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send({
      error: true,
      message: "Invalid Token"
    });
  }
  return next();
};


module.exports = verifyToken;