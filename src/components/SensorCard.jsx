import React, { useEffect, useRef } from 'react';
import clsx from 'clsx';
import { motion as Motion, useAnimation } from 'framer-motion';
import AnimatedCounter from './animations/AnimatedCounter';
import TrendArrow from './animations/TrendArrow';

const SensorCard = ({ label, value, unit, icon, color, loading }) => {
    const IconComponent = icon;
    const controls = useAnimation();
    const prevValueRef = useRef(value);

    // Determine precision based on unit
    const precision = unit === '°C' ? 1 : 0;

    useEffect(() => {
        if (value !== null && value !== prevValueRef.current) {
            controls.start({
                scale: [1, 1.02, 1],
                transition: { duration: 0.3 }
            });
            prevValueRef.current = value;
        }
    }, [value, controls]);

    return (
        <Motion.div
            animate={controls}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 flex items-center space-x-4 border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:scale-105 hover:shadow-lg"
        >
            <div className={clsx("p-4 rounded-full text-white shadow-md", color)}>
                <IconComponent size={24} />
            </div>
            <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</h3>
                {loading ? (
                    <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 animate-pulse rounded mt-1"></div>
                ) : (
                    <div className="flex items-center space-x-2">
                        <div className="flex items-baseline space-x-1">
                            <span className="text-2xl font-bold text-gray-900 dark:text-white">
                                {value !== null ? (
                                    <AnimatedCounter value={value} toFixed={precision} />
                                ) : '--'}
                            </span>
                            <span className="text-sm text-gray-500 dark:text-gray-400">{unit}</span>
                        </div>
                        {value !== null && <TrendArrow value={value} />}
                    </div>
                )}
            </div>
        </Motion.div>
    );
};

export default SensorCard;
