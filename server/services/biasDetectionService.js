const axios = require('axios');

const analyzeBias = async (text) => {
  try {
    const response = await axios.post('http://localhost:5001/analyze', { text });
    console.log('Sentiment analysis result:', response.data); // Debugging
    const sentiment = response.data[0].label;

    if (sentiment === 'LABEL_0') return 'negative';
    if (sentiment === 'LABEL_1') return 'positive';
    return 'neutral';
  } catch (error) {
    console.error('Error analyzing sentiment:', error);
    return 'neutral';
  }
};

const neutralizeContent = (text) => {
  return new Promise((resolve, reject) => {
    exec(`python3 ${path.join(__dirname, 'neutralize_content.py')} "${text}"`, (error, stdout, stderr) => {
      if (error) {
        reject(`Error executing Python script: ${error.message}`);
        return;
      }
      if (stderr) {
        reject(`Python script stderr: ${stderr}`);
        return;
      }
      try {
        resolve(stdout.trim());
      } catch (err) {
        reject(`Error parsing Python script output: ${err.message}`);
      }
    });
  });
};

module.exports = { analyzeBias, neutralizeContent };
