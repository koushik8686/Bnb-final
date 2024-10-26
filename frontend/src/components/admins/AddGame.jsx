import React, { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';




export function AddGame() {

  const [game, setGame] = useState({
    eventName: '',
    singleplayer: false,
    multiplayer: false,
    date: '',
    num_of_players: 0,
    start_time: '',
    end_time: '',
    judges: [{ id: '', name: '' }]
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setGame(prevGame => ({
      ...prevGame,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleJudgeChange = (index, value) => {
    console.log("Selected value:", value);
    console.log("Available Judges:", Availablejudges);

    const selectedJudge = Availablejudges.find(judge => judge._id === value);
    if (selectedJudge) {
        const updatedJudges = [...game.judges];
        updatedJudges[index] = { _id: selectedJudge._id, name: selectedJudge.name };
        setGame(prevGame => ({ ...prevGame, judges: updatedJudges }));
    } else {
        console.error(`Judge with value ${value} not found in Availablejudges`);
    }
};



  const addJudge = () => {
    setGame(prevGame => ({ ...prevGame, judges: [...prevGame.judges, { _id: '', name: '' }] }));
  };

  const removeJudge = (index) => {
    setGame(prevGame => ({ ...prevGame, judges: prevGame.judges.filter((_, i) => i !== index) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:4000/admin/addgame', { game })
      .then(response => console.log(response))
      .catch(error => console.error(error));
  };
  const [Availablejudges, setAvailablejudges] = useState([])
  useEffect(() => {
    console.log("sending data");
    axios.get('http://localhost:4000/admin/getjudges')
     .then(res => {
       console.log(res);
        setAvailablejudges(res.data.map(({ _id, name }) => ({ _id, name })));
        console.log(Availablejudges);
      })
     .catch(err => {
        console.error(err);
      });
   }, []);
  
  const styles = {
    container: {
      width: '80%',
      margin: '0 auto',
      fontFamily: 'Arial, sans-serif',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
    },
    input: {
      padding: '8px',
      fontSize: '16px',
      borderRadius: '4px',
      border: '1px solid #ccc',
    },
    checkbox: {
      marginRight: '8px',
    },
    button: {
      padding: '10px',
      fontSize: '16px',
      backgroundColor: '#4CAF50',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
    },
    judgeContainer: {
      display: 'flex',
      gap: '10px',
      alignItems: 'center',
    },
    removeButton: {
      padding: '5px 10px',
      fontSize: '14px',
      backgroundColor: '#f44336',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
    },
  };

  return (
    <div  style={styles.container}>
      <h2>Add a Game</h2>
      <form className='text-black' onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="eventName"
          value={game.eventName}
          onChange={handleChange}
          placeholder="Event Name"
          required
          style={styles.input}
        />
        
        <div>
          <label>
            <input
              type="checkbox"
              name="singleplayer"
              checked={game.singleplayer}
              onChange={handleChange}
              style={styles.checkbox}
            />
            Singleplayer
          </label>
        </div>
        
        <div>
          <label>
            <input
              type="checkbox"
              name="multiplayer"
              checked={game.multiplayer}
              onChange={handleChange}
              style={styles.checkbox}
            />
            Multiplayer
          </label>
        </div>
        
        <input
          type="date"
          name="date"
          value={game.date}
          onChange={handleChange}
          required
          style={styles.input}
        />
        
        <input
          type="time"
          name="start_time"
          value={game.start_time}
          onChange={handleChange}
          required
          style={styles.input}
        />
        
        <input
          type="time"
          name="end_time"
          value={game.end_time}
          onChange={handleChange}
          required
          style={styles.input}
        />
        
        <input
          type="number"
          name="num_of_players"
          value={game.num_of_players}
          onChange={handleChange}
          required
          style={styles.input}
        />
        
        <h3>Judges</h3>
        {game.judges.map((judge, index) => (
          <div key={index} style={styles.judgeContainer}>
          <select onChange={(e) => handleJudgeChange(index, e.target.value)}>
    <option value="">Select Judge</option>
    {Availablejudges.map(judge => (
        <option key={judge._id} value={judge._id}>
            {judge.name}
        </option>
    ))}
</select>

            {index > 0 && (
              <button
                type="button"
                onClick={() => removeJudge(index)}
                style={styles.removeButton}
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={addJudge} style={styles.button}>
          Add Judge
        </button>
        
        <button type="submit" style={styles.button}>Add Game</button>
      </form>
    </div>
  );
}
