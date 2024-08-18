import React, { useState, useEffect } from 'react';
import { Grid, Container, CircularProgress, Typography } from '@mui/material';
import NewsCard from '../components/NewsCard';
import { fetchNews } from '../services/apiService';

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const username = 'exampleUser';

  useEffect(() => {
    const loadNews = async () => {
      try {
        const data = await fetchNews(username);
        setArticles(data);
      } catch (err) {
        setError('Error loading news: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, [username]);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Container maxWidth="lg">
      <Grid container spacing={4}>
        {articles.map((article) => (
          <Grid item xs={12} sm={6} md={4} key={article.id}>
            <NewsCard
              title={article.title}
              summary={article.summary}
              imageUrl={article.imageUrl}
              link={article.link}
              id={article.id}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
