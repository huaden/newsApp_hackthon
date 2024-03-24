import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import '../components/questionnaire.css';

function Form() {
    const [name, setName] = useState('');
  const [categories1, setCategories1] = useState([]);
  const [categories2, setCategories2] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleCategoryChange = (event, setCategories) => {
    const { value, checked } = event.target;
    if (!submitted) {
      if (checked) {
        setCategories(prevCategories => [...prevCategories, value]);
      } else {
        setCategories(prevCategories => prevCategories.filter(category => category !== value));
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    const responses = {
      name,
      categories1,
      categories2
    };
    console.log(responses);
  };

  return (
    <div className="questionnaire-container">
      <form onSubmit={handleSubmit} className="questionnaire-form">
        <label>
          Enter your name:
          <input type="text" value={name} onChange={handleNameChange} />
        </label>
        <div className="category-list">
          <p>Select categories:</p>
          <label>
            <input type="checkbox" value="Business" onChange={(e) => handleCategoryChange(e, setCategories1)} disabled={submitted} />
            Business
          </label>
          <label>
            <input type="checkbox" value="Entertainment" onChange={(e) => handleCategoryChange(e, setCategories1)} disabled={submitted} />
            Entertainment
          </label>
          <label>
            <input type="checkbox" value="Health" onChange={(e) => handleCategoryChange(e, setCategories1)} disabled={submitted} />
            Health
          </label>
          <label>
            <input type="checkbox" value="Science" onChange={(e) => handleCategoryChange(e, setCategories1)} disabled={submitted} />
            Science
          </label>
          <label>
            <input type="checkbox" value="Sports" onChange={(e) => handleCategoryChange(e, setCategories1)} disabled={submitted} />
            Sports
          </label>
          <label>
            <input type="checkbox" value="Technology" onChange={(e) => handleCategoryChange(e, setCategories1)} disabled={submitted} />
            Technology
          </label>
          <label>
            <input type="checkbox" value="General" onChange={(e) => handleCategoryChange(e, setCategories1)} disabled={submitted} />
            General
          </label>
          {/* Add more category checkboxes here */}
        </div>
        <div className="category-list">
          <p>Select more categories:</p>
          <label>
            <input type="checkbox" value="New_York_Times" onChange={(e) => handleCategoryChange(e, setCategories2)} disabled={submitted} />
            New York Times
          </label>
          <label>
            <input type="checkbox" value="BBC" onChange={(e) => handleCategoryChange(e, setCategories2)} disabled={submitted} />
            BBC
          </label>
          <label>
            <input type="checkbox" value="Fox_News" onChange={(e) => handleCategoryChange(e, setCategories2)} disabled={submitted} />
            Fox News
          </label>
          <label>
            <input type="checkbox" value="The_Washington_Post" onChange={(e) => handleCategoryChange(e, setCategories2)} disabled={submitted} />
            The Washington Post
          </label>
          <label>
            <input type="checkbox" value="CNN" onChange={(e) => handleCategoryChange(e, setCategories2)} disabled={submitted} />
            CNN
          </label>
          {/* Add more category checkboxes here */}
        </div>
        <button type="submit" disabled={submitted}>Submit</button>
      </form>
    </div>
  );
};

export default Form;