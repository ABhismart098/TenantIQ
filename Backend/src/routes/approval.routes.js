const express = require("express");
const router = express.Router();

const authMiddleware = require("../../middlewares/auth.middleware"); // ✅ FIX PATH
const approvalController = require("../controllers/approval.controller");

/**
 * @swagger
 * tags:
 *   name: Approval
 *   description: User & role-based approval workflow
 */

/**
 * @swagger
 * /api/approve/action:
 *   post:
 *     summary: Approve or reject a user account
 *     description: |
 *       Role-based approval rules:
 *       - Tenant → Owner / Property Manager
 *       - Property Manager → Owner / Admin
 *       - Owner → Active Admin only
 *       - Admin → Active Admin only
 *     tags: [Approval]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ApproveRequest'
 *     responses:
 *       200:
 *         description: Approval processed successfully
 *       401:
 *         description: Unauthorized (token missing or invalid)
 *       403:
 *         description: Forbidden (no permission)
 */
router.post(
  "/action",
  authMiddleware,               // ✅ MUST be a function
  approvalController.approveUser // ✅ MUST be a function
);

module.exports = router;
