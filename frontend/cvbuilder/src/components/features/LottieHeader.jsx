import Lottie from "lottie-react";
import { useEffect, useState } from "react";

export default function LottieHeader({ animationData, text }) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + text.charAt(index));
      index++;
      if (index >= text.length) clearInterval(interval);
    }, 50); // Adjust typing speed here (lower = faster)

    return () => clearInterval(interval);
  }, [text]);

  return (
    <div className="w-full lg:w-1/2 flex flex-col items-center justify-center text-center">
      <Lottie animationData={animationData} loop className="max-w-md w-3/4 mx-auto" />
      <p className="mt-6 text-lg sm:text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#0c549f] to-[#00ddb3]">
        {displayedText}
        <span className="animate-pulse">|</span>
      </p>
    </div>
  );
}
