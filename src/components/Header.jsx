import React from 'react';
import { FaMoon, FaSun, FaWind } from 'react-icons/fa';

const Header = ({ darkMode, toggleTheme }) => {
    return (
        <header className="bg-white dark:bg-gray-800 shadow-sm transition-colors duration-200">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-500 rounded-lg text-white">
                        <FaWind size={24} />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-gray-900 dark:text-white">AirVisual Monitor</h1>
                        <p className="text-xs text-gray-500 dark:text-gray-400">IoT Sensor Dashboard</p>
                    </div>
                </div>

                <button
                    onClick={toggleTheme}
                    className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-yellow-400 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300 hover:scale-110 hover:shadow-md"
                    aria-label="Toggle Dark Mode"
                >
                    {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
                </button>
            </div>
        </header>
    );
};

export default Header;
