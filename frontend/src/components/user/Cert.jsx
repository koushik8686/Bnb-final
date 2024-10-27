import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';

export default function Cert() {
  const { id, number } = useParams();
  const [data, setData] = useState(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/user/${id}/${number}`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching certificate data:", error);
      }
    };

    fetchData();
  }, [id, number]);

  useEffect(() => {
    if (data && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = 1000;
      canvas.height = 700;

      // Set background based on position
      const positionColors = {
        1: '#FFD700', // Gold
        2: '#C0C0C0', // Silver
        3: '#CD7F32', // Bronze
      };
      ctx.fillStyle = positionColors[data.position] || '#f0f0f0';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Border
      ctx.strokeStyle = '#333';
      ctx.lineWidth = 20;
      ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

      // Certificate title
      ctx.fillStyle = '#333';
      ctx.textAlign = 'center';
      ctx.font = 'bold 60px "Palatino"';
      ctx.fillText('Certificate of Achievement', canvas.width / 2, 120);

      // Subtitle
      ctx.font = 'italic 40px "Palatino"';
      ctx.fillText('This certifies that', canvas.width / 2, 220);

      // Participant's name
      ctx.font = 'bold 70px "Palatino"';
      ctx.fillText(data.name, canvas.width / 2, 320);

      // Position and event
      ctx.font = 'italic 40px "Palatino"';
      ctx.fillText(`has achieved ${data.position} place in`, canvas.width / 2, 400);

      ctx.font = 'bold 50px "Palatino"';
      ctx.fillText(data.event, canvas.width / 2, 480);

      // Link
      ctx.font = '30px "Palatino"';
      ctx.fillText(`Link: http://localhost:4000/${id}/${number}`, canvas.width / 2, 540);

      // Signature
      ctx.font = 'italic bold 40px "Brush Script MT", cursive';
      ctx.textAlign = 'right';
      ctx.fillText('B.MONISH', canvas.width - 50, canvas.height - 50);
    }
  }, [data, id, number]);

  return (
    <div>
      <h1>Certificate</h1>
      {data ? (
        <canvas ref={canvasRef} />
      ) : (
        <p>Loading certificate...</p>
      )}
    </div>
  );
}
