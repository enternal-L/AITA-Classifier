import React, { useEffect, useState } from 'react';

const History = ({ percentage, color }) => {
  const [animateBars, setAnimateBars] = useState(false); // Control bar animation
  const [percentYes, setPercentYes] = useState(0);
  const [percentNo, setPercentNo] = useState(0);

  const targetYes = percentage[0];
  const targetNo = percentage[1];
  const backgroundColor = color === "#83D1AA" ? "background-no" : "background-yes";

  useEffect(() => {
    const fadeInDelay = 500; // Time for fade-in animation

    // Trigger bar animations after container fade-in
    const timeout = setTimeout(() => setAnimateBars(true), fadeInDelay);

    // Number animation (synchronized with bar animation)
    if (animateBars) {
      let animationFrame;
      const duration = 600; // Animation duration for bars
      const startTime = performance.now();

      const animateNumbers = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1); // Progress value (0 to 1)

        setPercentYes(Math.round(progress * targetYes));
        setPercentNo(Math.round(progress * targetNo));

        if (progress < 1) {
          animationFrame = requestAnimationFrame(animateNumbers);
        }
      };

      animationFrame = requestAnimationFrame(animateNumbers);

      // Clean up
      return () => cancelAnimationFrame(animationFrame);
    }

    return () => clearTimeout(timeout);
  }, [animateBars, targetYes, targetNo]);

  return (
    <div className="fade-in-container w-full h-[30%] flex flex-center flex-col">
      <div className="w-full flex flex-center flex-col">
        {percentage.length > 0 && (
          <div className={`w-96 h-full ${backgroundColor} rounded-md p-4 space-y-3`}>
            <div
              style={{
                width: animateBars ? `${Math.round(percentYes)}%` : '0%',
                transition: 'width 1s ease-in-out',
              }}
              className="bg-[#FFB2B2] rounded-r-md p-2 flex justify-between"
            >
              <p>{percentYes}%</p>
              <p>AH</p>
            </div>
            <div
              style={{
                width: animateBars ? `${Math.round(percentNo)}%` : '0%',
                transition: 'width 1s ease-in-out',
              }}
              className="bg-[#83D1AA] rounded-r-md p-2 flex justify-between"
            >
              <p>{percentNo}%</p>
              <p>NTAH</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
