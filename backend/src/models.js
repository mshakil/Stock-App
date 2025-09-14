const db = require("./db");

function createHolding({ symbol, shares, avg_price, last_price }, callback) {
  db.run(
    `INSERT INTO holdings (symbol, shares, avg_price, last_price) VALUES (?, ?, ?, ?)`,
    [symbol, shares, avg_price, last_price],
    function (err) {
      callback(err, { id: this.lastID });
    }
  );
}

function getHoldings(callback) {
  db.all(`SELECT * FROM holdings`, [], callback);
}

function deleteHolding(id, callback) {
  db.run(`DELETE FROM holdings WHERE id=?`, [id], callback);
}

module.exports = { createHolding, getHoldings, deleteHolding };
