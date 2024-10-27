'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'
import Cookies from 'js-cookie'

const UserProfile = () => {
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const user = Cookies.get('authToken')

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/user/getuserdetails/' + user)
        setUserData(response.data)
        setLoading(false)
      } catch (err) {
        setError('Failed to fetch user data')
        setLoading(false)
      }
    }

    fetchUserData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-200 rounded-xl p-8 shadow-2xl"
        >
          <div className="text-black text-2xl font-bold">Loading...</div>
        </motion.div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-200 rounded-xl p-8 shadow-2xl"
        >
          <div className="text-black text-2xl font-bold">{error}</div>
        </motion.div>
      </div>
    )
  }

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-200 rounded-xl p-8 shadow-2xl"
        >
          <div className="text-black text-2xl font-bold">No user data available</div>
        </motion.div>
      </div>
    )
  }

  const totalPoints = userData.points.reduce((sum, point) => sum + point.points, 0)
  const numberOfGames = userData.points.length
  const numberOfCertificates = userData.certificates.length

  return (
    <div className="min-h-screen p-8 flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full"
      >
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-4xl font-bold text-center mb-6"
        >
          User Profile
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="space-y-4"
        >
          <ProfileItem label="Name" value={userData.uniquecode} />
          <ProfileItem label="Corporate Code" value={userData.corporatecode} />
          <ProfileItem label="Total Points" value={totalPoints} />
          <ProfileItem label="Number of Games" value={numberOfGames} />
          <ProfileItem label="Number of Certificates" value={numberOfCertificates} />
        </motion.div>
      </motion.div>
    </div>
  )
}

const ProfileItem = ({ label, value }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="flex justify-between items-center bg-gray-200 rounded-lg p-3 shadow-md"
    >
      <span className="text-black font-semibold">{label}:</span>
      <span className="text-black">{value}</span>
    </motion.div>
  )
}

export default UserProfile
