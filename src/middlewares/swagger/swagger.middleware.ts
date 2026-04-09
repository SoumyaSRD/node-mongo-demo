import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

/**
 * @openapi
 * components:
 *   schemas:
 *     Department:
 *       type: object
 *       properties:
 *         _id: { type: string }
 *         name: { type: string }
 *         role: { type: string }
 *         createdAt: { type: string, format: date-time }
 *         updatedAt: { type: string, format: date-time }
 *
 *     DepartmentInput:
 *       type: object
 *       required: [name, role]
 *       properties:
 *         name: { type: string }
 *         role: { type: string }
 *
 *     User:
 *       type: object
 *       properties:
 *         _id: { type: string }
 *         name: { type: string }
 *         email: { type: string }
 *         phone: { type: string }
 *         type: { type: string }
 *         age: { type: number }
 *         address: { type: string }
 *         departments:
 *           type: array
 *           items: { $ref: '#/components/schemas/Department' }
 *         createdAt: { type: string, format: date-time }
 *         updatedAt: { type: string, format: date-time }
 *
 *     RegisterInput:
 *       type: object
 *       required: [name, email, password, phone, type]
 *       properties:
 *         name: { type: string }
 *         email: { type: string }
 *         password: { type: string }
 *         phone: { type: string }
 *         type: { type: string }
 *         age: { type: number }
 *         address: { type: string }
 *         departments:
 *           type: array
 *           items: { type: string }
 *
 *     UserUpdateInput:
 *       type: object
 *       properties:
 *         name: { type: string }
 *         email: { type: string }
 *         phone: { type: string }
 *         type: { type: string }
 *         age: { type: number }
 *         address: { type: string }
 *         departments:
 *           type: array
 *           items: { type: string }
 *
 *     LoginInput:
 *       type: object
 *       required: [password]
 *       properties:
 *         email: { type: string }
 *         phone: { type: string }
 *         password: { type: string }
 *
 *     ApiResponse:
 *       type: object
 *       properties:
 *         statusCode: { type: number }
 *         message: { type: string }
 *         data: { type: object }
 *
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         statusCode: { type: number }
 *         status: { type: string }
 *         message: { type: string }
 *         errMsg: { type: string }
 */

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My API",
      version: "1.0.0",
      description: "API documentation with TypeScript DTOs and Schemas",
    },
    servers: [{ url: "http://localhost:5000" }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./src/modules/**/*.routes.ts", "./src/middlewares/swagger/swagger.middleware.ts"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

export default function setupSwaggerDocs(app: any) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
