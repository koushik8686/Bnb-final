'use client'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'js-cookie'

export default function Login() {
  const [uniquecode, setUniquecode] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [imageVisible, setImageVisible] = useState(false)
  const [slideDirection, setSlideDirection] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setImageVisible(true)

    try {
      const response = await axios.post('http://localhost:4000/user/login', {
        uniquecode,
        password,
      })

      const { userId } = response.data
      Cookies.set('authToken', userId)
      setSlideDirection('right')

      setTimeout(() => {
        navigate('/user/home')
      }, 1000)
    } catch (err) {
      setError('Invalid login credentials. Please try again.')
      setSlideDirection('left')

      setTimeout(() => {
        setImageVisible(false)
        setSlideDirection('')
      }, 1000)
    } finally {
      setIsLoading(false)
    }
  }

  // Function to handle navigation to the sign-up page
  const handleSignUp = () => {
    navigate('/user/register')
  }

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-[#282c34] overflow-hidden">
      <div className="absolute inset-0 flex justify-between items-center pointer-events-none">
        <div className="h-full w-4 bg-[#e60000] transform -skew-x-12"></div>
        <div className="h-full w-4 bg-[#e60000] transform skew-x-12"></div>
      </div>
      <div
        className={`login-container bg-black bg-opacity-70 rounded-lg p-8 shadow-lg w-[400px] text-center relative z-10 transition-transform duration-1000 ease-in-out ${
          slideDirection === 'left'
            ? '-translate-x-full'
            : slideDirection === 'right'
            ? 'translate-x-full'
            : ''
        }`}
      >
        <h2 className="text-2xl mb-6 text-[#e60000] font-bold">Squid Game Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="uniquecode" className="block mb-1 text-sm text-[#e6e600]">
              Unique Code:
            </label>
            <input
              type="text"
              id="uniquecode"
              value={uniquecode}
              onChange={(e) => setUniquecode(e.target.value)}
              required
              className="w-full px-3 py-2 bg-[#1f1f1f] border-2 border-[#e60000] rounded-md text-white focus:border-[#e6e600] transition-colors duration-300"
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-1 text-sm text-[#e6e600]">
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 bg-[#1f1f1f] border-2 border-[#e60000] rounded-md text-white focus:border-[#e6e600] transition-colors duration-300"
            />
          </div>
          {error && <p className="text-[#ff4d4d]">{error}</p>}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 bg-[#e60000] text-white rounded-md font-bold hover:bg-[#cc0000] transition-colors duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
      {imageVisible && (
        <img
          src="https://images-cdn.ubuy.co.in/633ff9de5b90de67d82ee14e-squid-game-masked-man-mask-reality.jpg"
          alt="Squid Game Mask"
          className={`fixed inset-0 w-full h-full object-cover transition-transform duration-1000 ease-in-out ${
            slideDirection === 'left' ? '-translate-x-full' : slideDirection === 'right' ? 'translate-x-full' : ''
          }`}
        />
      )}
      {/* Sign Up Button */}
      <div className="mt-auto mb-8">
        <button
          onClick={handleSignUp}
          className="w-[400px] py-2 bg-[#1f1f1f] text-[#e6e600] rounded-md font-bold hover:bg-[#2a2a2a] transition-colors duration-300"
        >
          Sign Up
        </button>
      </div>
    </div>
  )
}
