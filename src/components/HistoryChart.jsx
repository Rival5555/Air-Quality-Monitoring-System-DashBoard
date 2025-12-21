import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const HistoryChart = ({ data, darkMode }) => {
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: darkMode ? '#9ca3af' : '#4b5563'
                }
            },
            tooltip: {
                mode: 'index',
                intersect: false,
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                    color: darkMode ? '#374151' : '#e5e7eb'
                },
                ticks: {
                    color: darkMode ? '#9ca3af' : '#4b5563'
                }
            },
            y: {
                grid: {
                    color: darkMode ? '#374151' : '#e5e7eb'
                },
                ticks: {
                    color: darkMode ? '#9ca3af' : '#4b5563'
                }
            }
        },
        interaction: {
            mode: 'nearest',
            axis: 'x',
            intersect: false
        }
    };

    const chartData = {
        labels: data.map(d => new Date(d.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })),
        datasets: [
            {
                label: 'AQI Trend',
                data: data.map(d => d.aqi),
                borderColor: 'rgb(59, 130, 246)',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                fill: true,
                tension: 0.4,
            },
            // Optional: Add Temperature line if requested, user mentioned optional
            {
                label: 'Temperature (°C)',
                data: data.map(d => d.temperature),
                borderColor: 'rgb(16, 185, 129)',
                backgroundColor: 'transparent',
                borderDash: [5, 5],
                tension: 0.4,
                hidden: true // Hidden by default to keep it clean, user can toggle in legend
            }
        ],
    };

    return (
        <div className="h-64 sm:h-80 w-full">
            <Line options={options} data={chartData} />
        </div>
    );
};

export default HistoryChart;
