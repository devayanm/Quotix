const User = require('../models/userModel');
const { scrapeNews } = require('../services/newsService');
const { analyzeBias, neutralizeContent } = require('../services/biasDetectionService');

const getNews = async (req, res) => {
  try {
    const username = req.query.username;
    const user = username ? await User.findOne({ username }) : null;
    const preferences = user ? user.preferences : { region: 'us' };

    const articles = await scrapeNews(preferences);
    const processedArticles = await Promise.all(articles.map(async article => ({
      ...article,
      summary: neutralizeContent(article.summary),
      bias: await analyzeBias(article.summary)
    })));

    res.json(processedArticles);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching news', error: error.message });
  }
};

module.exports = { getNews };
