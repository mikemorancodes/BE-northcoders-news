const router = require("express").Router();
const { getUserByUsername, createUser, validatePassword } = require("../controllers/users");

router.get("/:username", getUserByUsername);

router.get("/:username/:password", validatePassword);

router.post("/", createUser);

module.exports = router;
