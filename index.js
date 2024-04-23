const fs = require('fs');
const { Octokit } = require('@octokit/rest');
const { createCanvas } = require('canvas');
const { fetchStats, drawStats } = require('github-readme-stats');

async function main() {
  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
  });

  const stats = await fetchStats(octokit, {
    username: 'munuhee',
  });

  const canvas = createCanvas(400, 200);
  const ctx = canvas.getContext('2d');

  drawStats(ctx, stats);

  const buffer = canvas.toBuffer('image/png');

  fs.writeFileSync('github-stats.png', buffer);
}

main().catch(console.error);
