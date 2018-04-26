const router = require("express").Router();
const { getUserByUsername } = require("../controllers/users");

router.get("/:username", getUserByUsername);

module.exports = router;
