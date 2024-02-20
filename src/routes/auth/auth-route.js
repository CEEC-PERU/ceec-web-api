const { Router } = require("express");
const { body } = require("express-validator");
const authController = require("../../controllers/auth/auth-controller");

const router = Router();

router.post("/signin", [
    body('email').isEmail(),
    body('password').isLength({ min: 6 })
], authController.authUser);

module.exports = router;
