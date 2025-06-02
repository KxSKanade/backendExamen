// src/models/productModel.js
const pool = require('../config/db');

const Product = {
  async findAll() {
    const query = `SELECT id, name, description, price, stock, image_url, created_at, updated_at
                   FROM products
                   ORDER BY id`;
    const { rows } = await pool.query(query);
    return rows;
  },

  async findById(id) {
    const query = `SELECT id, name, description, price, stock, image_url, created_at, updated_at
                   FROM products
                   WHERE id = $1`;
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  },

  async create({ name, description, price, stock, image_url }) {
    const query = `INSERT INTO products (name, description, price, stock, image_url)
                   VALUES ($1, $2, $3, $4, $5)
                   RETURNING id, name, description, price, stock, image_url, created_at, updated_at`;
    const values = [name, description, price, stock, image_url];
    const { rows } = await pool.query(query, values);
    return rows[0];
  },

  async update(id, { name, description, price, stock, image_url }) {
    // Actualizamos todos los campos, aunque image_url puede ser null si no se envía
    const query = `UPDATE products
                   SET name = $1,
                       description = $2,
                       price = $3,
                       stock = $4,
                       image_url = $5,
                       updated_at = NOW()
                   WHERE id = $6
                   RETURNING id, name, description, price, stock, image_url, created_at, updated_at`;
    const values = [name, description, price, stock, image_url, id];
    const { rows } = await pool.query(query, values);
    return rows[0];
  },

  async delete(id) {
    const query = `DELETE FROM products WHERE id = $1`;
    await pool.query(query, [id]);
    return;
  },
};

module.exports = Product;
