import React, { useState, useEffect, useRef } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

const TrendArrow = ({ value }) => {
    const [trend, setTrend] = useState(null); // 'up', 'down', or null
    const prevValue = useRef(value);

    // Effect to detect change and set trend direction
    useEffect(() => {
        if (value === prevValue.current) return;

        if (value > prevValue.current) {
            setTrend('up');
        } else if (value < prevValue.current) {
            setTrend('down');
        }

        prevValue.current = value;
    }, [value]);

    // Effect to Auto-hide arrow
    useEffect(() => {
        if (trend) {
            const timer = setTimeout(() => setTrend(null), 1000);
            return () => clearTimeout(timer);
        }
    }, [trend]);

    return (
        <AnimatePresence>
            {trend && (
                <Motion.div
                    initial={{ opacity: 0, y: trend === 'up' ? 5 : -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`text-xs ml-1 flex items-center ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}
                >
                    {trend === 'up' ? <FaArrowUp /> : <FaArrowDown />}
                </Motion.div>
            )}
        </AnimatePresence>
    );
};

export default TrendArrow;
