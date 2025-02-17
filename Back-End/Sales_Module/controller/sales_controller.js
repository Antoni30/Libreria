import { pool } from "../../db.js";
import BookSale from "../model/book_sale.js";

/**
 * Retrieves all book sales from the database.
 */
export const getBookSales = async (req, res) => {
    try {
        const { rows } = await pool.query("SELECT * FROM get_book_sales()");
        const bookSales = rows.map(row => new BookSale(
            row.id_user,
            row.book_sale_date,
            row.book_sale_quantity_sold,
            row.book_sale_unit_price,
            row.book_total_sale,
            row.id_book_sale
        ));
        res.status(200).json(bookSales);
    } catch (error) {
        res.status(500).json({ message: "Server Error 🛠️⚙️", error: error.message });
    }
};

/**
 * Adds a new book sale record to the database.
 */
export const postBookSale = async (req, res) => {
    try {
        const { id_user, book_sale_date, book_sale_quantity_sold, book_sale_unit_price } = req.body;
        
        if (!id_user || !book_sale_date || !book_sale_quantity_sold || !book_sale_unit_price) {
            return res.status(400).json({
                message: "Missing required fields: {id_user, book_sale_date, book_sale_quantity_sold, book_sale_unit_price}" 
            });
        }
        
        const newBookSale = new BookSale(id_user, book_sale_date, book_sale_quantity_sold, book_sale_unit_price);
        
        await pool.query("CALL insert_book_sale($1, $2, $3, $4, $5)", [
            newBookSale.getIdUser(),
            newBookSale.getSaleDate(),
            newBookSale.getQuantitySold(),
            newBookSale.getUnitPrice(),
            newBookSale.getTotalSale()
        ]);
        
        res.status(201).json({ message: "Book sale added successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error 🛠️⚙️", error: error.message });
    }
};

/**
 * Deletes a book sale record from the database.
 */
export const deleteBookSale = async (req, res) => {
    try {
        const { id } = req.params;
        const { rows } = await pool.query("SELECT does_book_sale_exist($1)", [id]);
        
        if (!rows[0]?.does_book_sale_exist) {
            return res.status(404).json({ message: `Book sale with ID ${id} does not exist.` });
        }
        
        await pool.query("CALL delete_book_sale($1)", [id]);
        res.status(200).json({ message: `Deleted book sale with ID ${id}` });
    } catch (error) {
        res.status(500).json({ message: "Server Error 🛠️⚙️", error: error.message });
    }
};
