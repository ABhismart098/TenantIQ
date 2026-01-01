const express = require("express");
const sequelize = require("./config/db");
const authRoutes = require("./routes/auth.routes");
const app = express();
app.use(express.json());

(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected successfully");
  } catch (error) {
    console.error("❌ Database connection failed:", error);
  }
})();

app.get("/", (req, res) => {
  res.send("TenantIQ Backend Running 🚀");
});

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
