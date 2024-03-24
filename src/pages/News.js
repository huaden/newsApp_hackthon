import React, { useState, useEffect } from 'react';
import Button from '../components/Button';
import NewsBlock from '../components/NewsBlock';
import { Link } from 'react-router-dom';
import { useSearchParams } from "react-router-dom";


function News() {
  const [newsData, setNewsData] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();


  useEffect(() => {
    fetchNewsData();
  }, []);

  const fetchNewsData = async () => {
    try {
      const queryVal = searchParams.get('query')
      console.log(queryVal);
      const response = await fetch(`/news_query?query=${queryVal}`);
      const data = await response.json();
      setNewsData(data);
    } catch (error) {
      console.error('Error fetching news data:', error);
    }
  };

  const handleLeftClick = async () => {
    // Fetch a new article when the left side is clicked
    await fetchNewsData();
  };

  const handleRightClick = (url) => {
    // Redirect to the article URL when the right side is clicked
    window.open(url, '_blank');
  };

  return (
    <div className='App'>
      <header className='App-header'>
        <p className="header">Latest News</p>
        {newsData && (
          <div>
            <ul>
              {newsData.articles.map((article, index) => (
                <div key={index} style={{ display: 'flex', flexDirection: 'row' }}>
                  <div onClick={handleLeftClick} style={{ alignContent: 'center', cursor: 'pointer', padding: '1em', fontSize: '3em', color: 'red'}}>←</div>
                  <NewsBlock
                    title={article.title}
                    description={article.description}
                    source={article.source.name}
                    polarity={article.polarity}
                    subjectivity={article.subjectivity}
                    urlToImage={article.urlToImage}
                  />
                  <div onClick={() => handleRightClick(article.url)} style={{ alignContent: 'center', cursor: 'pointer', padding: '1em', fontSize: '3em', color: 'green'}}>→</div>
                </div>
              ))}
            </ul>
          </div>
        )}
        <Link to='/' style={{ paddingBottom: '1em' }}>
          <Button text='Go Back' />
        </Link>
      </header>
    </div>
  );
}

export default News;