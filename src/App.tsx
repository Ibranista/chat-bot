import { useState } from 'react'
import './App.css'

const randomSurpriseSelector = (options: string[]) => {
  const randomIndex = Math.floor(Math.random() * options.length);
  return options[randomIndex];
}

function App() {
  const [error, setError] = useState('Something Went Wrong! ');
  const [value, setValue] = useState('');
  const [answer, setAnswer] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  // surprise question options
  const options = [
    'When is new years ?',
    'When is halloween ?',
    'When is thanksgiving ?',
  ];

  const getResponse = async (question: string) => {
    if (!value) {
      setError('Please ask a question');
      return;
    }

    try {
      const options = {
        method: 'POST',
        body: JSON.stringify({
          history: chatHistory,
          message: value
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }

      const response = await fetch('http://localhost:5000/gemini', options);
      const data = await response.text();

      console.log('my data', data);

    } catch (e: unknown) {
      console.log(e);
      setError('Something went wrong');
    }
  }

  return (
    <>
      <button onClick={
        () => {
          const answer = randomSurpriseSelector(options);
          setError('');
          setValue(answer);
        }
      }>Suprise me</button>
      <input type="text" name="" id="" placeholder="when is new years ?" value={value} />
      {!error && <button
        onClick={() => getResponse(value)}
      >Askme</button> || <button>Clear</button>}
      <p className="answer">{answer}</p>
    </>
  )
}

export default App
