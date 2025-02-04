import "dotenv/config";
import app from "./app.js";
import { client, connectToDatabase } from "./connection/connection.js";

app.get("/", (req, res) => {
  res.send("active");
});

connectToDatabase()
  .then(() => {
    const PORT = process.env.PORT || 2003;
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server berjalan di http://0.0.0.0:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Gagal menyambungkan ke database:", error);
  });
