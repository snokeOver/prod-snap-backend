import errorHandler from "../../helper/errorHandler.js";
import UserModel from "../../schemas/userSchema.js";

export const verifyUser = async (req, res, next) => {
  try {
    const foundUser = await UserModel.findOne({
      userId: req.decoded.uid,
    });
    if (foundUser.userRole !== "User") {
      return res.status(403).send({ message: "Forbidden Access" });
    } else {
      next();
    }
  } catch (err) {
    errorHandler(err, res);
  }
};
