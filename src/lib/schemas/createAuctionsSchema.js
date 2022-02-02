const schema = {
  type: "object",
  properties: {
    body: {
      type: "object",
      properties: {
        item: {
          type: "object",
          properties: {
            title: {
              type: "string",
            },
          },
          required: ["title"],
        },
      },
      required: ["item"],
    },
  },
  required: ["body"],
};

export default schema;
