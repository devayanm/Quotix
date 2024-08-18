const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

const scrapeNews = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://example-news-site.com'); // Replace with actual news site

  const content = await page.content();
  const $ = cheerio.load(content);

  const articles = [];
  $('.article').each((i, element) => {
    articles.push({
      title: $(element).find('.title').text(),
      summary: $(element).find('.summary').text(),
      link: $(element).find('a').attr('href')
    });
  });

  await browser.close();
  return articles;
};

module.exports = { scrapeNews };
