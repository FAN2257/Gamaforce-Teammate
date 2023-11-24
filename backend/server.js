const sqlite = require('sqlite3')
const express = require('express')
const cors = require('cors')

const db = new sqlite.Database("data.db")

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

app.listen(port,(err) => {
    if(err){
        console.error(err)
    }
    else{
        console.log("Server is running")
    }
})

db.run(
    "CREATE TABLE IF NOT EXISTS drawings (id INTEGER PRIMARY KEY AUTOINCREMENT, geojson TEXT)",
    (err) => {
      if (err) {
        console.error("Error creating table:", err);
      }
      else{
        console.log("Table Created")
    }
    }
  );

app.post("/save-drawing", (req, res) => {
  const { geojson } = req.body;
  
  if (!geojson) {
    return res.status(400).json({ error: "Invalid request" });
  }
  
  db.run("INSERT INTO drawings (geojson) VALUES (?)", [geojson], function (
    err
  ) {
    if (err) {
      console.error("Error inserting drawing:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    else{
        return res.json({message: "Berhasil memasukkan data"});
    }
  
   
  });
});

app.get("/drawings", (req, res) => {
    db.all("SELECT * FROM drawings", (err, rows) => {
      if (err) {
        console.error("Error fetching drawings:", err);
        return res.status(500).json({ error: "Internal Server Error", message: "Server Error" });
      }
  
    res.json(rows);
  });
});