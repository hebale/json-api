const schemas = [
  {
    title: "JSON-API",
    descriptiion: "",
    fileMatch: ["*.json"],
    schema: {
      type: "object",
      properties: {
        title: {
          type: "string",
        },
        description: {
          type: "string",
        },
        path: {
          type: "string",
          pattern: "((/([a-z0-9_-])+)+)(?![A-Z].)*",
        },
        headers: {
          type: "object",
        },
        methods: {
          type: "array",
          items: {
            properties: {
              type: {
                type: "string",
                enum: ["GET", "POST", "PATCH", "PUT", "DELETE"],
              },
              delay: {
                type: "number",
                exclusiveMinimum: 0,
              },
              status: {
                type: "number",
              },
              code: {
                type: "string",
              },
            },
            requierd: ["type", "delay", "status"],
          },
          minItems: 1,
        },
        response: {
          type: "object",
        },
      },
      required: ["title", "path", "headers", "methods", "body"],
    },
  },
];

export default schemas;
