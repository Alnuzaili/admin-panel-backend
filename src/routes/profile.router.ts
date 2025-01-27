import express from 'express';
import * as ProfileController from '../controllers/profile.controller';
import { protectAuth } from '../middleware/auth-middleware';
const router = express.Router();

// Acess : Private
// GET : profile information ( fullName , username , email )
/**
 * @swagger
 * /profile:
 *   get:
 *     summary: Get user profile
 *     description: Fetches the profile of the authenticated user.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Profile details (fullName, username, email)
 *       401:
 *         description: Unauthorized, token is missing or invalid
 */
router.get('/', protectAuth, ProfileController.getUserProfile);

// Acess : Private
// PUT : Change profile information
// Params body : fullName , username , password , email
/**
 * @swagger
 * /profile:
 *   put:
 *     summary: Update user profile
 *     description: Updates the authenticated user's profile.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *                 example: "John Doe"
 *               username:
 *                 type: string
 *                 example: "john_doe"
 *               email:
 *                 type: string
 *                 example: "john_doe@example.com"
 *               password:
 *                 type: string
 *                 example: "newpassword123"
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       400:
 *         description: Invalid data provided
 */
router.put('/', protectAuth, ProfileController.validateUpdateUserProfile, ProfileController.updateUserProfile);

export default router;
