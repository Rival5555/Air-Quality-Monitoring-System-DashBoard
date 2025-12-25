import React, { useEffect } from 'react';
import { motion as Motion, useSpring, useTransform } from 'framer-motion';

const AnimatedCounter = ({ value, toFixed = 0 }) => {
    const spring = useSpring(value, { stiffness: 50, damping: 15 });
    const displayValue = useTransform(spring, (current) => current.toFixed(toFixed));

    useEffect(() => {
        spring.set(value);
    }, [value, spring]);

    return <Motion.span>{displayValue}</Motion.span>;
};

export default AnimatedCounter;
