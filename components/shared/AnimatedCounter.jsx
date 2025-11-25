import { useState, useEffect } from 'react';

/**
 * AnimatedCounter Component
 * Smoothly animates a number from 0 to target
 * @param {number} target - Target number to count to
 * @param {string} suffix - Suffix to append (e.g., '+', '%')
 */
const AnimatedCounter = ({ target, suffix = '' }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let currentCount = 0;
    const duration = 1000; // 2 seconds
    const steps = 60; // 60 frames
    const increment = target / steps;
    const stepDuration = duration / steps;

    const timer = setInterval(() => {
      currentCount += increment;
      if (currentCount >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(currentCount));
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [target]);

  return <span>{count}{suffix}</span>;
};

export default AnimatedCounter;
