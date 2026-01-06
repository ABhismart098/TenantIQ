const express = require("express");
const sequelize = require("./config/db");
const authRoutes = require("./routes/auth.routes");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger"); // ✅ FIX

const app = express();
app.use(express.json());

// DB Connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected successfully");
  } catch (error) {
    console.error("❌ Database connection failed:", error);
  }
})();

// Health Check
app.get("/", (req, res) => {
  res.send("TenantIQ Backend Running 🚀");
});

// Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// Routes
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
