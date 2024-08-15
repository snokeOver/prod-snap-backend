import UserModel from "../../shcemas/userSchema.js";
import errorHandler from "../helper/errorHandler.js";

export const verifySurveyorOrAdmin = async (req, res, next) => {
  try {
    const foundUser = await UserModel.findOne({
      userId: req.decoded.uid,
    });
    if (foundUser.userRole !== "Surveyor" && foundUser.userRole !== "Admin") {
      // console.log("Found user:", foundUser.userRole);
      return res.status(403).send({ message: "Forbidden Access" });
    } else {
      next();
    }
  } catch (err) {
    errorHandler(err, res);
  }
};
