const express = require("express");
const { users: ctrl } = require("../../controllers");
const { joiLoginSchema, joiRegSchema } = require("../../models/user");
const { ctrlWrapper, validation } = require("../../middlewares");
const { auth } = require("../../middlewares");

const router = express.Router();

//реєстрація
router.post("/register", validation(joiRegSchema), ctrlWrapper(ctrl.register));
// логін
router.post("/login", validation(joiLoginSchema), ctrlWrapper(ctrl.login));
// логаут
router.get("/logout", auth, ctrlWrapper(ctrl.logout));
//getCurrentUser
router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));
// авторизація через гугл
router.get("/google", ctrlWrapper(ctrl.googleAuth));
// redirect
router.get("/google-redirect", ctrlWrapper(ctrl.googleRedirect));
// carrent google user
router.post("/google-user", ctrlWrapper(ctrl.getCurrentGoogleUser));

module.exports = router;
