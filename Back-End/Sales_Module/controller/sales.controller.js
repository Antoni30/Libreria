import { pool } from "../../db.js";

// 🔹 Obtener todas las ventas
export const getAllBookSales = async (req, res) => {
    try {
        const { rows } = await pool.query("SELECT * FROM get_all_book_sales()");
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor 🛠️", error: error.message });
    }
};

// 🔹 Obtener una venta por ID
export const getBookSaleById = async (req, res) => {
    try {
        const { id } = req.params;
        const { rows } = await pool.query("SELECT * FROM get_book_sale_by_id($1)", [id]);

        if (rows.length === 0) {
            return res.status(404).json({ message: `No se encontró la venta con ID ${id}` });
        }

        res.status(200).json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor 🛠️", error: error.message });
    }
};

// 🔹 Insertar una venta
export const postBookSale = async (req, res) => {
    try {
        const { id_user, book_sale_quantity_sold, book_sale_unit_price } = req.body;

        if (!id_user || !book_sale_quantity_sold || !book_sale_unit_price) {
            return res.status(400).json({ message: "Faltan datos" });
        }

        await pool.query("CALL insert_book_sale($1, $2, $3)", [id_user, book_sale_quantity_sold, book_sale_unit_price]);
        res.status(201).json({ message: "Venta registrada con éxito" });
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor 🛠️", error: error.message });
    }
};

// 🔹 Actualizar una venta
export const updateBookSale = async (req, res) => {
    try {
        const { id } = req.params;
        const { book_sale_quantity_sold, book_sale_unit_price } = req.body;

        if (!book_sale_quantity_sold || !book_sale_unit_price) {
            return res.status(400).json({ message: "Faltan datos" });
        }

        await pool.query("CALL update_book_sale($1, $2, $3)", [id, book_sale_quantity_sold, book_sale_unit_price]);
        res.status(200).json({ message: "Venta actualizada con éxito" });
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor 🛠️", error: error.message });
    }
};

// 🔹 Eliminar una venta
export const deleteBookSale = async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query("CALL delete_book_sale($1)", [id]);
        res.status(200).json({ message: `Venta con ID ${id} eliminada con éxito` });
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor 🛠️", error: error.message });
    }
};
