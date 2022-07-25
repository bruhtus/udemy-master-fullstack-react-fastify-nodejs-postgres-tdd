const postRequestSchema = {
  type: 'object',
  properties: {
    title: {
      type: 'string',
    },
  },
  required: ['title'],
};

const postResponseSchema = {
  201: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
      },
    },
    required: ['id'],
  },
};

module.exports = { postRequestSchema, postResponseSchema };
