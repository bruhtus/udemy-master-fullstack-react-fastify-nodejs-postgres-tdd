CREATE TABLE users_table (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name VARCHAR(100) NOT NULL,
  middle_name VARCHAR(100),
  last_name VARCHAR(100),
  password VARCHAR(100) NOT NULL,
  email VARCHAR(318) NOT NULL,
  created_at timestamptz NOT NULL DEFAULT NOW(),
  updated_at timestamptz NOT NULL DEFAULT NOW(),
  version UUID NOT NULL DEFAULT gen_random_uuid()
);
