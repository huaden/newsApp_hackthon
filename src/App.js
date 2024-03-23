import logo from './logo.svg';
import Button from './components/Button';
import SearchBar from './components/SearchBar';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p className="header">
          Stay informed, <span style={{textDecoration:'underline'}}>effortlessly.</span><br />
          All your favorite news, <span style={{textDecoration:'underline'}}>unified.</span>
        </p>
        <Button text="Curate your feed" />
        <SearchBar search={() => {}} />
      </header>
    </div>
  );
}

export default App;
