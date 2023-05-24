const authorization = (permittedrole) => {
    return async (req, res, next) => {
      const email = req.body.email;
      const user = await UserModel.findOne({ email: email });
      const role = user.role;
  
      if (permittedrole.includes(role)) {
        next();
      } else {
        res.send("Not authorised");
      }
    };
  };
  
  module.exports = {
    authorization,
  };
  