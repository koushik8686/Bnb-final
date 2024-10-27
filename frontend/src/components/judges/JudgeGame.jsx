import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const JudgeGame = () => {
  const { game } = useParams();
  const [gameData, setGameData] = useState(null);
  const [selectedWinners, setSelectedWinners] = useState({
    first: '',
    second: '',
    third: ''
  });

  useEffect(() => {
    const fetchGameData = async () => {
      try {
        const { data } = await axios.get(`http://localhost:4000/judge/getgamecompanydetails/${game}`);
        setGameData(data);
      } catch (error) {
        console.error('Error fetching game data:', error);
      }
    };

    fetchGameData();
  }, [game]);

  const handleWinnerSelection = (place, teamCode) => {
    setSelectedWinners(prev => ({ ...prev, [place]: teamCode }));
    console.log(selectedWinners);
  };

  const placeStyles = {
    first: {
      bg: 'bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500',
      text: 'text-yellow-900',
      border: 'border-yellow-600'
    },
    second: {
      bg: 'bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500',
      text: 'text-gray-900',
      border: 'border-gray-600'
    },
    third: {
      bg: 'bg-gradient-to-r from-orange-300 via-orange-400 to-orange-500',
      text: 'text-orange-900',
      border: 'border-orange-600'
    }
  };

  const submitRound = async () => {
    try {
      await axios.post('http://localhost:4000/judge/submitround/', { game, selectedWinners });
      alert('Round submitted successfully!');
    } catch (error) {
      console.error('Error submitting round:', error);
    }
  };

  const submitGame = async () => {
    try {
      // Make an API call to submit the final game
      await axios.post('http://localhost:4000/judge/submitgame/', { game, selectedWinners });
      alert('Game submitted successfully!');
    } catch (error) {
      console.error('Error submitting game:', error);
    }
  };

  // Only render if game status is not 'over'
  if (!gameData || gameData.status === 'over') {
    return <div className="min-h-screen flex items-center justify-center text-xl font-bold text-gray-900">Game is over.</div>;
  }

  const placesToShow = gameData.singleplayer ? ['first', 'second'] : ['first', 'second', 'third'];

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <motion.h1 
          className="text-4xl font-bold text-center text-gray-900 mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Judge: {gameData.eventname}
        </motion.h1>
        
        {placesToShow.map((place, index) => (
          <motion.div
            key={place}
            className={`${placeStyles[place].bg} rounded-lg p-6 shadow-lg ${placeStyles[place].border} border-2`}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className={`text-2xl font-semibold ${placeStyles[place].text} capitalize`}>{place} Place</h2>
              <div className={`w-10 h-10 rounded-full bg-white ${placeStyles[place].border} border-2 flex items-center justify-center ${placeStyles[place].text} font-bold`}>
                {index + 1}
              </div>
            </div>
            <select
              value={selectedWinners[place]}
              onChange={(e) => handleWinnerSelection(place, e.target.value)}
              className={`w-full p-2 rounded ${placeStyles[place].text} bg-white bg-opacity-50 border ${placeStyles[place].border}`}
            >
              <option value="">Select a team</option>
              {gameData.teams.map((team) => (
                <option key={team.TeamCode} value={team.TeamCode}>
                  {team.corporatecode}
                </option>
              ))}
            </select>
            {selectedWinners[place] && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4"
              >
                <h3 className={`text-lg font-medium ${placeStyles[place].text}`}>Team Members:</h3>
                <ul className={`list-disc list-inside ${placeStyles[place].text}`}>
                  {gameData.teams
                    .find(t => t.TeamCode === selectedWinners[place])
                    ?.players.map(player => (
                      <li key={player._id}>{player.name}</li>
                    ))}
                </ul>
              </motion.div>
            )}
          </motion.div>
        ))}

        <div className="flex justify-between mt-8 space-x-4">
          <motion.button
            className="flex-1 bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={submitRound}
          >
            Submit for this Round
          </motion.button>
          <motion.button
            className="flex-1 bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={submitGame}
          >
            Final Submit
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default JudgeGame;
