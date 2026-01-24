const express = require("express");
const router = express.Router();

const authMiddleware = require("../../middlewares/auth.middleware");
const roleMiddleware = require("../../middlewares/role.middleware");
const userController = require("../controllers/user.controller");

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User management & administration APIs
 */

/**
 * @swagger
 * /api/users/admin-dashboard:
 *   get:
 *     summary: Admin dashboard
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Admin access granted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Welcome Admin
 *                 user:
 *                   type: object
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (non-admin user)
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
 * @swagger
 * /api/users/{target_user_id}/status:
 *   patch:
 *     summary: Enable or Disable a user account
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: target_user_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Target user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - action
 *             properties:
 *               action:
 *                 type: string
 *                 enum: [ENABLED, DISABLED]
 *               reason:
 *                 type: string
 *                 example: Policy violation or inactivity
 *     responses:
 *       200:
 *         description: User status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: User disabled successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     user_id:
 *                       type: string
 *                       format: uuid
 *                     status:
 *                       type: string
 *                       example: DISABLED
 *                     log_id:
 *                       type: string
 *                       format: uuid
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (role not allowed)
 *       404:
 *         description: Target user not found
 */
router.patch(
  "/:target_user_id/status",
  authMiddleware,
  roleMiddleware(1, 4), // ADMIN, OWNER
  userController.updateUserStatus
);

module.exports = router;
