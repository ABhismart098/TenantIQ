const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "TenantIQ API",
      version: "1.0.0",
      description: "TenantIQ Backend API Documentation"
    },
    definition: {
  openapi: "3.0.0",
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT"
      }
    }
  },
  security: [{ bearerAuth: [] }]
}
,
    servers: [
      {
        url: "http://localhost:5000"
      }
    ]
  },
  apis: ["./src/routes/*.js"]
};


// ✅ THIS WAS THE BUG — FIXED
const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
