const express = require("express");
const cors = require("cors");
const sequelize = require("./config/db");

const authRoutes = require("./routes/auth.routes");
const approvalRoutes = require("./routes/approval.routes");
const userRoutes = require("./routes/user.routes"); // ✅ ADD THIS

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

const app = express();

/* =======================
   GLOBAL MIDDLEWARE
======================= */
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "*",
    optionsSuccessStatus: 200
  })
);

/* =======================
   DATABASE CONNECTION
======================= */
(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected successfully");
  } catch (error) {
    console.error("❌ Database connection failed:", error);
  }
})();

/* =======================
   HEALTH CHECK
======================= */
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "TenantIQ Backend Running 🚀"
  });
});

/* =======================
   ROUTES
======================= */
app.use("/api/auth", authRoutes);
app.use("/api/approve", approvalRoutes);
app.use("/api/users", userRoutes); // ✅ USER MODULE REGISTERED

/* =======================
   SWAGGER
======================= */
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/* =======================
   GLOBAL ERROR HANDLER
======================= */
app.use((err, req, res, next) => {
  console.error("🔥 GLOBAL ERROR:", err);

  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({
      success: false,
      message: "Invalid JSON payload"
    });
  }

  

  return res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error"
  });
});





module.exports = app;

/* =======================
   SERVER
======================= */
// const PORT = process.env.PORT || 4000;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });
