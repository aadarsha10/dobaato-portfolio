import { useState, useEffect } from 'react';

export function useTypewriter(textArray: string[], speed: number = 100, pause: number = 1000) {
  const [displayText, setDisplayText] = useState('');
  const [index, setIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (isTyping) {
      if (displayText.length < textArray[index].length) {
        timeout = setTimeout(() => {
          setDisplayText((prev) => textArray[index].slice(0, prev.length + 1));
        }, speed);
      } else {
        setIsTyping(false);
        timeout = setTimeout(() => setIsTyping(true), pause);
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText((prev) => prev.slice(0, -1));
        }, speed);
      } else {
        setIndex((prev) => (prev + 1) % textArray.length);
        setIsTyping(true);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, isTyping, textArray, index, speed, pause]);

  return displayText;
}
