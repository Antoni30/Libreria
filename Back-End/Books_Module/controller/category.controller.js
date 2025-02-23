import { pool } from "../../db.js";


export const getCategories = async (req, res) => {
    try {
        const { rows } = await pool.query("SELECT * FROM get_categories()");
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ message: "Server Error 🛠️", error: error.message });
    }
};


export const getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const { rows } = await pool.query("SELECT * FROM get_category_by_id($1)", [id]);

        if (rows.length === 0) {
            return res.status(404).json({ message: `No se encontró la categoría con ID ${id}` });
        }

        res.status(200).json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: "Server Error 🛠️", error: error.message });
    }
};


export const postCategory = async (req, res) => {
    try {
        const { category_name } = req.body;
        if (!category_name) {
            return res.status(400).json({ message: "Falta el nombre de la categoría" });
        }

        await pool.query("CALL insert_category($1)", [category_name]);
        res.status(201).json({ message: "Categoría creada con éxito" });
    } catch (error) {
        res.status(500).json({ message: "Server Error 🛠️", error: error.message });
    }
};


export const putCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { category_name } = req.body;

        if (!category_name) {
            return res.status(400).json({ message: "Falta el nombre de la categoría" });
        }

        await pool.query("CALL update_category($1, $2)", [id, category_name]);
        res.status(200).json({ message: "Categoría actualizada con éxito" });
    } catch (error) {
        res.status(500).json({ message: "Server Error 🛠️", error: error.message });
    }
};


export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query("CALL delete_category($1)", [id]);
        res.status(200).json({ message: `Categoría con ID ${id} eliminada con éxito` });
    } catch (error) {
        res.status(500).json({ message: "Server Error 🛠️", error: error.message });
    }
};