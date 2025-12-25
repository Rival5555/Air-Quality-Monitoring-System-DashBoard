// Basic AQI calculation logic based on sensor inputs
// This is a simplified estimation for demonstration purposes
// In production, use specific gas curves

export const calculateAQI = (mq135, mq2) => {
    // Simple aggregated index for demo
    // Normalize values to a 0-500 scale
    // MQ-135 (CO2/Ammonia/Benzene) - typically 100-1000+ ppm
    // MQ-2 (LPG/Propane/Hydrogen) - typically 200-10000 ppm

    // Weights (Approximation)
    const score135 = Math.min((mq135 / 1000) * 100, 500);
    const score2 = Math.min((mq2 / 2000) * 100, 500);

    // Take the max of sub-indexes as standard AQI practice
    const aqi = Math.max(score135, score2);

    return Math.round(aqi);
};

export const getAQIStatus = (aqi) => {
    if (aqi <= 50) return { label: 'Good', color: 'bg-green-500', text: 'text-green-500', trend: 'stable' };
    if (aqi <= 100) return { label: 'Moderate', color: 'bg-yellow-500', text: 'text-yellow-500', trend: 'rising' };
    return { label: 'Poor', color: 'bg-red-500', text: 'text-red-500', trend: 'alert' };
};
