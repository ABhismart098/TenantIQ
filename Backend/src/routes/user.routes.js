const express = require("express");
const router = express.Router();

const authMiddleware = require("../../middlewares/auth.middleware");
const roleMiddleware = require("../../middlewares/role.middleware");
const userController = require("../controllers/user.controller");

/**
 * ADMIN DASHBOARD (example protected route)
 */
router.get(
  "/admin-dashboard",
  authMiddleware,
  roleMiddleware(1), // ADMIN only
  (req, res) => {
    res.json({
      success: true,
      message: "Welcome Admin",
      user: req.user
    });
  }
);

/**
 * ENABLE / DISABLE USER
 * Only ADMIN / OWNER (based on your rule)
 */
router.patch(
  "/users/:userId/status",
  authMiddleware,
  roleMiddleware(1, 4), // ADMIN, OWNER
  userController.updateUserStatus
);

module.exports = router;
