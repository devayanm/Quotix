const express = require('express');
const { getNews } = require('../controllers/newsController');

const router = express.Router();

// Define the route and use the getNews function from the controller
router.get('/news', getNews);

module.exports = router;
