import { NextResponse } from "next/server";

export async function GET() {
  const openApiSpec = {
    openapi: "3.0.3",
    info: {
      title: "Deep Tech Society REST API",
      version: "1.0.0",
      description: "Production-ready backend API for Deep Tech Society platform.",
    },
    servers: [
      {
        url: "http://localhost:3000/api/v1",
        description: "Local Development Server",
      },
      {
        url: "https://community.dyau.ai/api/v1",
        description: "Production Edge Server",
      },
    ],
    paths: {
      "/auth/register": {
        post: {
          summary: "Register new user with Email or Phone",
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["fullName", "email", "password"],
                  properties: {
                    fullName: { type: "string" },
                    email: { type: "string" },
                    phoneNumber: { type: "string" },
                    countryCode: { type: "string" },
                    password: { type: "string" },
                  },
                },
              },
            },
          },
          responses: {
            201: { description: "User registered successfully" },
          },
        },
      },
      "/auth/login": {
        post: {
          summary: "Authenticate using Email OR Phone number",
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["identifier", "password"],
                  properties: {
                    identifier: { type: "string", example: "user@deeptech.society or +919876543210" },
                    password: { type: "string" },
                  },
                },
              },
            },
          },
          responses: {
            200: { description: "JWT Access & Refresh Tokens issued" },
          },
        },
      },
      "/community/posts": {
        get: {
          summary: "List community posts by domain or kind",
        },
        post: {
          summary: "Publish a post (Authentication required)",
          security: [{ bearerAuth: [] }],
        },
      },
      "/admin/dashboard": {
        get: {
          summary: "Administrative metrics (RBAC: SUPER_ADMIN, GLOBAL_ADMIN)",
          security: [{ bearerAuth: [] }],
        },
      },
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  };

  return NextResponse.json(openApiSpec);
}
