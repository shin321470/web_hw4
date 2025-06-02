const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

// 資料庫檔案路徑
const dbDir = path.join(__dirname, 'db');
const dbPath = path.join(dbDir, 'sqlite.db');

// 確保 db 資料夾存在
if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir);
}

// 開啟資料庫（若不存在則會自動建立）
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('無法開啟資料庫:', err.message);
    } else {
        console.log('成功開啟資料庫:', dbPath);
    }
    // 檢查並建立 PoultryAndFishTrade table
    db.run(`CREATE TABLE IF NOT EXISTS PoultryAndFishTrade (
        Year INTEGER NOT NULL PRIMARY KEY,
        ChickenVolumeTons REAL NOT NULL,
        ChickenAvgPricePerKg REAL NOT NULL,
        DuckVolumeTons REAL NOT NULL,
        DuckAvgPricePerKg REAL NOT NULL,
        FishVolumeTons REAL NOT NULL,
        FishAvgPricePerKg REAL NOT NULL
    )`, (tableErr) => {
        if (tableErr) {
            console.error('無法建立 PoultryAndFishTrade table:', tableErr.message);
        } else {
            console.log('PoultryAndFishTrade table 已存在或已建立');
            // 插入資料
            const data = [
                [70,35820,44.9,6674,51.8,55299,49.1],
                [71,41204,51.6,7209,40.3,57845,50.5],
                [72,46862,46.9,7722,39.8,59355,49.8],
                [73,45992,47.2,7905,42.3,59102,50.8],
                [74,48142,42.4,7174,44.5,61675,50.4],
                [75,48171,53.2,7595,47.6,60109,52.0],
                [76,50106,43.3,7434,35.4,57008,54.7],
                [77,55105,41.1,6750,40.0,60331,54.4],
                [78,54548,47.1,7667,41.5,58833,57.3],
                [79,57596,38.7,5576,38.6,56117,56.5],
                [80,55888,40.3,5470,39.0,54398,57.9],
                [81,71165,39.7,6963,38.3,54932,58.9],
                [82,75543,43.1,7233,35.4,49108,64.2],
                [83,76852,40.9,6365,43.2,45582,74.7],
                [84,74554,41.5,6064,36.6,44307,81.2],
                [85,66705,48.7,6466,40.3,41795,85.4],
                [86,68809,49.7,6678,48.0,43993,83.8],
                [87,61860,50.6,6536,45.6,46160,85.1],
                [88,60785,53.0,7329,43.4,46194,84.0],
                [89,60080,42.9,7316,39.6,45327,83.8],
                [90,56346,49.3,5664,43.8,45676,77.0],
                [91,55907,46.3,5654,47.1,42557,81.2],
                [92,52503,41.9,6133,43.2,43534,78.5],
                [93,45620,52.5,5871,50.5,43666,79.0],
                [94,47642,57.4,6477,57.3,43374,76.6],
                [95,46970,52.9,6408,47.1,39653,78.4],
                [96,45103,57.2,5626,50.5,37502,83.8],
                [97,42126,71.7,5271,63.3,35751,97.0],
                [98,41357,67.6,4467,66.6,33703,98.8],
                [99,42309,67.1,4599,65.3,31973,99.6],
                [100,40455,75.7,2582,64.4,27868,112.5],
                [101,44324,70.3,2237,67.2,27754,110.7],
                [102,39870,83.5,2428,74.8,26873,110.6],
                [103,36635,84.9,2576,76.7,24738,119.2],
                [104,35244,88.8,2415,80.0,24103,114.7],
                [105,38899,90.8,2494,88.8,24400,113.4],
                [106,38111,86.5,2500,90.0,25772,115.4],
                [107,39028,89.2,2138,90.0,23192,120.1],
                [108,38884,79.9,2231,90.0,22560,117.4],
                [109,39557,87.7,2068,90.0,21749,113.7],
                [110,41325,97.8,1915,90.0,20651,114.7],
                [111,43852,96.5,2009,90.0,20229,116.1],
                [112,45220,104.0,1495,90.0,20296,114.8],
                [113,44484,105.3,127,90.0,19544,115.9]
            ];
            const insertSQL = `INSERT OR IGNORE INTO PoultryAndFishTrade (Year, ChickenVolumeTons, ChickenAvgPricePerKg, DuckVolumeTons, DuckAvgPricePerKg, FishVolumeTons, FishAvgPricePerKg) VALUES (?, ?, ?, ?, ?, ?, ?)`;
            data.forEach(row => {
                db.run(insertSQL, row, (insertErr) => {
                    if (insertErr) {
                        console.error('插入資料失敗:', insertErr.message);
                    }
                });
            });
            console.log('資料已插入（如不存在）');
        }
    });
});

module.exports = db;

