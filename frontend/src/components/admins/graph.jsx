import React, { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { saveAs } from 'file-saver';
import Papa from 'papaparse';

const COLORS = [
  '#0088FE',
  '#00C49F',
  '#FFBB28',
  '#FF8042',
  '#8884D8',
  '#82ca9d',
  '#ffc658',
  '#8884d8',
  '#82ca9d',
  '#a4de6c',
];

export default function AdvertisementAnalytics() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4000/advertisement/getmetrics');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (e) {
        console.error("Fetching error:", e);
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const downloadCSV = () => {
    const csvData = data.map((row) => ({
      Company: row.adverCompanyName,
      Clicks: row.noOfClicks,
      Weight: row.weight,
    }));
    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'advertisement_metrics.csv');
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <button
        onClick={downloadCSV}
        style={{
          marginBottom: '20px',
          padding: '10px 15px',
          backgroundColor: '#0088FE',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Download CSV
      </button>
      <button
        style={{
          marginBottom: '20px',
          padding: '10px 15px',
          backgroundColor: 'red',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        <a href="/admin/home">Back</a>
      </button>

      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Advertisement Clicks by Company</h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <XAxis dataKey="adverCompanyName" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="noOfClicks" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Advertisement Weights Distribution</h2>
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={data}
              dataKey="weight"
              nameKey="adverCompanyName"
              cx="50%"
              cy="50%"
              outerRadius={150}
              fill="#8884d8"
              label={(entry) => entry.adverCompanyName}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
