import UserModel from "../../shcemas/userSchema.js";
import errorHandler from "../helper/errorHandler.js";

export const verifyAdmin = async (req, res, next) => {
  try {
    const foundUser = await UserModel.findOne({
      userId: req.decoded.uid,
    });
    if (foundUser.userRole !== "Admin") {
      return res.status(403).send({ message: "Forbidden Access" });
    } else {
      next();
    }
  } catch (err) {
    errorHandler(err, res);
  }
};
