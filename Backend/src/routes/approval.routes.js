const express = require("express");
const router = express.Router();

const authMiddleware = require("../../middlewares/auth.middleware");
const approvalController = require("../controllers/approval.controller");

/**
 * @swagger
 * tags:
 *   name: Approval
 *   description: User & role-based approval workflow
 */

/**
 * @swagger
 * /approve/action:
 *   post:
 *     summary: Approve or reject a user account
 *     description: |
 *       Role-based approval rules:
 *       - Tenant → Owner / Property Manager
 *       - Property Manager → Owner / Admin
 *       - Owner → Admin only
 *       - Admin → Active Admin only
 *     tags: [Approval]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ApproveRequestDTO'
 *     responses:
 *       200:
 *         description: Approval processed successfully
 *       401:
 *         description: Unauthorized (token missing/invalid)
 *       403:
 *         description: Forbidden (no permission)
 */
router.post(
  "/action",
  authMiddleware,
  approvalController.approveUser
);

module.exports = router;
