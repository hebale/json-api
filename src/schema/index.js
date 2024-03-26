const schemas = [
  {
    title: "JSON-API",
    descriptiion: "",
    fileMatch: ["*"],
    schema: {
      type: "object",
      properties: {
        path: {
          type: "string",
          pattern: "^/([a-z])$",
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
                enum: ["GET", "POST", "PULL", "PATCH", "DELETE"],
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
        body: {
          type: "object",
        },
      },
      required: ["path", "headers", "methods", "body"],
    },
  },
];

export default schemas;
