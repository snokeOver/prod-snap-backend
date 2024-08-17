import express from "express";
import { createUser } from "../dbOperations/postMethods/createUser.js";
import { test } from "../helper/test.js";
import { createToken } from "../dbOperations/authentication/createToken.js";
import { checkEamilExist } from "../helper/checkEmailExists.js";
import { getFeaturedMobile } from "../dbOperations/getMethods/getFeaturedMobile.js";
import { getSingleMobile } from "../dbOperations/getMethods/getSingleMobile.js";
import { getAllMobileData } from "../dbOperations/getMethods/getAllMobileData.js";
import { verifyToken } from "../dbOperations/authentication/verifyToken.js";
import { verifyUser } from "../dbOperations/authentication/verifyUser.js";

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

//Get the featured mobile data : 6 latest mobile
router.get("/featured-mobile", getFeaturedMobile);

//Get a single mobile data
router.get("/single-mobile/:uid", verifyToken, verifyUser, getSingleMobile);

//Get all mobile data with search and filter
router.get("/all-mobiles/:uid", verifyToken, verifyUser, getAllMobileData);

export default router;
