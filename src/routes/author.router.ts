import express from 'express';
import * as AuthorController from '../controllers/author.controller';
import { protectAuth } from '../middleware/auth-middleware';

const router = express.Router();

// Acess : Public
// GET : Get List of all authors
/**
 * @swagger
 * /authors:
 *   get:
 *     summary: Get list of authors
 *     description: Fetches all authors in the system.
 *     responses:
 *       200:
 *         description: List of authors
 *       500:
 *         description: Internal server error
 */
router.get('/', AuthorController.listAuthors);

// Acess : Public
// GET : Get One author by ID
// Params query : id
/**
 * @swagger
 * /authors/{id}:
 *   get:
 *     summary: Get author by ID
 *     description: Fetches a single author by their ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Author's ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Author details
 *       404:
 *         description: Author not found
 */
router.get('/:id', AuthorController.checkExistingAuthor, AuthorController.getAuthor);

// Acess : Private
// POST : Create one author
// Params body : firstName , lastName
/**
 * @swagger
 * /authors:
 *   post:
 *     summary: Create a new author
 *     description: Adds a new author to the system.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: "John"
 *               lastName:
 *                 type: string
 *                 example: "Doe"
 *     responses:
 *       201:
 *         description: Author created successfully
 *       400:
 *         description: Bad request
 */
router.post('/', protectAuth, AuthorController.validateAuthorData, AuthorController.createAuthor);

// Acess : Private
// PUT : update an author
// Params query : id
// Params body : firstName , lastName
/**
 * @swagger
 * /authors/{id}:
 *   put:
 *     summary: Update an author
 *     description: Updates an existing author by their ID.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Author's ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: "John"
 *               lastName:
 *                 type: string
 *                 example: "Doe"
 *     responses:
 *       200:
 *         description: Author updated successfully
 *       400:
 *         description: Invalid data provided
 *       404:
 *         description: Author not found
 */
router.put(
  '/:id',
  protectAuth,
  AuthorController.validateAuthorData,
  AuthorController.checkExistingAuthor,
  AuthorController.updateAuthor
);

// Acess : Private
// DELETE : delete an author
// Params query : id
/**
 * @swagger
 * /authors/{id}:
 *   delete:
 *     summary: Delete an author
 *     description: Deletes an author by their ID.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Author's ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Author deleted successfully
 *       404:
 *         description: Author not found
 */
router.delete('/:id', protectAuth, AuthorController.checkExistingAuthor, AuthorController.deleteAuthor);

export default router;
