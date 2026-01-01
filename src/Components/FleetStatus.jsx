// FleetStatus.jsx

import React from 'react';
// import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'; // Example Recharts import

const data = [
    { name: 'Available', value: 55, color: '#00bcd4' },  // Accent Blue
    { name: 'Booked', value: 30, color: '#388e3c' },     // Green
    { name: 'In Maintenance', value: 15, color: '#f44336' }, // Alert Red
];

const FleetStatus = () => {
    return (
        <div className="widget-card fleet-status-card">
            <h2 className="widget-title">Fleet Status Breakdown</h2>
            
            <div className="chart-container" style={{ height: '200px' }}>
                {/* 
                  
                  Placeholder for the actual Donut/Pie Chart component from your library 
                  
                  Example: 
                  <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                          <Pie 
                              data={data} 
                              dataKey="value" 
                              nameKey="name" 
                              innerRadius={60} 
                              outerRadius={80} 
                              paddingAngle={5}
                              labelLine={false}
                          >
                              {data.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                          </Pie>
                      </PieChart>
                  </ResponsiveContainer>
                */}
                <div style={{ textAlign: 'center', paddingTop: '50px' }}>
                    [Donut Chart Visualization Here]
                </div>
            </div>

            {/* Status Legend/Details List */}
            <ul className="status-legend">
                {data.map((item) => (
                    <li key={item.name} style={{ borderLeft: `5px solid ${item.color}` }}>
                        <span className="status-name">{item.name}</span>
                        <span className="status-value">{item.value}%</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FleetStatus;