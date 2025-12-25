import React, { useEffect, useRef } from 'react';
import clsx from 'clsx';
import { motion as Motion, useAnimation } from 'framer-motion';
import { getAQIStatus } from '../utils/aqi';
import AnimatedCounter from './animations/AnimatedCounter';

const AQIBadge = ({ aqi, loading }) => {
    const { label, color, text } = getAQIStatus(aqi || 0);
    const controls = useAnimation();
    const prevAqiRef = useRef(aqi);

    useEffect(() => {
        if (aqi !== null && aqi !== prevAqiRef.current) {
            controls.start({
                scale: [1, 1.05, 1],
                transition: { duration: 0.4 }
            });
            prevAqiRef.current = aqi;
        }
    }, [aqi, controls]);

    if (loading) {
        return (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 flex flex-col items-center justify-center border border-gray-100 dark:border-gray-700 h-full">
                <div className="h-32 w-32 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
                <div className="h-6 w-24 bg-gray-200 dark:bg-gray-700 animate-pulse mt-4 rounded"></div>
            </div>
        );
    }

    return (
        <Motion.div
            animate={controls}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 flex flex-col items-center justify-center border border-gray-100 dark:border-gray-700 h-full relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg"
        >
            <div className={clsx("absolute top-0 w-full h-1", color)}></div>

            <div className="relative z-10 text-center">
                <h2 className="text-gray-500 dark:text-gray-400 font-medium mb-4">Air Quality Index</h2>

                {/* Animated Border Circle */}
                <Motion.div
                    className={clsx("w-32 h-32 rounded-full flex items-center justify-center border-8")}
                    animate={{
                        borderColor: aqi <= 50 ? 'rgba(220, 252, 231, 1)' :
                            aqi <= 100 ? 'rgba(254, 249, 195, 1)' : 'rgba(254, 226, 226, 1)'
                    }}
                    transition={{ duration: 0.5 }}
                >
                    <div className={clsx("w-full h-full rounded-full flex items-center justify-center border-8 transition-colors duration-500",
                        aqi <= 50 ? 'border-green-100 dark:border-green-900' :
                            aqi <= 100 ? 'border-yellow-100 dark:border-yellow-900' : 'border-red-100 dark:border-red-900'
                    )}>
                        <div className="text-center">
                            <span className={clsx("text-4xl font-bold block", text)}>
                                {aqi !== null ? <AnimatedCounter value={aqi} /> : '--'}
                            </span>
                            <span className="text-xs text-gray-400">US AQI</span>
                        </div>
                    </div>
                </Motion.div>

                <div className={clsx("mt-4 px-4 py-1 rounded-full text-sm font-semibold inline-block", color.replace('bg-', 'bg-opacity-20 text-'))}>
                    {label}
                </div>
            </div>
        </Motion.div>
    );
};

export default AQIBadge;
