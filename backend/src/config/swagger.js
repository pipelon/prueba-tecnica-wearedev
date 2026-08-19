const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "Task Management API",
    version: "1.0.0",
    description: "REST API for managing tasks",
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Local development server",
    },
  ],
  tags: [
    {
      name: "Tasks",
      description: "Task management endpoints",
    },
  ],
  components: {
    schemas: {
      Task: {
        type: "object",
        properties: {
          id: {
            type: "integer",
            example: 1,
          },
          title: {
            type: "string",
            minLength: 1,
            maxLength: 100,
            example: "Finish technical test",
          },
          description: {
            type: "string",
            maxLength: 500,
            example: "Complete the backend and frontend implementation",
          },
          status: {
            type: "string",
            enum: ["pending", "in_progress", "done"],
            example: "pending",
          },
          createdAt: {
            type: "string",
            format: "date-time",
            example: "2026-08-19T20:00:00.000Z",
          },
          updatedAt: {
            type: "string",
            format: "date-time",
            example: "2026-08-19T20:00:00.000Z",
          },
        },
      },

      CreateTask: {
        type: "object",
        required: ["title", "status"],
        properties: {
          title: {
            type: "string",
            minLength: 1,
            maxLength: 100,
            example: "Finish technical test",
          },
          description: {
            type: "string",
            maxLength: 500,
            example: "Complete the backend",
          },
          status: {
            type: "string",
            enum: ["pending", "in_progress", "done"],
            example: "pending",
          },
        },
      },

      UpdateTask: {
        type: "object",
        properties: {
          title: {
            type: "string",
            minLength: 1,
            maxLength: 100,
            example: "Finish technical test",
          },
          description: {
            type: "string",
            maxLength: 500,
            example: "Backend and frontend completed",
          },
          status: {
            type: "string",
            enum: ["pending", "in_progress", "done"],
            example: "in_progress",
          },
        },
      },

      Error: {
        type: "object",
        properties: {
          statusCode: {
            type: "integer",
            example: 400,
          },
          message: {
            type: "string",
            example: "Title is required",
          },
        },
      },
    },
  },

  paths: {
    "/api/tasks": {
      get: {
        tags: ["Tasks"],
        summary: "Get all tasks",
        responses: {
          200: {
            description: "Tasks retrieved successfully",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/Task",
                  },
                },
              },
            },
          },
          500: {
            description: "Internal server error",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
        },
      },

      post: {
        tags: ["Tasks"],
        summary: "Create a new task",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/CreateTask",
              },
            },
          },
        },
        responses: {
          201: {
            description: "Task created successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Task",
                },
              },
            },
          },
          400: {
            description: "Invalid task data",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
          500: {
            description: "Internal server error",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
        },
      },
    },

    "/api/tasks/{id}": {
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          description: "Task identifier",
          schema: {
            type: "integer",
            minimum: 1,
          },
          example: 1,
        },
      ],

      get: {
        tags: ["Tasks"],
        summary: "Get a task by ID",
        responses: {
          200: {
            description: "Task retrieved successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Task",
                },
              },
            },
          },
          400: {
            description: "Invalid task ID",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
          404: {
            description: "Task not found",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
          500: {
            description: "Internal server error",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
        },
      },

      put: {
        tags: ["Tasks"],
        summary: "Update a task",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/UpdateTask",
              },
            },
          },
        },
        responses: {
          200: {
            description: "Task updated successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Task",
                },
              },
            },
          },
          400: {
            description: "Invalid task data or ID",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
          404: {
            description: "Task not found",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
          500: {
            description: "Internal server error",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
        },
      },

      delete: {
        tags: ["Tasks"],
        summary: "Delete a task",
        responses: {
          200: {
            description: "Task deleted successfully",
          },
          400: {
            description: "Invalid task ID",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
          404: {
            description: "Task not found",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
          500: {
            description: "Internal server error",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
        },
      },
    },
  },
};

export default swaggerDocument;
