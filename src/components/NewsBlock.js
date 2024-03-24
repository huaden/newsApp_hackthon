import * as React from 'react';
import '../pages/App.css';

function NewsBlock({ title, description, source, polarity, subjectivity, url, urlToImage }) {
    const getPolarityColor = (polarity) => {
        if (polarity < -.1) return 'red';
        if (polarity > .1) return 'green';
        return '#153243';
    };

    const getSubjectivityColor = (subjectivity) => {
        if (subjectivity > 0.1) return 'blue';
        if (subjectivity > 0.66) return 'red';
        return '#153243';
    };

    const subjectivityToWord = (subjectivity) => {
        if (subjectivity >= 0 && subjectivity <= 0.1) {
          return 'neutral';
        } else if (subjectivity > 0.1 && subjectivity <= 0.33) {
          return 'small';
        } else if (subjectivity > 0.33 && subjectivity <= 0.66) {
          return 'moderate';
        } else if (subjectivity > 0.66 && subjectivity <= 1) {
          return 'high';
        } else {
          return 'invalid value';
        }
      }
    
      const polarityToWord = (polarity) => {
        if (polarity >= -1 && polarity < -0.66) {
          return 'Very negative';
        } else if (polarity >= -0.66 && polarity < -0.33) {
          return 'Negative';
        } else if (polarity >= -0.33 && polarity < -0.1) {
          return 'Slightly Negative';
        } else if (polarity >= -0.1 && polarity <= 0.1) {
          return 'Neutral';
        } else if (polarity > 0.1 && polarity <= 0.33) {
          return 'Slightly Positive';
        } else if (polarity > 0.33 && polarity <= 0.66) {
          return 'Positive';
        } else if (polarity > 0.66 && polarity <= 1) {
          return 'Very Positive';
        } else {
          return 'invalid value';
        }
      }

    return (
        <div style={{ margin: 'auto', width: '50%', backgroundColor: '#FFD791', borderRadius: '.5em', boxShadow: '12px 12px 2px 1px rgba(0, 0, 255, .2)', border: '2px solid black', padding: '1em' }}>
            <header className="small-header" style={{ textDecoration: 'underline' }}>{title}</header>
            <img src={urlToImage} alt={title} style={{ width: '100%', height: 'auto', border: "3px solid black", marginTop: "1em" }} />
            <p style={{ color: "#153243", backgroundColor: "white", padding: ".25em", border: "3px solid black" }}>{description}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <p style={{ color: "#153243" }}>Source: <span style={{ textDecoration: 'underline' }}>{source}</span></p>
                <p style={{ color: getPolarityColor(polarity) }}>Polarity: <span style={{ textDecoration: 'underline' }}>{polarityToWord(polarity)}</span></p>
                <p style={{ color: getSubjectivityColor(subjectivity) }}>Subjectivity: <span style={{ textDecoration: 'underline' }}>{subjectivityToWord(subjectivity)}</span></p>
            </div>
        </div>
    );
}

export default NewsBlock;