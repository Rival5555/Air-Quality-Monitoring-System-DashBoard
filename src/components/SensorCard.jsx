import React from 'react';
import clsx from 'clsx';

const SensorCard = ({ label, value, unit, icon: Icon, color, loading }) => {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 flex items-center space-x-4 border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:scale-105 hover:shadow-lg">
            <div className={clsx("p-4 rounded-full text-white shadow-md", color)}>
                <Icon size={24} />
            </div>
            <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</h3>
                {loading ? (
                    <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 animate-pulse rounded mt-1"></div>
                ) : (
                    <div className="flex items-baseline space-x-1">
                        <span className="text-2xl font-bold text-gray-900 dark:text-white">
                            {value !== null ? value : '--'}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{unit}</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SensorCard;
