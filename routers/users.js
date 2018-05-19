const router = require("express").Router();
const { getUserByUsername, createUser } = require("../controllers/users");

router.get("/:username", getUserByUsername);

router.post('/', createUser);

module.exports = router;
