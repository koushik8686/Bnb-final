import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaUsers } from 'react-icons/fa';

export function Games() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get('http://localhost:4000/games/all'); // Replace with your API endpoint
        setGames(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching games:', error);
        setLoading(false);
      }
    };
    fetchGames();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-4xl font-bold mb-8 text-center text-[#6A0DAD]">Game List</h2>
      <div className="space-y-6">
        {games.length > 0 ? (
          games.map((game, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 flex flex-col border border-gray-200 hover:shadow-lg transition-shadow duration-300 relative"
            >
              {/* Event Name */}
              <div className="mb-3">
                <h3 className="text-lg font-semibold text-gray-800">{game.eventname}</h3>
              </div>

              {/* Game Details */}
              <div className="space-y-3 text-sm text-gray-600">
                {/* Date */}
                <div className="flex items-center gap-2">
                  <FaCalendarAlt className="text-blue-500" />
                  <span className="flex-1">{new Date(game.Date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
                </div>

                {/* Location */}
                <div className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-blue-500" />
                  <span className="flex-1">{game.Location}</span>
                </div>

                {/* Start and End Time */}
                <div className="flex items-center gap-2">
                  <FaClock className="text-blue-500" />
                  <span className="flex-1">{game.start_time} - {game.end_time}</span>
                </div>

                {/* Players */}
                <div className="flex items-center gap-2">
                  <FaUsers className="text-blue-500" />
                  <span className="flex-1">{game.number_of_players} Players</span>
                </div>
              </div>

              {/* Status Badge */}
              <div className="absolute top-4 right-4 bg-green-100 text-green-700 rounded-full px-3 py-1 text-xs font-semibold">
                ✓ Applied
              </div>
            </div>
          ))
        ) : (
          <p>No games found.</p>
        )}
      </div>
    </div>
  );
}
