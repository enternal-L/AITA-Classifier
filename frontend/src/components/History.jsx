import React, { useEffect, useState } from 'react';

const History = ({ percentage, wordsMap, prevChat }) => {

  const targetYes = percentage[0];
  const targetNo = percentage[1];

  const [animateBars, setAnimateBars] = useState(false); // Control bar animation
  const [percentYes, setPercentYes] = useState(0);
  const [percentNo, setPercentNo] = useState(0);
  const [backgroundColor, setColor] = useState("")
  const [hoveredWord, setHover] = useState(null)

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
        setColor(targetNo > targetYes ? "background-no" : "background-yes")

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

  const handleMouseEnter = (word) => {
      const probability = wordsMap[word.replace(/[.,!?;:"'(){}[\]]/g, "").toLowerCase()]
      const yes = probability[1]
      const no = probability[0]

      setPercentYes((yes * 100).toFixed(2))
      setPercentNo((no * 100).toFixed(2))
      setColor(no > yes ? "background-no" : "background-yes")

      setHover(word)
  }

  const handleMouseLeave = () => {
      setPercentYes(Math.round(percentage[0]))
      setPercentNo(Math.round(percentage[1]))
      setColor(targetNo > targetYes ? "background-no" : "background-yes")
      setHover(null)
  }


  const getWordStyle = (word) => {
      const probability = wordsMap[word.replace(/[.,!?;:"'(){}[\]]/g, "").toLowerCase()]
      const yes = probability[1]
      const no = probability[0]

      const bgColor = yes > no ? `rgba(255, 178, 178, ${yes})` : `rgba(131, 209, 170, ${no})`;

      return {
        backgroundColor: bgColor, 
        padding: "2px 4px", 
        borderRadius: "4px",
        cursor: "pointer",
        transition: "background-color 0.3s ease",
      }
  }

  return (
    <div className='w-full h-full flex-center flex-row p-10'>
      <div className='flex w-full h-full flex-center'>
        <div className="fade-in-container w-full h-full flex flex-center flex-col">
          <div className="w-full h-full flex flex-center flex-col">
            <p>Percentages</p>
            {percentage.length > 0 && (
              <div className={`w-96 h-full ${backgroundColor} rounded-md p-4 space-y-3`} style={{ transition: "background-color 0.5s ease-in-out" }}>
                <h1 className='font-semibold text-3xl'>{hoveredWord ? hoveredWord : prevChat.split(" ").slice(0, 4).join(" ") + "..."}</h1>
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
      </div>
      <div className='flex w-full h-full flex-center flex-col'>
        <p>Individual Words</p>
        { prevChat && <div className='flex flex-wrap w-fit h-fit items-start p-5 background-stat rounded-md'>
          {
            prevChat.split(" ").map((word, index) => (
              <span
                key = {index}
                onMouseEnter={() => {handleMouseEnter(word)}}
                onMouseLeave={() => {handleMouseLeave()}}
                className='hover:scale-105 my-1'
                >
                <span
                  key = {index}
                  style={{margin: "1px 2px", ...getWordStyle(word)}}
                >
                {word}
                </span>
              </span>
            ))
          }
        </div>
        }
      </div>
  </div>
  );
};

export default History;
