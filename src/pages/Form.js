import './App.css';
import Button from '../components/Button';
import { Link } from 'react-router-dom';

function Form() {

    return (
        <div className='App'>
            <header className='App-header'>
                <p className="header">Tell us about yourself!</p>
                <iframe src='https://forms.gle/5nE9wcQaWdXXAqfYA' title='Form' width='50%' height='400' />
                <Link to='/news'>
                    <Button text='Continue' />
                </Link>
            </header>
        </div>
    );
}

export default Form;