import './App.css';
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function App() {
  const word = "Once you have finished typing this lesson, look away from the computer for a few short."
  const [startTime, setStartTime] = useState(null);
  const [currentText, setCurrentText] = useState("");
  const [typingText, setTypingText] = useState(word);
  const [typingSpeed, setTypingSpeed] = useState(0);
  const [accuracy, setAccuracy] = useState(0);

  const handleChange = (event) => {
    if (!startTime) {
      setStartTime(Date.now());
    }
    const { value } = event.target;
    let correct = 0;
    let wrong = 0;
    for (let i = 0; i < value.length; i++) {
      if (typingText[i] === value[i]) {
        correct++
      } else {
        wrong++
      }
    }
    setCurrentText(value);
    setAccuracy(((correct / (correct + wrong)) * 100).toFixed(2));
    setTypingSpeed((value.length / (Date.now() - startTime) * 60 * 1000).toFixed(2));
  }

  const handleSubmit = () => {
    setTypingText("");
    setCurrentText("");
    alert(`Your typing speed is ${typingSpeed} WPM and accuracy is ${accuracy}%`);
  }

  return (
    <div className="typing-page">
      <h1>LEARN TYPING</h1>
      <form onSubmit={handleSubmit}>
        <div className="typing-text" style={{ color: currentText === typingText ? "green" : "red" }}>
          {typingText.split("").map((char, index) => {
            return <span key={index} className={char === currentText[index] ? "correct" : "wrong"}>{char}</span>
          })}
        </div>
        <div className='textandsubmit'>
          <TextField
            id="outlined-multiline-static"
            label="Type here"
            multiline
            rows={4}
            onChange={handleChange}
            value={currentText}
          />
          <Button type='submit' variant="contained">Submit</Button>
        </div>
      </form>
    </div>
  );
}

export default App;
