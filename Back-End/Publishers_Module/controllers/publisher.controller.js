import { pool } from "../../db.js";

export async function getPublishers(_, response) {
  try {
    const result = await pool.query("SELECT * FROM get_all_publishers();");
    response.json({ data: result.rows });
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
      response.json({ data: result.rows[0] });
    } else {
      response.status(404).send({ error: "Publisher not found" });
    }
  } catch (error) {
    console.error(error);
    response.status(500).send({ error: "Server error" });
  }
}

export async function postPublishers(request, response) {
  const { name, address, phone, email } = request.body;

  if (!name || !address || !phone || !email) {
    return response.status(400).json({
      error:
        "Request body incomplete. Fields required: { name, address, phone, email }",
    });
  }

  try {
    await pool.query("SELECT create_publisher($1, $2, $3, $4);", [
      name,
      address,
      phone,
      email,
    ]);
    response.status(201).send({ message: "Publisher created successfully" });
  } catch (error) {
    console.error(error);
    response.status(500).send({ error: "Server error" });
  }
}

export async function putPublishers(request, response) {
  const { id } = request.params;
  const { name, address, phone, email } = request.body;

  if (!name || !address || !phone || !email) {
    return response.status(400).json({
      error:
        "Request body incomplete. Fields required: { name, address, phone, email }",
    });
  }

  try {
    await pool.query("SELECT update_publisher($1, $2, $3, $4, $5);", [
      id,
      name,
      address,
      phone,
      email,
    ]);
    response.send({ message: "Publisher updated successfully" });
  } catch (error) {
    console.error(error);
    response.status(500).send({ error: "Server error" });
  }
}

export async function deletePublishers(request, response) {
  const { id } = request.params;
  try {
    const checkResult = await pool.query(
      "SELECT check_books_for_publisher($1);",
      [id]
    );
    const hasBooks = checkResult.rows[0].check_books_for_publisher;

    if (hasBooks) {
      response
        .status(400)
        .send({ error: "Cannot delete publisher with associated books" });
    } else {
      await pool.query("SELECT delete_publisher($1);", [id]);
      response.send({ message: "Publisher deleted successfully" });
    }
  } catch (error) {
    console.error(error);
    response.status(500).send({ error: "Server error" });
  }
}
