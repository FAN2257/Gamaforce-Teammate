const sqlite = require('sqlite3').verbose()
const express = require('express')
const cors = require('cors')

const db = new sqlite.Database("data.db")

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

db.run(
  "CREATE TABLE IF NOT EXISTS drawings (id INTEGER PRIMARY KEY, geojson TEXT)",
  (err) => {
    if (err) {
      console.error("Error creating table:", err);
    } else {
      console.log("Table Created")
    }
  }
);

app.post("/drawings", (req, res) => {
  console.log('Data dari frontend:', req.body);
  const geojson = req.body.newMission;

  console.log('Received new mission:', geojson);
  const stmt = db.prepare("INSERT INTO drawings (geojson) VALUES (?)");
  stmt.run(geojson);
  stmt.finalize();

  console.log('Mission added to the database.');
  res.status(200).json({ message: `Misi ${geojson} berhasil!` })
});

app.get("/drawings", (req, res) => {
  db.all("SELECT * FROM drawings", (err, rows) => {
    if (err) {
      console.error("Error fetching drawings:", err);
      return res.status(500).json({ error: "Internal Server Error", message: "Server Error" });
    } else {
      res.status(200).json(rows);
    }
  });
});

app.listen(port, (err) => {
  if (err) {
    console.error(err)
  } else {
    console.log("Server is running")
  }
})

app.delete("/drawings", (req, res) => {
  try {
      db.run("DELETE FROM drawings", (err) => {
          if (err) {
              console.error("Error deleting missions:", err);
              res.status(500).json({ error: "Internal Server Error", message: "Server Error" });
          } else {
              console.log("All missions deleted.");
              res.status(200).json({ message: "All missions deleted successfully!" });
          }
      });
  } catch (error) {
      console.error("Unexpected error:", error);
      res.status(500).json({ error: "Internal Server Error", message: "Unexpected Error" });
  }
});

module.exports = db;
