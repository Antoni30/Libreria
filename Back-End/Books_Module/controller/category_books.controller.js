import { pool } from "../../db.js";

// 🔹 Obtener todas las relaciones libro-categoría
export const getBooksCategories = async (req, res) => {
    try {
        const { rows } = await pool.query("SELECT * FROM get_books_categories()");
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ message: "Server Error 🛠️", error: error.message });
    }
};

// 🔹 Obtener todas las categorías de un libro
export const getCategoriesByBook = async (req, res) => {
    try {
        const { id } = req.params;
        const { rows } = await pool.query("SELECT * FROM get_categories_by_book($1)", [id]);

        if (rows.length === 0) {
            return res.status(404).json({ message: `No se encontraron categorías para el libro con ID ${id}` });
        }

        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ message: "Server Error 🛠️", error: error.message });
    }
};

// 🔹 Obtener todos los libros de una categoría
export const getBooksByCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { rows } = await pool.query("SELECT * FROM get_books_by_category($1)", [id]);

        if (rows.length === 0) {
            return res.status(404).json({ message: `No se encontraron libros para la categoría con ID ${id}` });
        }

        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ message: "Server Error 🛠️", error: error.message });
    }
};

// 🔹 Agregar una relación libro-categoría
export const postBookCategory = async (req, res) => {
    try {
        const { id_category, id_book } = req.body;
        if (!id_category || !id_book) {
            return res.status(400).json({ message: "Faltan datos (id_category o id_book)" });
        }

        await pool.query("CALL insert_book_category($1, $2)", [id_category, id_book]);
        res.status(201).json({ message: "Relación libro-categoría creada con éxito" });
    } catch (error) {
        res.status(500).json({ message: "Server Error 🛠️", error: error.message });
    }
};

// 🔹 Eliminar una relación libro-categoría
export const deleteBookCategory = async (req, res) => {
    try {
        const { id_category, id_book } = req.params;
        await pool.query("CALL delete_book_category($1, $2)", [id_category, id_book]);
        res.status(200).json({ message: `Relación categoría ${id_category} - libro ${id_book} eliminada con éxito` });
    } catch (error) {
        res.status(500).json({ message: "Server Error 🛠️", error: error.message });
    }
};
