import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';

function Form() {
  // State variables to store user responses
  const [name, setName] = useState('');
  const [categories1, setCategories1] = useState([]);
  const [categories2, setCategories2] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  // Handler function for name input change
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  // Handler function for category checkboxes change
  const handleCategoryChange = (event, setCategories) => {
    const { value, checked } = event.target;
    if (!submitted) { // Allow changes only if form is not submitted
      if (checked) {
        setCategories(prevCategories => [...prevCategories, value]);
      } else {
        setCategories(prevCategories => prevCategories.filter(category => category !== value));
      }
    }
  };

  // Handler function for form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true); // Mark form as submitted
    // Combine all responses into an object and do something with it (e.g., send to server)
    const responses = {
      name,
      categories1,
      categories2
    };
    console.log(responses);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Enter your name:
        <input type="text" value={name} onChange={handleNameChange} />
      </label>
      <div>
        <p>What type of Information are you interested in:</p>
        <label>
          <input type="checkbox" value="Business" onChange={(e) => handleCategoryChange(e, setCategories1)} disabled={submitted} />
          Business
        </label>
        <label>
          <input type="checkbox" value="Entertainment" onChange={(e) => handleCategoryChange(e, setCategories1)} disabled={submitted} />
          Entertainment
        </label>
        <label>
          <input type="checkbox" value="Technology" onChange={(e) => handleCategoryChange(e, setCategories1)} disabled={submitted} />
          Technology
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
          <input type="checkbox" value="General" onChange={(e) => handleCategoryChange(e, setCategories1)} disabled={submitted} />
          General
        </label>
        {/* Add more category checkboxes here */}
      </div>
      <div>
        <p>What popular news service do you use currently:</p>
        <label>
          <input type="checkbox" value="New_York_Times" onChange={(e) => handleCategoryChange(e, setCategories2)} disabled={submitted} />
          New York Times
        </label>
        <label>
          <input type="checkbox" value="The_Washington_Post" onChange={(e) => handleCategoryChange(e, setCategories2)} disabled={submitted} />
          The Washington Post
        </label>
        <label>
          <input type="checkbox" value="BBC" onChange={(e) => handleCategoryChange(e, setCategories2)} disabled={submitted} />
          BBC
        </label>
        <label>
          <input type="checkbox" value="CNN" onChange={(e) => handleCategoryChange(e, setCategories2)} disabled={submitted} />
          CNN
        </label>
        <label>
          <input type="checkbox" value="Fox_News" onChange={(e) => handleCategoryChange(e, setCategories2)} disabled={submitted} />
          Fox News
        </label>
        <label>
          <input type="checkbox" value="NBC" onChange={(e) => handleCategoryChange(e, setCategories2)} disabled={submitted} />
          NBC
        </label>
        {/* Add more category checkboxes here */}
      </div>
      <button type="submit" disabled={submitted}>Submit</button>
    </form>
  );
};

export default Form;