import React, { useMemo } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import {
    FaMask, FaWind, FaRunning, FaHome, FaTree,
    FaTemperatureHigh, FaTint, FaCheckCircle, FaExclamationTriangle
} from 'react-icons/fa';
import { MdOutlineHealthAndSafety } from "react-icons/md";

const SafetyRecommendations = ({ aqi, temperature, humidity }) => {

    const recommendations = useMemo(() => {
        const recs = [];

        // --- AQI Logic ---
        if (aqi !== undefined && aqi !== null) {
            if (aqi <= 50) {
                recs.push({
                    id: 'aqi-safe',
                    type: 'success',
                    message: "Air quality is excellent. Great time for outdoor activities!",
                    icon: FaRunning
                });
            } else if (aqi <= 100) {
                recs.push({
                    id: 'aqi-moderate',
                    type: 'warning',
                    message: "Air quality is acceptable. Sensitive individuals should limit prolonged outdoor exertion.",
                    icon: FaTree
                });
            } else if (aqi <= 150) {
                recs.push({
                    id: 'aqi-unhealthy-sens',
                    type: 'danger',
                    message: "Unhealthy for sensitive groups. Wear a mask if you have respiratory issues.",
                    icon: FaMask
                });
            } else {
                recs.push({
                    id: 'aqi-hazardous',
                    type: 'critical',
                    message: "Health Alert: Avoid outdoor activities. Keep windows closed and use an air purifier.",
                    icon: FaHome
                });
            }
        }

        // --- Temperature Logic ---
        if (temperature > 35) {
            recs.push({
                id: 'temp-high',
                type: 'warning',
                message: "High temperature detected. Stay hydrated and avoid direct sunlight.",
                icon: FaTemperatureHigh
            });
        }

        // --- Humidity Logic ---
        if (humidity > 70) {
            recs.push({
                id: 'hum-high',
                type: 'info',
                message: "High humidity levels. Ensure good ventilation to prevent mold growth.",
                icon: FaWind
            });
        } else if (humidity < 30) {
            recs.push({
                id: 'hum-low',
                type: 'info',
                message: "Dry air detected. Consider using a humidifier for comfort.",
                icon: FaTint
            });
        }

        // Default 'All Good' if no warnings
        if (recs.length === 0) {
            recs.push({
                id: 'all-clear',
                type: 'success',
                message: "All environmental parameters are within optimal ranges.",
                icon: FaCheckCircle
            });
        }

        return recs;
    }, [aqi, temperature, humidity]);

    const getStyleByType = (type) => {
        switch (type) {
            case 'success':
                return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200';
            case 'warning':
                return 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-200';
            case 'danger':
                return 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800 text-orange-800 dark:text-orange-200';
            case 'critical':
                return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200';
            case 'info':
            default:
                return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200';
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700 h-full">
            <div className="flex items-center space-x-2 mb-4">
                <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg text-indigo-600 dark:text-indigo-400">
                    <MdOutlineHealthAndSafety size={20} />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Safety & Advice</h3>
            </div>

            <div className="space-y-3">
                <AnimatePresence mode='popLayout'>
                    {recommendations.map((rec) => (
                        <Motion.div
                            key={rec.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                            layout
                            className={`p-4 rounded-lg border flex items-start space-x-3 ${getStyleByType(rec.type)}`}
                        >
                            <div className="mt-0.5 shrink-0">
                                <rec.icon size={18} />
                            </div>
                            <div>
                                <p className="text-sm font-medium leading-relaxed">
                                    {rec.message}
                                </p>
                            </div>
                        </Motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default SafetyRecommendations;
