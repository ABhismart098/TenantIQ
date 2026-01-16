const express = require("express");
const router = express.Router();

const authMiddleware = require("../../middlewares/auth.middleware"); // ✅ FIX PATH
const approvalController = require("../controllers/approval.controller");


/**
 * @swagger
 * tags:
 *   name: Approvals
 *   description: Account approval workflow
 */

/**
 * @swagger
 * /api/approve/pending:
 *   get:
 *     summary: Get pending approvals (role-based)
 *     tags: [Approvals]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Pending approval list
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 count:
 *                   type: integer
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       user_id:
 *                         type: string
 *                         format: uuid
 *                       email:
 *                         type: string
 *                       role_id:
 *                         type: integer
 *                       created_at:
 *                         type: string
 *       403:
 *         description: Forbidden
 */


/**
 * @swagger
 * /api/approve:
 *   post:
 *     summary: Approve or reject a user
 *     tags: [Approvals]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - target_user_id
 *               - action
 *             properties:
 *               target_user_id:
 *                 type: string
 *                 format: uuid
 *               action:
 *                 type: string
 *                 enum: [APPROVED, REJECTED]
 *               reason:
 *                 type: string
 *     responses:
 *       200:
 *         description: Approval processed
 *       403:
 *         description: Forbidden
 */


module.exports = router;

router.post(
  "/action",
  authMiddleware,               // ✅ MUST be a function
  approvalController.approveUser // ✅ MUST be a function
);

router.get(
  "/pending",
  authMiddleware, // ✅ MUST be a function
  approvalController.listPendingApprovals
);


module.exports = router;
