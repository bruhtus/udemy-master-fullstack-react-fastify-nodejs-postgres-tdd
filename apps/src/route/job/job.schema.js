const postRequestSchema = {
  type: 'object',
  properties: {
    title: {
      type: 'string',
    },
    description: {
      type: 'string',
    },
    skills: {
      type: 'string',
    },
    min_budget: {
      type: 'string',
    },
    max_budget: {
      type: 'string',
    },
    expired_at: {
      type: 'string',
      format: 'date',
    },
    user_id: {
      type: 'string',
      format: 'uuid',
    },
  },
  required: [
    'title',
    'description',
    'skills',
    'min_budget',
    'max_budget',
    'user_id',
  ],
};

const getManyResponseSchema = {
  200: {
    type: 'object',
    properties: {
      data: {
        type: 'array',
        items: {
          type: 'object',
          properties: postRequestSchema.properties,
        },
      },
    },
    required: ['data'],
  },
};

const querySchema = {
  type: 'object',
  properties: {
    limit: {
      type: 'integer',
    },
    offset: {
      type: 'integer',
    },
  },
  required: ['limit', 'offset'],
};

module.exports = {
  postRequestSchema,
  getManyResponseSchema,
  querySchema,
};
