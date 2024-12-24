import { useState, useEffect } from 'react';

export function useTypewriter(text: string, speed: number = 100) {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (displayText.length < text.length && isTyping) {
      const timeout = setTimeout(() => {
        setDisplayText(text.slice(0, displayText.length + 1));
      }, speed);
      return () => clearTimeout(timeout);
    } else if (displayText.length === text.length) {
      setIsTyping(false);
    }
  }, [displayText, text, speed, isTyping]);

  return displayText;
}