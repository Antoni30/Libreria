import { pool } from "../db.js";
import Book from "../model/bookModel.js";

export const getBooks = async (req, res) => {
    try {
        const { rows } = await pool.query("SELECT * FROM get_data_books()");
        const books = rows.map(row => new Book(row.d_publisher, row.book_title, row.book_author, row.book_isrin, row.book_publication_year, row.book_quantity_available, row.book_status, row.book_cover_image, row.d_book));
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({
            message: "Server Error 🛠️⚙️",
            error: error.message
        });
    }
};

export const postBook = async (req, res) => {
    try {
        const { d_publisher, book_title, book_author, book_isrin, book_publication_year, book_quantity_available, book_status, book_cover_image } = req.body;

        if (!d_publisher || !book_title || !book_author || !book_isrin || !book_publication_year || !book_quantity_available || !book_status) {
            return res.status(400).json({
                message: "Missing required fields"
            });
        }

        const newBook = new Book(d_publisher, book_title, book_author, book_isrin, book_publication_year, book_quantity_available, book_status, book_cover_image);
        await pool.query("CALL insert_data_book($1, $2, $3, $4, $5, $6, $7, $8)", [
            newBook.getPublisherId(),
            newBook.getBookTitle(),
            newBook.getBookAuthor(),
            newBook.getBookIsrin(),
            newBook.getBookPublicationYear(),
            newBook.getBookQuantityAvailable(),
            newBook.getBookStatus(),
            newBook.getBookCoverImage()
        ]);

        res.status(200).json({
            message: "Book added successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: "Server Error 🛠️⚙️",
            error: error.message
        });
    }
};

export const putBook = async (req, res) => {
    try {
        const { id } = req.params;
        const { d_publisher, book_title, book_author, book_isrin, book_publication_year, book_quantity_available, book_status, book_cover_image } = req.body;

        const { rows } = await pool.query("SELECT does_book_exist($1)", [id]);
        if (rows[0].does_book_exist === false) {
            return res.status(400).json({
                message: `Book with ID ${id} does not exist`
            });
        }

        const updatedBook = new Book(d_publisher, book_title, book_author, book_isrin, book_publication_year, book_quantity_available, book_status, book_cover_image, id);
        await pool.query("CALL update_data_book($1, $2, $3, $4, $5, $6, $7, $8, $9)", [
            id,
            updatedBook.getPublisherId(),
            updatedBook.getBookTitle(),
            updatedBook.getBookAuthor(),
            updatedBook.getBookIsrin(),
            updatedBook.getBookPublicationYear(),
            updatedBook.getBookQuantityAvailable(),
            updatedBook.getBookStatus(),
            updatedBook.getBookCoverImage()
        ]);

        res.status(200).json({
            message: "Book updated successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: "Server Error 🛠️⚙️",
            error: error.message
        });
    }
};

export const deleteBook = async (req, res) => {
    try {
        const { id } = req.params;

        const { rows } = await pool.query("SELECT does_book_exist($1)", [id]);
        if (rows[0].does_book_exist === false) {
            return res.status(400).json({
                message: `Book with ID ${id} does not exist`
            });
        }

        await pool.query("CALL delete_data_book($1)", [id]);
        res.status(200).json({
            message: `Book with ID ${id} deleted successfully`
        });
    } catch (error) {
        res.status(500).json({
            message: "Server Error 🛠️⚙️",
            error: error.message
        });
    }
};