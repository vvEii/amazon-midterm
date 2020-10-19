/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();

module.exports = (db) => {
  // load all items from database
  router.get("/all", (req, res) => {
    let queryString = "SELECT * FROM items LIMIT 10";
    db.query(queryString)
      .then((data) => {
        const items = data.rows;
        res.json({ items });
      })
      .catch((err) => res.status(500).json({ error: err.message }));
  });

  // load only featured items from database
  router.get("/featured", (req, res) => {
    let queryString =
      "SELECT * FROM items JOIN item_categories ON items.id = item_id JOIN categories ON category_id = categories.id WHERE categories.name LIKE 'featured' LIMIT 10;";
    db.query(queryString)
      .then((data) => {
        const items = data.rows;
        res.json({ items });
      })
      .catch((err) => res.status(500).json({ error: err.message }));
  });
  return router;
};