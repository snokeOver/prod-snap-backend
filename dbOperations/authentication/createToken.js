import errorHandler from "../../helper/errorHandler.js";
import UserModel from "../../schemas/userSchema.js";

import jwt from "jsonwebtoken";

export const createToken = async (req, res) => {
  const jwtSecret = process.env.JWT_SECRET;

  try {
    const payload = req.body;
    if (!payload) {
      return res.status(400).send({ message: "Payload is required" });
    }

    // get the user details
    const userDetails = await UserModel.findOne({ userId: req.body.uid });

    const token = jwt.sign(payload, jwtSecret, { expiresIn: "10h" });
    res.status(200).send({ token, userDetails });
  } catch (err) {
    errorHandler(err, res);
  }
};
