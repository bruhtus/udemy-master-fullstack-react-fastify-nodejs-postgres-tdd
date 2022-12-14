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
      data: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
          },
        },
        required: ['id'],
      },
    },
  },
};

const getManyResponseSchema = {
  200: {
    type: 'object',
    properties: {
      data: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
            },
            title: {
              type: 'string',
            },
          },
        },
      },
    },
  },
};

module.exports = {
  postRequestSchema,
  postResponseSchema,
  getManyResponseSchema,
};
