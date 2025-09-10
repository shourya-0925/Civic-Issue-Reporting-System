import { useEffect } from "react";

const Chatbot = () => {
  useEffect(() => {
    // Load JotForm chatbot script
    const script = document.createElement('script');
    script.src = 'https://cdn.jotfor.ms/agent/embedjs/019934662e017cedaac95d9cacc6c8e8d42c/embed.js?skipWelcome=1&maximizable=1';
    script.async = true;
    
    document.head.appendChild(script);
    
    // Cleanup function to remove script when component unmounts
    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  // JotForm chatbot will handle its own UI
  return null;
};

export default Chatbot;