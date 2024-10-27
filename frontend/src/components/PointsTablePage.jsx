import bg from './bg.jpeg';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const TeamPointsTable = () => {
  const { game } = useParams();
  const [gameData, setGameData] = useState(null); // Initialize with null or empty array

  useEffect(() => {
    const fetchGameData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/games/${game}`);
        setGameData(response.data);
      } catch (error) {
        console.error("Error fetching game data:", error);
      }
    };

    fetchGameData(); // Call the function to fetch data
  }, [game]);

  // Check if gameData is not available yet
  if (!gameData) {
    return <div>Loading...</div>; // You can replace this with a spinner or loading animation
  }

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        backgroundRepeat: "none",
        backgroundSize: "cover",
        backgroundImage: `url(${bg})`,
      }}
      className="min-h-screen p-8 flex flex-col items-center justify-center"
    >
      <motion.h1
        className="text-4xl font-bold text-white mb-8"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Team Standings
      </motion.h1>
      <div className="w-full max-w-4xl bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl overflow-hidden shadow-2xl">
        <div className="p-6 space-y-4">
          {gameData.teams.map((team, index) => (
            <motion.div
              key={team.id}
              className="flex items-center bg-white bg-opacity-20 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out"
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-16 h-16 flex-shrink-0 bg-white bg-opacity-30 flex items-center justify-center rounded-l-lg">
                <img
                  src={team.image}
                  alt={`${team.name} logo`}
                  className="w-12 h-12 rounded-full"
                />
              </div>
              <div className="flex-grow p-4">
                <h2 className="text-xl font-semibold text-white">{team.name}</h2>
                <p className="text-sm text-gray-200">Position: {index + 1}</p>
              </div>
              <div className="w-24 h-full bg-white bg-opacity-30 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">{team.points}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamPointsTable;
