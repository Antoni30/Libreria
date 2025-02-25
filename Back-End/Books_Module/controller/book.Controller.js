import { pool } from "../../db.js";

// Obtener todos los libros
export const getBooks = async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM get_books()");
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({
      message: "Server Error 🛠️⚙️",
      error: error.message,
    });
  }
};

export const getBookById = async (req, res) => {
  try {
    const { id } = req.params;

    const { rows } = await pool.query("SELECT * FROM get_book_by_id($1)", [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: `Book with ID ${id} not found` });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    res.status(500).json({
      message: "Server Error 🛠️⚙️",
      error: error.message,
    });
  }
};

// Insertar un nuevo libro
export const postBook = async (req, res) => {
  try {
    const {
      id_publisher,
      book_title,
      book_author,
      book_isbn,
      book_publication_year,
      book_quantity_available,
      book_price,
      book_status,
      book_cover_image, 
    } = req.body;

    if (
      !id_publisher ||
      !book_title ||
      !book_author ||
      !book_isbn ||
      !book_publication_year ||
      !book_quantity_available ||
      !book_price ||
      !book_status
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    await pool.query(
      "CALL create_book($1, $2, $3, $4, $5, $6, $7, $8, $9)", 
      [
        Number(id_publisher),           // Asegurar que sea INT
        String(book_title),             // Asegurar que sea VARCHAR
        String(book_author),            // Asegurar que sea VARCHAR
        String(book_isbn),              // Asegurar que sea VARCHAR
        Number(book_publication_year),  // Asegurar que sea INT
        Number(book_quantity_available),// Asegurar que sea INT
        String(book_status),            // Asegurar que sea VARCHAR
        String(book_cover_image),       // Asegurar que sea VARCHAR
        Number(book_price)              // Asegurar que sea NUMERIC
      ]
    );
    

    res.status(200).json({ message: "Book added successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Server Error 🛠️⚙️",
      error: error.message,
    });
  }
};

// Actualizar un libro
export const putBook = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      id_publisher,
      book_title,
      book_author,
      book_isbn,
      book_publication_year,
      book_quantity_available,
      book_price,
      book_status,
      book_cover_image,
    } = req.body;

    await pool.query(
      "CALL update_book($1, $2, $3, $4, $5, $6, $7, $8, $9)",
      [
        Number(id),                    // Asegurar que sea INT
        Number(id_publisher),          // Asegurar que sea INT
        String(book_title),            // Asegurar que sea VARCHAR
        String(book_author),           // Asegurar que sea VARCHAR
        String(book_isbn),             // Asegurar que sea VARCHAR
        Number(book_quantity_available), // Asegurar que sea INT
        String(book_status),           // Asegurar que sea VARCHAR
        String(book_cover_image),      // Asegurar que sea VARCHAR
        Number(book_price)             // Asegurar que sea NUMERIC
      ]
    );
    

    res.status(200).json({ message: "Book updated successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Server Error 🛠️⚙️",
      error: error.message,
    });
  }
};

// Eliminar un libro
export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query("CALL delete_book($1)", [id]);
    res
      .status(200)
      .json({ message: `Book with ID ${id} deleted successfully` });
  } catch (error) {
    res.status(500).json({
      message: "Server Error 🛠️⚙️",
      error: error.message,
    });
  }
};
