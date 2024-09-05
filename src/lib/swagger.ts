import swaggerJSDoc from "swagger-jsdoc";

const options: swaggerJSDoc.Options = {
  definition: {
    "openapi": "3.0.0",
    "info": {
      "title": "My API",
      "version": "1.0.0"
    },
    "paths": {
      "/register": {
        "post": {
          "summary": "Create User",
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateUser"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Login Response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/LoginResponse"
                  }
                }
              }
            }
          }
        }
      },
      "/login": {
        "post": {
          "summary": "Login User",
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UserLogin"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Login Response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/LoginResponse"
                  }
                }
              }
            }
          }
        }
      },
      "/order": {
        "get": {
          "summary": "Create Order",
          "parameters": [
            {
              "name": "amount",
              "in": "query",
              "required": true,
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "reff",
              "in": "query",
              "required": true,
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "expired",
              "in": "query",
              "required": false,
              "schema": {
                "type": Date
              }
            },
            {
              "name": "name",
              "in": "query",
              "required": true,
              "schema": {
                "type": 'string'
              }
            },
            {
              "name": "hp",
              "in": "query",
              "required": true,
              "schema": {
                "type": 'string'
              }
            },
            {
              "name": "Sec-Token",
              "in": "header",
              "required": true,
              "description": "The token required for accessing the protected resource",
              "schema": {
                "type": "string",
                "default": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IlRlc3QxIiwiZW1haWwiOiJ0ZXN0MUBkZW1vLmNvbSIsImlhdCI6MTcyNTQ3NzE1OH0.cLPUmdvVX52hgB-ygg0zYOKWQNEY8fLMlPW4g-rUt7I"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Login Response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/LoginResponse"
                  }
                }
              }
            }
          }
        }
      },
      "/payment": {
        "get": {
          "summary": "Pay Order",
          "parameters": [
            {
              "name": "reff",
              "in": "query",
              "required": true,
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "Sec-Token",
              "in": "header",
              "required": true,
              "description": "The token required for accessing the protected resource",
              "schema": {
                "type": "string",
                "default": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IlRlc3QxIiwiZW1haWwiOiJ0ZXN0MUBkZW1vLmNvbSIsImlhdCI6MTcyNTQ3NzE1OH0.cLPUmdvVX52hgB-ygg0zYOKWQNEY8fLMlPW4g-rUt7I"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Login Response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/LoginResponse"
                  }
                }
              }
            }
          }
        }
      },
      "/status": {
        "get": {
          "summary": "Status Order",
          "parameters": [
            {
              "name": "reff",
              "in": "query",
              "required": true,
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "Sec-Token",
              "in": "header",
              "required": true,
              "description": "The token required for accessing the protected resource",
              "schema": {
                "type": "string",
                "default": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IlRlc3QxIiwiZW1haWwiOiJ0ZXN0MUBkZW1vLmNvbSIsImlhdCI6MTcyNTQ3NzE1OH0.cLPUmdvVX52hgB-ygg0zYOKWQNEY8fLMlPW4g-rUt7I"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Login Response",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/LoginResponse"
                  }
                }
              }
            }
          }
        }
      }
    },
    "components": {
      "schemas": {
        "CreateUser": {
          "type": "object",
          "properties": {
            // "id": {
            //   "type": "number"
            // },
            "name": {
              "type": "string"
            },
            "email": {
              "type": "string",
              "format": "email"
            },
            "password": {
              "type": "string"
            }
          },
          "required": ["name", "email", "password"]
        },
        "UserLogin": {
          "type": "object",
          "properties": {
            "email": {
              "type": "string",
              "format": "email"
            },
            "password": {
              "type": "string"
            }
          },
          "required": ["email", "password"]
        },
        "LoginResponse": {
          "type": "object",
          "properties": {
            "message": {
              "type": "string",
            },
          },
        },
        "Post": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string"
            },
            "title": {
              "type": "string"
            },
            "content": {
              "type": "string"
            },
            "authorId": {
              "type": "string"
            }
          },
          "required": ["id", "title", "content", "authorId"]
        }
      }
    }
  },
  apis: ["./routes/*.ts"]
};

export const specs = swaggerJSDoc(options);
