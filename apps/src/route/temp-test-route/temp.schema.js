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

const getManyResponseSchema = {
  200: {
    type: 'object',
    properties: {
      data: {
        type: 'array',
        items: postResponseSchema[201],
      },
    },
  },
};

module.exports = {
  postRequestSchema,
  postResponseSchema,
  getManyResponseSchema,
};
