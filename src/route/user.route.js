const express = require("express");
const router = express("router");

const {
	registerUser,
	showUsers,
	findUser,
	updateUser,
	deleteUser,
} = require("../controller/user.controller");

router.post("/user/register", registerUser);
router.get("/user/show", showUsers);
router.get("/user/:id", findUser);
router.put("/user/:id", updateUser);
router.delete("/user/:id", deleteUser);

module.exports = router;
