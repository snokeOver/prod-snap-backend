import errorHandler from "../../helper/errorHandler.js";
import MobileModel from "../../schemas/mobileSchema.js";

export const getSingleMobile = async (req, res, next) => {
  try {
    const response = await MobileModel.findById(req.query.dataId);

    res.status(200).send({
      message: "mobile data retrieved successfully!",
      response,
    });
  } catch (err) {
    errorHandler(err, res);
  }
};
