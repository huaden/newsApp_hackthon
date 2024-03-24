import Button from '../components/Button';
import SearchBar from '../components/SearchBar';
import '../components/components.css';
import './App.css';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="App">
      <header className="App-header">
        <p className="header">
          Stay informed, <span style={{textDecoration:'underline'}}>effortlessly.</span><br />
          All your favorite news, <span style={{textDecoration:'underline'}}>unified.</span>
        </p>
        <Link to="/form">
            <Button text="Curate your feed" />
        </Link>
        <p className='header'>Or...</p>
        <SearchBar onSearch={(searchTerm) => console.log(searchTerm)} />
      </header>
    </div>
  );
}

export default Home;
