const jwt = require("jsonwebtoken");
const auhConfigs = require("../configs/auth.config");

exports.verifytoken = (req, res, next) => {
  const token = req.headers["access-token"];
  if (!token) {
    return res.status(403).send({
      message: "Token not provided",
    });
  }

  jwt.verify(token, auhConfigs.SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Please login first to access this endpoint!",
      });
    }
    req.id = decoded.id;
    next();
  });
};
