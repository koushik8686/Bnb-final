'use client'

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarDays, Clock, MapPin, Users, Activity } from "lucide-react";
import Cookies from "js-cookie";
import axios from "axios";

function Button({ type, variant, onClick, children }) {
  const buttonStyle = variant === "ghost" ? "text-white-700 hover:text-white-900" : "bg-blue-600 text-white hover:bg-blue-700";
  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={`${buttonStyle} px-4 py-2 rounded-md`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  );
}

function Input({ id, type = "text", placeholder, value, onChange }) {
  return (
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
}

function Label({ htmlFor, children }) {
  return (
    <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700">
      {children}
    </label>
  );
}

function Select({ id, value, onChange, options }) {
  return (
    <select
      id={id}
      value={value}
      onChange={onChange}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

function Card({ children }) {
  return (
    <motion.div
      className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}

function CardHeader({ children }) {
  return <div className="px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-600">{children}</div>;
}

function CardTitle({ children }) {
  return <h2 className="text-2xl font-bold text-white">{children}</h2>;
}

function CardContent({ children }) {
  return <div className="px-6 py-4">{children}</div>;
}

function CardFooter({ children }) {
  return <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">{children}</div>;
}

export default function RegisteredGames() {
  const [selectedGame, setSelectedGame] = useState(null);
  const [players, setPlayers] = useState([]);
  const [corporateCode, setCorporateCode] = useState("");
  const [companyNickname, setCompanyNickname] = useState("");
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const company = Cookies.get('company');
  const [games, setgames] = useState([])
  useEffect(() => {
    axios.get(`http://localhost:4000/teamleads/getteam/${company}`)
      .then(response => { 
        const players = response.data.map(player => ({ id: player.id, name: player.uniquecode }));
        setPlayers(players);
      })
      .catch(error => console.log(error));
    
    axios.get(`http://localhost:4000/teamleads/getgames`).then(response => {
     setgames(response.data)
    })
  }, [company]);

 
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
  };

  const formatTime = (timeString) => {
    const time = new Date(timeString);
    return time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  const handleRegister = (game) => {
    setSelectedGame(game);
    setSelectedPlayers([]);
  };

  const handlePlayerSelection = (playerId ,name) => {
    if (selectedPlayers.includes(playerId)) {
      setSelectedPlayers(selectedPlayers.filter(id => id !== playerId));
    } else if (selectedPlayers.length < selectedGame.number_of_players) {
      setSelectedPlayers([...selectedPlayers, {playerId , name}]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedPlayers.length !== selectedGame.number_of_players) {
      alert(`Please select exactly ${selectedGame.number_of_players} players.`);
      return;
    }
    const {data} = axios.post('http://localhost:4000/teamleads/register' , {
      corporateCode,
      companyNickname,
      gameId: selectedGame._id,
      teamPlayers: selectedPlayers
    })
    console.log("Registered for:", selectedGame.eventname, {
      corporateCode,
      companyNickname,
      selectedPlayers
    });
    
    setSelectedGame(null);
    setCorporateCode("");
    setCompanyNickname("");
    setSelectedPlayers([]);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-gray-800 text-white shadow-md">
        <nav className="container mx-auto px-4 py-4">
          <ul className="flex justify-between items-center">
            <li>
              <a href="/teamleads/registered-games">
                <Button variant="ghost">Registered Games</Button>
              </a>
            </li>
            <li>
              <a href="/teamleads/registration-details">
                <Button variant="ghost">Registration Details</Button>
              </a>
            </li>
            <li>
              <a href="/teamleads/team-list">
                <Button variant="ghost">Team List</Button>
              </a>
            </li>
            <li>
              <a href="/teamleads/table-standing">
                <Button variant="ghost">Table Standing</Button>
              </a>
            </li>
            <li>
              <a href="/teamleads/contact">
                <Button variant="ghost">Contact</Button>
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <main className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-800">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
            Upcoming Games
          </span>
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {games.map((game) => (
            <Card key={game._id}>
              <CardHeader>
                <CardTitle>{game.eventname}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <CalendarDays className="w-5 h-5 mr-2 text-blue-500" />
                    <span className="text-gray-700">{formatDate(game.Date)}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-blue-500" />
                    <span className="text-gray-700">{formatTime(game.start_time)} - {formatTime(game.end_time)}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-blue-500" />
                    <span className="text-gray-700">{game.Location}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-5 h-5 mr-2 text-blue-500" />
                    <span className="text-gray-700">{game.number_of_players} Players</span>
                  </div>
                  <div className="flex items-center">
                    <Activity className="w-5 h-5 mr-2 text-blue-500" />
                    <span className="font-semibold text-purple-600">{game.status}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={() => handleRegister(game)}>Register Now</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>

      <AnimatePresence>
        {selectedGame && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-6 rounded-lg max-w-md w-full"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
            >
              <h2 className="text-2xl font-semibold mb-4">Register for {selectedGame.eventname}</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="corporateCode">Corporate Code</Label>
                  <Input
                    id="corporateCode"
                    value={corporateCode}
                    onChange={(e) => setCorporateCode(e.target.value)}
                    placeholder="Enter your corporate code"
                  />
                </div>
                <div>
                  <Label htmlFor="companyNickname">Company Nickname</Label>
                  <Input
                    id="companyNickname"
                    value={companyNickname}
                    onChange={(e) => setCompanyNickname(e.target.value)}
                    placeholder="Enter your company nickname"
                  />
                </div>
                <div>
                  <Label htmlFor="playerSelection">Select Players ({selectedPlayers.length}/{selectedGame.number_of_players})</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {players.map((player) => (
                      <Button
                        key={player.id}
                        type="button"
                        variant={selectedPlayers.includes(player.id) ? "default" : "ghost"}
                        onClick={() => handlePlayerSelection(player.id , player.name)}
                      >
                        {player.name}
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="ghost" onClick={() => setSelectedGame(null)}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    Submit Registration
                  </Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}