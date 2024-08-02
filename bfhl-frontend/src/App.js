import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [jsonInput, setJsonInput] = useState('');
    const [response, setResponse] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleSubmit = async () => {
        try {
            const parsedData = JSON.parse(jsonInput);
            const res = await axios.post('http://127.0.0.1:5000/create_college', parsedData);
            setResponse(res.data);
        } catch (error) {
            alert('Invalid JSON input');
        }
    };

    const handleOptionChange = (event) => {
        const value = Array.from(event.target.selectedOptions, option => option.value);
        setSelectedOptions(value);
    };

    const renderResponse = () => {
        if (!response) return null;
        return (
            <div>
                {selectedOptions.includes('Alphabets') && (
                    <div>Alphabets: {response.alphabets.join(', ')}</div>
                )}
                {selectedOptions.includes('Numbers') && (
                    <div>Numbers: {response.numbers.join(', ')}</div>
                )}
                {selectedOptions.includes('Highest alphabet') && (
                    <div>Highest Alphabet: {response.highest_alphabet.join(', ')}</div>
                )}
            </div>
        );
    };

    return (
        <div className="App">
            <h1>BFHL Challenge</h1>
            <textarea value={jsonInput} onChange={(e) => setJsonInput(e.target.value)} placeholder='Enter JSON here'></textarea>
            <button onClick={handleSubmit}>Submit</button>
            <div>
                <label>Filter Options:</label>
                <select multiple={true} onChange={handleOptionChange}>
                    <option value="Alphabets">Alphabets</option>
                    <option value="Numbers">Numbers</option>
                    <option value="Highest alphabet">Highest alphabet</option>
                </select>
            </div>
            <div>
                {renderResponse()}
            </div>
        </div>
    );
}

export default App;
