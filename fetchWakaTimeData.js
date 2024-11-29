const axios = require('axios');
const fs = require('fs');

const WAKATIME_API_KEY = process.env.WAKATIME_API_KEY;
const WAKATIME_API_URL = `https://wakatime.com/api/v1/users/current/stats/last_7_days?api_key=${WAKATIME_API_KEY}`;

async function fetchWakaTimeStats() {
  try {
    const response = await axios.get(WAKATIME_API_URL);
    const data = response.data.data;

    const stats = `
# WakaTime Stats for Last 7 Days

## 🕒 Time Spent on Projects:
${data.projects
  .map((project) => `- ${project.name}: ${project.text}`)
  .join('\n')}

## 📂 Languages Used:
${data.languages
  .map((language) => `- ${language.name}: ${language.text}`)
  .join('\n')}
    `;

    fs.writeFileSync('WakaTimeStats.md', stats);
    console.log('WakaTime stats updated successfully!');
  } catch (error) {
    console.error('Error fetching WakaTime stats:', error.message);
  }
}

fetchWakaTimeStats();
