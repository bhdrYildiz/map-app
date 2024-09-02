const express = require("express");
const cors = require("cors");
const axios = require("axios");
const { Pool } = require("pg");

const app = express();
const PORT = 3000;

app.use(cors());

// JSON ve URL-encoded verilerini parse etmek için middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// PostgreSQL bağlantısı
const pool = new Pool({
  user: "postgres", // PostgreSQL kullanıcı adı
  host: "localhost", // PostgreSQL hostu
  database: "DENEME", // Veritabanı adı
  password: "137by1907.", // Şifre
  port: 5432, // PostgreSQL portu
});

app.get("/api/ispark", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM ispark_data");
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching data:", error.message);
    res.status(500).json({ message: "Error fetching data" });
  }
});

// İBB API'den verileri çekip PostgreSQL'e kaydetmek için endpoint
app.get("/api/update-ispark", async (req, res) => {
  try {
    const response = await axios.get(
      "https://data.ibb.gov.tr/api/3/action/datastore_search",
      {
        params: {
          resource_id: "f4f56e58-5210-4f17-b852-effe356a890c", // Veri kümesi kimliği
          limit: 700, // Döndürülecek kayıt sayısı
        },
      }
    );

    const records = response.data.result.records;

    // Her bir kaydı veritabanına ekleme
    for (let record of records) {
      await pool.query(
        `INSERT INTO ispark_data (park_name, location_name, capacity_of_park, working_time, county_name, longitude, latitude)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        ON CONFLICT (park_name) DO UPDATE 
        SET location_name = EXCLUDED.location_name, 
            capacity_of_park = EXCLUDED.capacity_of_park,
            working_time = EXCLUDED.working_time,
            county_name = EXCLUDED.county_name,
            longitude = EXCLUDED.longitude,
            latitude = EXCLUDED.latitude`,
        [
          record.PARK_NAME,
          record.LOCATION_NAME,
          record.CAPACITY_OF_PARK,
          record.WORKING_TIME,
          record.COUNTY_NAME,
          record.LONGITUDE,
          record.LATITUDE,
        ]
      );
    }

    res.json({ message: "Data successfully updated" });
  } catch (error) {
    console.error("Error updating data:", error.message);
    res
      .status(500)
      .json({ message: "Error updating data", error: error.message });
  }
});

app.put("/api/update/:id", async (req, res) => {
  try {
    console.log(req.body);
    const { id } = req.params;
    const {
      PARK_NAME,
      LOCATION_NAME,
      CAPACITY_OF_PARK,
      WORKING_TIME,
      COUNTY_NAME,
      LONGITUDE,
      LATITUDE,
    } = req.body;

    const result = await pool.query(
      `UPDATE ispark_data
       SET park_name = $1, location_name = $2, capacity_of_park = $3, working_time = $4, county_name = $5, longitude = $6, latitude = $7
       WHERE id = $8`,
      [
        PARK_NAME,
        LOCATION_NAME,
        CAPACITY_OF_PARK,
        WORKING_TIME,
        COUNTY_NAME,
        LONGITUDE,
        LATITUDE,
        id,
      ]
    );
    
    if (result.rowCount > 0) {
      // Güncellenmiş kayıtları sorgula
      const updatedRecord = await pool.query(
        `SELECT * FROM ispark_data WHERE id = $1`,
        [id]
      );

      res.json({ message: "Data successfully updated" });
    } else {
      res.status(404).json({ message: "Record not found" });
    }
  } catch (error) {
    console.error("Error updating data:", error.message);
    res.status(500).json({ message: "Error updating data", error: error.message });
  }
});


// Sunucuyu başlatma
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
