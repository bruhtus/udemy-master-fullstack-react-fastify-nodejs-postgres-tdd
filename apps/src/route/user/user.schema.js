const postRequestSchema = {
  type: 'object',
  properties: {
    first_name: {
      type: 'string',
    },
    middle_name: {
      type: 'string',
    },
    last_name: {
      type: 'string',
    },
    password: {
      type: 'string',
    },
    email: {
      type: 'string',
      format: 'email',
    },
  },
  required: ['first_name', 'password', 'email'],
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
            format: 'uuid',
          },
        },
      },
    },
    required: ['data'],
  },
  400: {
    type: 'object',
    properties: {
      statusCode: {
        type: 'integer',
      },
      error: {
        type: 'string',
      },
      message: {
        type: 'string',
      },
    },
  },
};

const paramsSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      format: 'uuid',
    },
  },
};

const getByIdResponseSchema = {
  200: {
    type: 'object',
    properties: {
      data: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            format: 'uuid',
          },
          name: {
            type: 'string',
          },
          email: {
            type: 'string',
            format: 'email',
          },
        },
      },
    },
  },
  400: {
    type: 'object',
    properties: {
      statusCode: {
        type: 'integer',
      },
      error: {
        type: 'string',
      },
      message: {
        type: 'string',
      },
    },
  },
};

module.exports = {
  getByIdResponseSchema,
  postRequestSchema,
  postResponseSchema,
  paramsSchema,
};
