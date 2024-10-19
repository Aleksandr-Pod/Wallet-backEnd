const express = require("express");
const { users: ctrl } = require("../../controllers");
const { joiLoginSchema, joiRegSchema } = require("../../models/user");
const { ctrlWrapper, validation } = require("../../middlewares");
const { auth } = require("../../middlewares");

const router = express.Router();

router.post("/register", validation(joiRegSchema), ctrlWrapper(ctrl.register));
router.post("/login", validation(joiLoginSchema), ctrlWrapper(ctrl.login));
router.get("/logout", auth, ctrlWrapper(ctrl.logout));
router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));
// авторизація через гугл
router.get("/google", ctrlWrapper(ctrl.googleAuth));
router.get("/google-redirect", ctrlWrapper(ctrl.googleRedirect));
router.post("/google-user", ctrlWrapper(ctrl.getCurrentGoogleUser));

module.exports = router;
