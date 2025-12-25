import React, { useState, useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import { ref, onValue } from 'firebase/database';
import { db } from '../firebase';
import { calculateAQI } from '../utils/aqi';
import { formatDate, exportToCSV } from '../utils/helpers';
import SensorCard from './SensorCard';
import AQIBadge from './AQIBadge';
import HistoryChart from './HistoryChart';
import SafetyRecommendations from './SafetyRecommendations';
import LivePulse from './animations/LivePulse';
import { FaTemperatureHigh, FaTint, FaSmog, FaCloudShowersHeavy, FaDownload } from 'react-icons/fa';
import { MdCo2 } from "react-icons/md";

const Dashboard = ({ darkMode }) => {
    const [currentData, setCurrentData] = useState(null);

    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const previousDataRef = useRef(null); // Ref to store previous data for comparison
    const previousErrorRef = useRef(null); // Ref to track previous error state for reconnection detection
    const loadingRef = useRef(true); // Ref to track loading state inside effect closure

    useEffect(() => {
        const dataRef = ref(db, '/airQuality/ESP32_01');

        // Listen for real-time updates
        const unsubscribe = onValue(dataRef, (snapshot) => {
            const data = snapshot.val();
            setLoading(false);
            loadingRef.current = false; // Sync ref

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

                setHistory(prev => {
                    const newHistory = [...prev, newDataPoint];
                    if (newHistory.length > 20) return newHistory.slice(newHistory.length - 20);
                    return newHistory;
                });

                // --- TOAST NOTIFICATION LOGIC ---
                const prevData = previousDataRef.current;

                // 1. Success: Sensor Reconnected
                if (previousErrorRef.current === "Sensor unavailable / No Data") {
                    toast.success("Sensor reconnected successfully", { duration: 4000 });
                }
                previousErrorRef.current = null; // Clear error ref on successful data

                // 2. AQI Threshold (Example: > 100 is Unhealthy)
                if (aqi > 100) {
                    // Trigger only if it wasn't already high, or on first load if it's high
                    if (!prevData || prevData.aqi <= 100) {
                        toast.error(`Warning: High AQI Detected (${aqi})`, { icon: '😷' });
                    }
                }

                // 3. Temperature Threshold (Example: > 35°C is Hot)
                if (temp && temp > 35) {
                    if (!prevData || prevData.temperature <= 35) {
                        toast.error(`High Temperature Alert: ${temp}°C`, { icon: '🌡️' });
                    }
                }

                // 4. Humidity Threshold (Example: > 80% is High)
                if (hum && hum > 80) {
                    if (!prevData || prevData.humidity <= 80) {
                        toast.custom((t) => (
                            <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} bg-white dark:bg-gray-800 border-l-4 border-blue-500 shadow-lg rounded-r pointer-events-auto flex ring-1 ring-black ring-opacity-5`}>
                                <div className="flex-1 w-0 p-4">
                                    <div className="flex items-start">
                                        <div className="ml-3 flex-1">
                                            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                                High Humidity
                                            </p>
                                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                                Humidity levels have crossed 80%.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ), { duration: 4000 });
                    }
                }

                // Update ref for next render
                previousDataRef.current = newDataPoint;

            } else {
                // Sensor Disconnect Logic
                if (previousErrorRef.current !== "Sensor unavailable / No Data" && !loadingRef.current) {
                    toast.error("Alert: Sensor Disconnected", { icon: '🔌' });
                }
                previousErrorRef.current = "Sensor unavailable / No Data";
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
                    <div className="flex items-center space-x-2">
                        <LivePulse trigger={currentData?.timestamp} />
                        <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Last Updated</p>
                    </div>
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

            {/* Bottom Section: Chart & Safety Recommendations */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-zoom-in">
                {/* Chart Section (Span 2) */}
                <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-lg h-full">
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

                {/* Safety Recommendations (Span 1) */}
                <div className="lg:col-span-1 h-full">
                    <SafetyRecommendations
                        aqi={currentData?.aqi}
                        temperature={currentData?.temperature}
                        humidity={currentData?.humidity}
                    />
                </div>
            </div>
        </main>
    );
};

export default Dashboard;
