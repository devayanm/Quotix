import React from 'react';
import { Card, CardContent, Typography, CardActions, Button, CardMedia } from '@mui/material';
import { styled } from '@mui/system';
import { Link } from 'react-router-dom';

const HoverCard = styled(Card)(({ theme }) => ({
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: theme.shadows[6],
  },
}));

const NewsCard = ({ title, summary, imageUrl, link, id }) => {
  return (
    <HoverCard sx={{ maxWidth: 345, marginBottom: 4 }}>
      {imageUrl && (
        <CardMedia
          component="img"
          height="180"
          image={imageUrl}
          alt={title}
        />
      )}
      <CardContent>
        <Typography variant="h6" component="div" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" noWrap>
          {summary}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          component={Link}
          to={`/news/${id}`}
          variant="outlined"
        >
          Read More
        </Button>
        <Button
          size="small"
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          variant="contained"
          color="primary"
        >
          Source
        </Button>
      </CardActions>
    </HoverCard>
  );
};

export default NewsCard;
