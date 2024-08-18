const User = require('../models/userModel');
const { scrapeNews } = require('../services/newsService');
const { analyzeBias, neutralizeContent } = require('../services/biasDetectionService');

const getNews = async (req, res) => {
  try {
    // Retrieve user preferences from query parameters or session
    const username = req.query.username;
    const user = username ? await User.findOne({ username }) : null;
    const preferences = user ? user.preferences : {};

    // Scrape news based on user preferences
    const articles = await scrapeNews(preferences);
    
    // Process articles to neutralize content and detect bias
    const processedArticles = articles.map(article => ({
      ...article,
      summary: neutralizeContent(article.summary),
      bias: analyzeBias(article.summary)
    }));
    
    // Send the processed articles as response
    res.json(processedArticles);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching news' });
  }
};

module.exports = { getNews };
