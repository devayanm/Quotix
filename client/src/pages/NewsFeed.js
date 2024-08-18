import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchNews } from '../store/newsSlice';

const NewsFeed = () => {
  const dispatch = useDispatch();
  const articles = useSelector(state => state.news.articles);
  const status = useSelector(state => state.news.status);
  const error = useSelector(state => state.news.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchNews());
    }
  }, [dispatch, status]);

  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'failed') return <p>{error}</p>;

  return (
    <div>
      <h1>News Feed</h1>
      {articles.map((article, index) => (
        <div key={index}>
          <h2>{article.title}</h2>
          <p>{article.summary}</p>
          <p><strong>Bias:</strong> {article.bias}</p>
          <a href={article.link} target="_blank" rel="noopener noreferrer">Read more</a>
        </div>
      ))}
    </div>
  );
};

export default NewsFeed;
