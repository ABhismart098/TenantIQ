const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "TenantIQ API",
      version: "1.0.0",
      description: "TenantIQ Backend API Documentation"
    },
    servers: [
      {
        url: "http://localhost:5000/api",
        description: "Local server"
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      },
      schemas: {
        ApproveRequestDTO: {
          type: "object",
          required: ["target_user_id", "action"],
          properties: {
            target_user_id: {
              type: "string",
              format: "uuid",
              example: "c1b3a7a4-7c2a-4a5a-9f1e-12ab34cd56ef"
            },
            action: {
              type: "string",
              enum: ["APPROVED", "REJECTED"],
              example: "APPROVED"
            },
            reason: {
              type: "string",
              example: "All documents verified"
            }
          }
        }
      }
    }
  },
  apis: ["./src/routes/*.js"] // 👈 VERY IMPORTANT
};

module.exports = swaggerJsdoc(options);
