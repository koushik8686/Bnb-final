'use client'

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CalendarDays, Clock, MapPin, Users, Check } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

function Button({ variant, children, onClick }) {
  const buttonStyle = variant === "ghost" 
    ? "text-white hover:text-gray-300" 
    : "bg-blue-600 text-white hover:bg-blue-700";
  return (
    <motion.button
      className={`${buttonStyle} px-4 py-2 rounded-md transition-colors duration-300`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
}

function Card({ children, href }) {
  return (
    <motion.div
      className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 mb-4"
      whileHover={{ y: -5, scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Link to={href} className="block">
        {children}
      </Link>
    </motion.div>
  );
}

function CardContent({ children }) {
  return <div className="px-6 py-4">{children}</div>;
}

export default function GameList() {
  const company = Cookies.get('company');
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/teamleads/getgames/${company}`);
        setGames(response.data);
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    };

    fetchGames();
  }, [company]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="bg-gray-800 text-white shadow-md">
        <nav className="container mx-auto px-4 py-4">
          <ul className="flex justify-between items-center">
            <li>
              <Link to="/teamleads/registered-games">
                <Button variant="ghost">All Games</Button>
              </Link>
            </li>
            <li>
              <Link to="/teamleads/registration-details">
                <Button variant="ghost">Registration Details</Button>
              </Link>
            </li>
            <li>
              <Link to="/teamleads/team-list">
                <Button variant="ghost">Team List</Button>
              </Link>
            </li>
            <li>
              <Link to="/teamleads/table-standing">
                <Button variant="ghost">Table Standing</Button>
              </Link>
            </li>
            <li>
              <Link to="/teamleads/contact">
                <Button variant="ghost">Contact</Button>
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      <main className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-800">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
            Game List
          </span>
        </h1>
        <div className="space-y-6">
          {games && games.map((game) => (
            <Card key={game.id} href={`/game/${game._id}`}>
              <CardContent>
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-800">{game.eventname}</h2>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    <Check className="w-4 h-4 mr-1" />
                    Applied
                  </span>
                </div>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <CalendarDays className="w-5 h-5 mr-2 text-blue-500" />
                    <span className="text-gray-700">{formatDate(game.date)}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-blue-500" />
                    <span className="text-gray-700">{game.start_time} - {game.end_time}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-blue-500" />
                    <span className="text-gray-700">{game.Location}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-5 h-5 mr-2 text-blue-500" />
                    <span className="text-gray-700">{game.number_of_players} Players</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
