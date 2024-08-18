const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const axios = require('axios');

const newsSources = {
  'us': ['https://www.cnn.com', 'https://www.nytimes.com', 'https://www.washingtonpost.com'],
  'uk': ['https://www.bbc.com', 'https://www.theguardian.com', 'https://www.independent.co.uk'],
  'fr': ['https://www.lemonde.fr', 'https://www.lefigaro.fr', 'https://www.liberation.fr'],
  'de': ['https://www.derstandard.de', 'https://www.spiegel.de', 'https://www.zeit.de'],
  'jp': ['https://www.japantimes.co.jp', 'https://www.nikkei.com', 'https://www.asahi.com'],
};

const scrapeNews = async (preferences) => {
  const sources = newsSources[preferences.region] || [];
  const articles = [];

  for (const url of sources) {
    try {
      const response = await axios.get(url);
      const $ = cheerio.load(response.data);

      $('article').each((index, element) => {
        const title = $(element).find('h2').text();
        const summary = $(element).find('p').text();
        const link = $(element).find('a').attr('href');
        articles.push({ title, summary, link });
      });
    } catch (error) {
      console.error(`Error scraping news from ${url}:`, error);
    }
  }

  return articles;
};

module.exports = { scrapeNews };
