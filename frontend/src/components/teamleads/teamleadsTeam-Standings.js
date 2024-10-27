'use client'

import React, { useEffect, useState } from "react"
import {a} from "react-router-dom"
import { motion } from 'framer-motion'
import axios from "axios"

function Button({ variant, children }) {
  const buttonStyle = variant === "ghost" ? "text-white hover:text-gray-300" : "bg-blue-600 text-white hover:bg-blue-700"
  return (
    <button className={`${buttonStyle} px-4 py-2 rounded-md transition duration-300 ease-in-out`}>
      {children}
    </button>
  )
}

export default function TeamManagement() {
 
const [teams, setteams] = useState([])
useEffect(  () => {
  return async () => {
    const {data} = await axios.get('http://localhost:4000/teamleads/getteams')
    setteams(data)
  };
}, [])
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-gray-800 text-white shadow-md">
        <nav className="container mx-auto px-4 py-4">
          <ul className="flex justify-between items-center">
            <li>
              <a href="/teamleads/registered-games">
                <Button variant="ghost">All Games</Button>
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

      <main className="flex-grow container mx-auto px-4 py-8">
        <div style={{
          position: 'relative',
          width: '100%',
          maxWidth: '600px',
          margin: '2rem auto',
          padding: '2rem',
          backgroundColor: 'white',
          borderRadius: '15px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden'
        }}>
          <motion.div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: -1,
              background: 'linear-gradient(45deg, #f3ec78, #af4261)',
              opacity: 0.1
            }}
            animate={{
              scale: [1, 1.2, 1.1, 1],
              rotate: [0, 90, 180, 270, 360],
            }}
            transition={{
              duration: 20,
              ease: "linear",
              repeat: Infinity,
            }}
          />
          <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#333' }}>Team Standings</h2>
          <div style={{ display: 'grid', gap: '1rem' }}>
            {teams.map((team, index) => (
              <motion.div
                key={team._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '1rem',
                  backgroundColor: index % 2 === 0 ? '#f8f9fa' : '#ffffff',
                  borderRadius: '8px',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
                }}
              >
                <img
                  src={team.imgurl}
                  alt={team.nickname}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    marginRight: '1rem',
                    border: '2px solid #007bff'
                  }}
                />
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: 0, color: '#333' }}>{team.teamNickname}</h3>
                  {index < 3 && (
                    <span style={{
                      fontSize: '0.8rem',
                      padding: '0.2rem 0.5rem',
                      borderRadius: '4px',
                      backgroundColor: index === 0 ? '#ffd700' : index === 1 ? '#c0c0c0' : '#cd7f32',
                      color: '#fff',
                      marginTop: '0.3rem',
                      display: 'inline-block'
                    }}>
                      {index + 1}{index === 0 ? 'st' : index === 1 ? 'nd' : 'rd'}
                    </span>
                  )}
                </div>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#007bff' }}>
                  {team.points}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}