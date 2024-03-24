import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import '../components/questionnaire.css';

function Form() {
  // State variables to store user responses
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
            <input type="checkbox" value="Category1" onChange={(e) => handleCategoryChange(e, setCategories1)} disabled={submitted} />
            Category 1
          </label>
          <label>
            <input type="checkbox" value="Category2" onChange={(e) => handleCategoryChange(e, setCategories1)} disabled={submitted} />
            Category 2
          </label>
          {/* Add more category checkboxes here */}
        </div>
        <div className="category-list">
          <p>Select more categories:</p>
          <label>
            <input type="checkbox" value="Category3" onChange={(e) => handleCategoryChange(e, setCategories2)} disabled={submitted} />
            Category 3
          </label>
          <label>
            <input type="checkbox" value="Category4" onChange={(e) => handleCategoryChange(e, setCategories2)} disabled={submitted} />
            Category 4
          </label>
          {/* Add more category checkboxes here */}
        </div>
        <button type="submit" disabled={submitted}>Submit</button>
      </form>
    </div>
  );
};

export default Form;