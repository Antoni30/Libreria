import { pool } from "../../db.js";

export const addSaleBookRelation = async (req, res) => {
    try {
        const { id_book, id_book_sale } = req.body;

        if (!id_book || !id_book_sale) {
            return res.status(400).json({ message: "Faltan parámetros" });
        }

        await pool.query("CALL insert_sales_and_books($1, $2)", [id_book, id_book_sale]);

        res.status(201).json({ message: "Relación insertada correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor", error: error.message });
    }
};

export const getSalesBooksRelations = async (req, res) => {
    try {
        const { rows } = await pool.query("SELECT * FROM get_sales_and_books()");
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor", error: error.message });
    }
};

export const deleteSaleBookRelation = async (req, res) => {
    try {
        const { id_book, id_book_sale } = req.body;

        if (!id_book || !id_book_sale) {
            return res.status(400).json({ message: "Faltan parámetros" });
        }

        await pool.query("CALL delete_sales_and_books($1, $2)", [id_book, id_book_sale]);

        res.status(200).json({ message: "Relación eliminada correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor", error: error.message });
    }
};

export const getSalesByBook = async (req, res) => {
    try {
        const { id_book } = req.params;
        const { rows } = await pool.query("SELECT * FROM get_sales_by_book($1)", [id_book]);
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor", error: error.message });
    }
};

export const getBooksBySale = async (req, res) => {
    try {
        const { id_book_sale } = req.params;
        const { rows } = await pool.query("SELECT * FROM get_books_by_sale($1)", [id_book_sale]);
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor", error: error.message });
    }
};

export const updateSaleBookRelation = async (req, res) => {
    try {
        const { old_id_book, old_id_book_sale, new_id_book, new_id_book_sale } = req.body;

        if (!old_id_book || !old_id_book_sale || !new_id_book || !new_id_book_sale) {
            return res.status(400).json({ message: "Faltan parámetros" });
        }

        await pool.query("CALL update_sales_and_books($1, $2, $3, $4)", [old_id_book, old_id_book_sale, new_id_book, new_id_book_sale]);

        res.status(200).json({ message: "Relación actualizada correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor", error: error.message });
    }
};
export const insertSale =  async (req, res) => {
    try {
      const { id_book, id_user, book_sale_quantity_sold, book_sale_unit_price } =
        req.body;
  
      if (!id_book || !id_user || !book_sale_quantity_sold || !book_sale_unit_price) {
        return res.status(400).json({ error: "Todos los campos son requeridos" });
      }
  
      const result = await pool.query(
        `SELECT insert_book_sale($2, $1, $3, $4)`,
        [id_book, id_user, book_sale_quantity_sold, book_sale_unit_price]
      );
  
      res.status(201).json({
        message: "Venta de libro registrada exitosamente",
        result: result.rows,
      });
    } catch (error) {
      res.status(500).json({ error: "Error interno del servidor",error: error.message });
    }
  }
