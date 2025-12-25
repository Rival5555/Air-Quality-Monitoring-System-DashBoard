import React from 'react';
import { motion as Motion } from 'framer-motion';

const LivePulse = ({ trigger }) => {
    // We can use the trigger itself as a key if it is unique/changing.
    // If trigger is a complex object, we might want a counter.
    // Assuming trigger changes whenever we want a pulse.

    // Simplest way: just key on trigger
    return (
        <Motion.div
            key={JSON.stringify(trigger)} // Ensure primitive for key
            initial={{ scale: 1, opacity: 0.8 }}
            animate={{ scale: [1, 1.5, 1], opacity: [0.8, 0, 0.8] }}
            transition={{ duration: 0.6 }}
            className="w-2 h-2 rounded-full bg-green-500 inline-block mr-2"
        />
    );
};

export default LivePulse;
