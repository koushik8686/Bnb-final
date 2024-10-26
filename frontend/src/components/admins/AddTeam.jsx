// AddTeam.js
import React, { useState } from 'react';


export function AddTeam() {
  const [teamCode, setTeamCode] = useState('');
  const [teamNickname, setTeamNickname] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('teamCode', teamCode);
    formData.append('teamNickname', teamNickname);
    formData.append('password', password);
    formData.append('image', image);

    // Send the formData to the backend (URL to backend needs to be updated accordingly)
    fetch('http://localhost:4000/admin/addteam', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Team added:', data);
        alert(data.message)
      })
      .catch((error) => {
        console.error('Error adding team:', error);
      });
  };

  return (
    <div className="max-w-sm mx-auto p-6 bg-white rounded-lg shadow-lg animate-fadeIn">
      <h2 className="text-xl mb-4 text-center text-gray-800 animate-slideIn">Add a New Team</h2>
      <form onSubmit={handleSubmit} className=" text-black space-y-4" encType="multipart/form-data">
        <div>
          <label htmlFor="teamCode" className="block text-sm font-medium text-gray-700">Team Code</label>
          <input
            type="text"
            id="teamCode"
            value={teamCode}
            onChange={(e) => setTeamCode(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="teamNickname" className="block text-sm font-medium text-gray-700">Team Nickname</label>
          <input
            type="text"
            id="teamNickname"
            value={teamNickname}
            onChange={(e) => setTeamNickname(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">Team Image</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            required
            className="mt-1 block w-full text-sm text-gray-700 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>
        <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300">Add Company</button>
      </form>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-10px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
