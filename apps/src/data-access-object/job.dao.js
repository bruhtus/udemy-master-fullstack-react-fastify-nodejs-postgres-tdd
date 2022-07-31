const luxon = require('luxon');

async function createJob(db, job) {
  try {
    const { id } = await db.one(
      'INSERT INTO jobs_table(title, description, skills, min_budget, max_budget, expired_at, user_id) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id',
      [
        job.title,
        job.description,
        job.skills,
        job.min_budget,
        job.max_budget,
        job.expired_at,
        job.user_id,
      ]
    );

    return id;
  } catch (error) {
    throw new Error('Failed to create a job');
  }
}

// limit is how many items per page.
// offset is how many items we need to skip.
async function getAllJobs(db, limit, offset) {
  const today = luxon.DateTime.now().toFormat('yyyy-MM-dd');

  const jobs = await db.query(
    'SELECT * FROM jobs_table WHERE expired_at >= $1 ORDER BY created_at LIMIT $2 OFFSET $3',
    [today, limit, offset]
  );

  return jobs;
}

module.exports = { createJob, getAllJobs };
