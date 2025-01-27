import swaggerJsdoc from 'swagger-jsdoc';

export const swaggerOptions: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Express API with Swagger',
      version: '1.0.0',
      description: 'A simple API to demonstrate Swagger integration',
    },
  },
  apis: ['./src/routes/*.router.ts'],  // Point to your routes for Swagger docs
  securityDefinitions: {
    BearerAuth: {
      type: 'apiKey',
      in: 'header',
      name: 'Authorization',
      description: 'Bearer token for authentication',
    },
  },
};
