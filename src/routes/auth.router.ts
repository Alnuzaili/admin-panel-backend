import express from 'express';
import * as AuthController from '../controllers/auth.controller';
import { protectAuth } from '../middleware/auth-middleware';
const router = express.Router();

// Acess : public
// POST : login
// Params body : username , password
/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login to the system
 *     description: Logs the user in by validating the credentials and generating a JWT.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "john_doe"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Successful login with JWT token in response
 *       400:
 *         description: Invalid credentials or input
 */
router.post('/login', AuthController.validateLoginData, AuthController.login);


// Acess : Private
// POST : logout
/**
 * @swagger
 * /logout:
 *   post:
 *     summary: Logout from the system
 *     description: Logs the user out and invalidates the JWT.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully logged out
 *       401:
 *         description: Unauthorized, token is missing or invalid
 */
router.post('/logout', protectAuth, AuthController.logout);

export default router;
