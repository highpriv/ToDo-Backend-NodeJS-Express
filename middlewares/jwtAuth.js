const jwt = require("jsonwebtoken");
const config = require("../config/authentication");

checkToken = (req, res, next) => {
  console.log(req.body);
  let token = req.body.token;

  if (!token) {
    return res.status(403).send({ message: "Token is required!" });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    return res.status(200).send({ message: "OK!", status: 200 });
    next();
  });
};

const jwtAuth = {
  checkToken,
};
module.exports = jwtAuth;
