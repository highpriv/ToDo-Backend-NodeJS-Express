const jwt = require("jsonwebtoken");
const config = require("../config/authentication");

checkToken = (req, res, next) => {
  let token = req.session.token;

  if (!token) {
    return res.status(403).send({ message: "Token is required!" });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    next();
  });
};

const jwtAuth = {
  checkToken,
};
module.exports = jwtAuth;
