import { Widget } from '@typeform/embed-react';
import { useNavigate } from 'react-router-dom';

function Form() {
    const navigate = useNavigate();

    return (
        <Widget id="vQewGVqC" style={{height: '100vh'}} onSubmit={() => {navigate("/")}}/>
    );
}

export default Form;