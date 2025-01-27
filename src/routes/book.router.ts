import express from 'express';
import * as BookController from '../controllers/book.controller';
import { protectAuth } from '../middleware/auth-middleware';

const router = express.Router();

// Acess : Public
// GET: List all the books
/**
 * @swagger
 * /books:
 *   get:
 *     summary: Get list of books
 *     description: Fetches all books in the system.
 *     responses:
 *       200:
 *         description: List of books
 *       500:
 *         description: Internal server error
 */
router.get('/', BookController.listBooks);

// Acess : Public
// GET : Get One book by ID
// Params query : id
/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Get book by ID
 *     description: Fetches a single book by its ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Book's ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Book details
 *       404:
 *         description: Book not found
 */
router.get('/:id', BookController.checkExistingBook, BookController.getBook);

// Acess : Private
// POST : Create one book
// Params body : title , authorId , datePublished , isFiction
/**
 * @swagger
 * /books:
 *   post:
 *     summary: Create a new book
 *     description: Adds a new book to the system.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Book Title"
 *               authorId:
 *                 type: string
 *                 example: "1"
 *               datePublished:
 *                 type: string
 *                 format: date
 *                 example: "2025-01-01"
 *               isFiction:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: Book created successfully
 *       400:
 *         description: Bad request
 */
router.post(
  '/',
  protectAuth,
  BookController.validateBookData,
  BookController.checkExistingBookAuthor,
  BookController.createBook
);

// Acess : Private
// PUT : update one book
// Params query : id
// Params body : title , authorId , datePublished , isFiction
/**
 * @swagger
 * /books/{id}:
 *   put:
 *     summary: Update a book
 *     description: Updates an existing book by its ID.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Book's ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Updated Book Title"
 *               authorId:
 *                 type: string
 *                 example: "1"
 *               datePublished:
 *                 type: string
 *                 format: date
 *                 example: "2025-01-01"
 *               isFiction:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Book updated successfully
 *       404:
 *         description: Book not found
 */
router.put(
  '/:id',
  protectAuth,
  BookController.validateBookData,
  BookController.checkExistingBook,
  BookController.checkExistingBookAuthor,
  BookController.updateBook
);

// Acess : Private
// DELETE : delete a book
// Params query : id
/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     summary: Delete a book
 *     description: Deletes a book by its ID.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Book's ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Book deleted successfully
 *       404:
 *         description: Book not found
 */
router.delete('/:id', protectAuth, BookController.checkExistingBook, BookController.deleteBook);

export default router;
