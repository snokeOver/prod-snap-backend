import errorHandler from "../../helper/errorHandler.js";
import UserModel from "../../schemas/userSchema.js";

export const createUser = async (req, res, next) => {
  const userToSave = {
    userRole: req.body.role,
    userId: req.body.uid,
    email: req.body.email,
    name: req.body.name,
  };

  try {
    // Check if user already exists
    const existingUser = await UserModel.findOne({
      $or: [{ userId: userToSave.userId }, { email: userToSave.email }],
    });

    let savedUser;
    // Save new user
    if (!existingUser) {
      const user = new UserModel(userToSave);
      savedUser = await user.save();
    }

    res.status(200).send({
      message: "User created successfully!",
      savedUser,
    });
  } catch (err) {
    errorHandler(err, res);
  }
};
