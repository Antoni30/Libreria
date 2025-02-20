import { pool } from "../../db.js";
import { mapPublisherDb } from "../utils/mapper.js";

export async function getPublishers(_, response) {
  try {
    const result = await pool.query("SELECT * FROM get_all_publishers();");
    const publisherFromDb = result.rows;
    const publishersMapped = publisherFromDb.map((publisherFromDb) =>
      mapPublisherDb(publisherFromDb)
    );
    response.json({ data: publishersMapped });
  } catch (error) {
    console.error(error);
    response.status(500).send({ error: "Server error" });
  }
}

export async function getPublisherById(request, response) {
  const { id } = request.params;
  try {
    const result = await pool.query("SELECT * FROM get_publisher_by_id($1);", [
      id,
    ]);
    if (result.rows.length > 0) {
      const publisherFromDb = result.rows[0];
      const publisher = mapPublisherDb(publisherFromDb);
      response.json({ data: publisher });
    } else {
      response.status(404).send({ error: "Publisher not found" });
    }
  } catch (error) {
    console.error(error);
    response.status(500).send({ error: "Server error" });
  }
}

export async function postPublisher(request, response) {
  const { name, address, phone, email } = request.body;

  if (!name || !address || !phone || !email) {
    return response.status(400).json({
      error:
        "Request body incomplete. Fields required: { name, address, phone, email }",
    });
  }

  try {
    // Llamar a la función PL/pgSQL para crear el publisher
    const result = await pool.query(
      "SELECT * FROM create_publisher($1, $2, $3, $4);",
      [name, address, phone, email]
    );

    const publisherCreatedFromDb = result.rows[0];
    const publisherCreatedFormatted = mapPublisherDb(publisherCreatedFromDb);

    // Devolver el publisher creado
    response.status(201).json({
      message: "Publisher created successfully",
      data: publisherCreatedFormatted,
    });
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
}

export async function putPublisher(request, response) {
  const { id } = request.params;
  const { name, address, phone, email } = request.body;

  if (!name || !address || !phone || !email) {
    return response.status(400).json({
      error:
        "Request body incomplete. Fields required: { name, address, phone, email }",
    });
  }

  try {
    // Llamar a la función PL/pgSQL para actualizar el publisher
    const result = await pool.query(
      "SELECT * FROM update_publisher($1, $2, $3, $4, $5);",
      [id, name, address, phone, email]
    );

    const publisherUpdatedFromDb = result.rows[0];
    const publisherUpdatedFormatted = mapPublisherDb(publisherUpdatedFromDb);
    // Devolver el publisher actualizado
    response.json({
      message: "Publisher updated successfully",
      data: publisherUpdatedFormatted,
    });
  } catch (error) {
    response.status(400).send({ error: error.message });
  }
}

export async function deletePublisher(request, response) {
  const { id } = request.params;
  try {
    // Llamar a la función PL/pgSQL para eliminar el publisher y devolver sus datos
    const result = await pool.query("SELECT * FROM delete_publisher($1);", [
      id,
    ]);

    if (result.rows.length > 0) {
      const publisherDeletedFromDb = result.rows[0];
      const publisherDeleted = mapPublisherDb(publisherDeletedFromDb);
      response.json({
        message: "Publisher deleted successfully",
        data: publisherDeleted, // Devolver el publisher eliminado
      });
    } else {
      response.status(404).send({ error: "Publisher not found" });
    }
  } catch (error) {
    response.status(400).send({ error: error.message });
  }
}
