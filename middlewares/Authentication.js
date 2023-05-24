const jwt = require("jsonwebtoken");
require("dotenv").config();

const authentication = (req, res, next) => {
  if (!req.headers.authorization) {
    res.send("please login");
  } else {
    const token = req.headers.authorization.split(" ")[1];

    jwt.verify(token, process.env.secret, function (err, decoded) {
      console.log("authentication", decoded);
      if (err) {
        res.send("please login");
      } else {
        req.body.userId = decoded.userId;
        req.body.email = decoded.email;
        next();
      }
    });
  }
};

module.exports = {
  authentication,
};
