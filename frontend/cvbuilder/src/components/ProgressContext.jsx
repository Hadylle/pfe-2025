// components/ProgressContext.js
import { createContext, useContext, useState, useRef } from 'react';

const ProgressContext = createContext();

export const ProgressProvider = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [label, setLabel] = useState('Loading...');
  const intervalRef = useRef(null);

  const start = (labelText = 'Loading...') => {
    setLabel(labelText);
    setProgress(0);
    setVisible(true);
    intervalRef.current = setInterval(() => {
      setProgress((prev) => (prev < 95 ? prev + Math.floor(Math.random() * 3 + 1) : prev));
    }, 150);
  };

  const complete = () => {
    clearInterval(intervalRef.current);
    setProgress(100);
    setTimeout(() => setVisible(false), 600);
  };

  const error = () => {
    clearInterval(intervalRef.current);
    setVisible(false);
  };

  return (
    <ProgressContext.Provider value={{ visible, progress, label, start, complete, error }}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => useContext(ProgressContext);
