import errorHandler from "../../helper/errorHandler.js";
import MobileModel from "../../schemas/mobileSchema.js";

export const getFeaturedMobile = async (req, res, next) => {
  try {
    const response = await MobileModel.find({})
      .sort({ createdAt: -1 }) // Sort by `createdAt` field in descending order
      .limit(6); // Limit the result to six documents

    res.status(200).send({
      message: "Featured 6 mobile data retrieved successfully!",
      response,
    });
  } catch (err) {
    errorHandler(err, res);
  }
};
