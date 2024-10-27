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

    
    </div>
  )
}