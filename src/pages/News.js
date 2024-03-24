import React, { useState, useEffect } from 'react';
import Button from '../components/Button';
import { Link } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';

function News() {
  const [newsData, setNewsData] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("business");
  const [queryParameters] = useSearchParams();

  useEffect(() => {
    fetchNewsData();
  }, []);

  const fetchNewsData = async () => {
    try {
      const queryVal = queryParameters.get('query');
      const response = await fetch('/news_query?query=${queryVal}');
      console.log(queryVal)
      const data = await response.json();
      setNewsData(data);
    } catch (error) {
      console.error('Error fetching news data:', error);
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className='App'>
      <header className='App-header'>
        <p className="header">Latest News</p>
        <div>
          <select value={selectedCategory} onChange={(e) => handleCategoryChange(e.target.value)}>
            <option value="business">Business</option>
            <option value="entertainment">Entertainment</option>
            <option value="general">General</option>
            <option value="health">Health</option>
            <option value="science">Science</option>
            <option value="sports">Sports</option>
            <option value="technology">Technology</option>
          </select>
        </div>
        {newsData && (
          <div>
            <ul>
              {newsData.articles.map((article, index) => (
                <li key={index}>
                  <h3>{article.title}</h3>
                  <p>{article.description}</p>
                  <p>Source: {article.source.name}</p>
                  <a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
                </li>
              ))}
            </ul>
          </div>
        )}
        <Link to='/'>
          <Button text='Go Back' />
        </Link>
      </header>
    </div>
  );
}

export default News;