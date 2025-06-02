var express = require('express');
var router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.join(__dirname, '../db/sqlite.db');
const db = new sqlite3.Database(dbPath);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// 取得 PoultryAndFishTrade 所有資料
router.get('/api/quotes', function(req, res) {
  db.all('SELECT * FROM PoultryAndFishTrade', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

module.exports = router;
