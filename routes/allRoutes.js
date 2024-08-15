import express from "express";
import { createUser } from "../dbOperations/postMethods/createUser.js";
import { test } from "../helper/test.js";
import { createToken } from "../dbOperations/authentication/createToken.js";
import { checkEamilExist } from "../helper/checkEmailExists.js";

// Initialize Router
const router = express.Router();

//---------------------------------- POST Operations ------------------------//

// Create new user
router.post("/create-user", createUser);

//Check if the Email is already in the DB or not [register page data]
router.post("/check-email", checkEamilExist);

// Create token and send with user request
router.post("/jwt", createToken);

// --------------------  Get operations-----------------------------//
//API test
router.get("/test", test);

export default router;
