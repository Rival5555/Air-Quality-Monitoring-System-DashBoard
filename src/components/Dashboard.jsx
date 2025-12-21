import React, { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../firebase';
import { calculateAQI } from '../utils/aqi';
import { formatDate, exportToCSV } from '../utils/helpers';
import SensorCard from './SensorCard';
import AQIBadge from './AQIBadge';
import HistoryChart from './HistoryChart';
import { FaTemperatureHigh, FaTint, FaSmog, FaCloudShowersHeavy, FaDownload } from 'react-icons/fa';
import { MdCo2 } from "react-icons/md";

const Dashboard = ({ darkMode }) => {
    const [currentData, setCurrentData] = useState(null);
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const dataRef = ref(db, '/airQuality/ESP32_01');

        // Listen for real-time updates
        const unsubscribe = onValue(dataRef, (snapshot) => {
            const data = snapshot.val();
            setLoading(false);

            if (data) {
                // Fallback or data validation
                let timestamp = data.timestamp || Date.now();
                if (timestamp < 1735693200000) { // If before Jan 1, 2025 -> use current time
                    timestamp = Date.now();
                }
                const mq135 = data.mq135 || 0;
                const mq2 = data.mq2 || 0;
                const temp = data.temperature; // can be null
                const hum = data.humidity; // can be null

                // Calculate AQI
                const aqi = calculateAQI(mq135, mq2);

                const newDataPoint = {
                    timestamp,
                    mq135,
                    mq2,
                    temperature: temp,
                    humidity: hum,
                    aqi
                };

                setCurrentData(newDataPoint);
                setError(null);

                // Update history (Keep last 20 points for chart)
                setHistory(prev => {
                    const newHistory = [...prev, newDataPoint];
                    if (newHistory.length > 20) return newHistory.slice(newHistory.length - 20);
                    return newHistory;
                });

            } else {
                setError("Sensor unavailable / No Data");
                setCurrentData(null);
            }
        }, (err) => {
            console.error(err);
            setError("Failed to connect to Firebase");
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const handleExport = () => {
        if (history.length > 0) {
            exportToCSV(history);
        }
    };

    if (error) {
        return (
            <div className="flex items-center justify-center p-12 text-center text-red-500 bg-red-50 dark:bg-red-900/20 rounded-xl m-4 border border-red-200 dark:border-red-900">
                <p className="font-semibold">{error}</p>
                <p className="text-sm mt-2 text-gray-600 dark:text-gray-400">Check firebase configuration or device connection.</p>
            </div>
        );
    }

    return (
        <main className="container mx-auto px-4 py-8 max-w-7xl">
            {/* Top Section: Date & Export */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                <div>
                    <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Last Updated</p>
                    <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                        {currentData ? formatDate(currentData.timestamp) : 'Waiting for data...'}
                    </p>
                </div>
                <button
                    onClick={handleExport}
                    disabled={!history.length}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                >
                    <FaDownload />
                    <span>Export History (CSV)</span>
                </button>
            </div>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 animate-zoom-in">
                {/* Left Column: AQI Badge (Span 1 on LG) */}
                <div className="lg:col-span-1">
                    <AQIBadge aqi={currentData?.aqi} loading={loading} />
                </div>

                {/* Right Column: Sensor Grid (Span 2 on LG) */}
                <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <SensorCard
                        label="Temperature"
                        value={currentData?.temperature}
                        unit="°C"
                        icon={FaTemperatureHigh}
                        color="bg-orange-500"
                        loading={loading}
                    />
                    <SensorCard
                        label="Humidity"
                        value={currentData?.humidity}
                        unit="%"
                        icon={FaTint}
                        color="bg-blue-500"
                        loading={loading}
                    />
                    <SensorCard
                        label="Gas Level (MQ-135)"
                        value={currentData?.mq135}
                        unit="ppm"
                        icon={FaSmog}
                        color="bg-purple-500"
                        loading={loading}
                    />
                    <SensorCard
                        label="Gas Level (MQ-2)"
                        value={currentData?.mq2}
                        unit="ppm"
                        icon={MdCo2}
                        color="bg-gray-600"
                        loading={loading}
                    />
                </div>
            </div>

            {/* Chart Section */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700 animate-zoom-in transition-all duration-300 hover:shadow-lg">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Live Trends</h3>
                    <div className="flex space-x-2">
                        <span className="flex items-center text-xs text-gray-500">
                            <span className="w-2 h-2 bg-blue-500 rounded-full mr-1"></span> AQI
                        </span>
                    </div>
                </div>
                <HistoryChart data={history} darkMode={darkMode} />
            </div>
        </main>
    );
};

export default Dashboard;
