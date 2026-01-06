const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");

router.get(
  "/admin-dashboard",
  authMiddleware,
  roleMiddleware(1), // admin only
  (req, res) => {
    res.json({
      success: true,
      message: "Welcome Admin",
      user: req.user
    });
  }
);

module.exports = router;
