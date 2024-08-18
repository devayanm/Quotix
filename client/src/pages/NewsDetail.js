import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, CircularProgress, Card, CardContent, CardMedia } from '@mui/material';
import axios from 'axios';

const NewsDetail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`/api/news/${id}`);
        setArticle(response.data);
      } catch (error) {
        setError('Error loading the article');
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (loading) return <CircularProgress />;
  if (error) return <Typography variant="h6">{error}</Typography>;

  return (
    <Container maxWidth="md">
      <Card>
        {article.imageUrl && (
          <CardMedia component="img" height="300" image={article.imageUrl} alt={article.title} />
        )}
        <CardContent>
          <Typography variant="h4" gutterBottom>{article.title}</Typography>
          <Typography variant="subtitle1" color="textSecondary" gutterBottom>
            {new Date(article.publishedAt).toLocaleDateString()}
          </Typography>
          <Typography variant="body1" gutterBottom>{article.fullText}</Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default NewsDetail;
