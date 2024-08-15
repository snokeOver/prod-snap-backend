import UserModel from "../../shcemas/userSchema.js";
import errorHandler from "../helper/errorHandler.js";

export const verifySurveyor = async (req, res, next) => {
  console.log("surveyor");
  try {
    const foundUser = await UserModel.findOne({
      userId: req.decoded.uid,
    });
    if (foundUser.userRole !== "Surveyor") {
      return res.status(403).send({ message: "Forbidden Access" });
    } else {
      next();
    }
  } catch (err) {
    errorHandler(err, res);
  }
};
