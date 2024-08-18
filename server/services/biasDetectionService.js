const axios = require('axios');
const spacy = require('spacy');

const nlp = spacy.load('en_core_web_sm');

const neutralizeContent = (text) => {
  const doc = nlp(text);
  let neutralText = '';

  doc.forEach(token => {
    if (token.pos_ !== 'ADJ' && token.pos_ !== 'ADV') {
      neutralText += token.text + ' ';
    }
  });

  return neutralText.trim();
};

const analyzeBias = async (text) => {
  try {
    const response = await axios.post('http://localhost:5001/analyze', { text });
    const sentiment = response.data[0].label;

    if (sentiment === 'POSITIVE') return 'positive';
    if (sentiment === 'NEGATIVE') return 'negative';
    return 'neutral';
  } catch (error) {
    console.error('Error analyzing sentiment:', error);
    return 'neutral';
  }
};

module.exports = { analyzeBias, neutralizeContent };
