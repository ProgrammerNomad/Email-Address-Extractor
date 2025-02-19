import { useState, useEffect } from 'react';
import { loadFromLocalStorage } from '../../utils/storage';

export default function RecentExtractions() {
  const [history, setHistory] = useState([]);
  
  useEffect(() => {
    const savedHistory = loadFromLocalStorage('extractionHistory') || [];
    setHistory(savedHistory.slice(0, 5)); // Show last 5 extractions
  }, []);

  return (
    <div className="recent-extractions">
      <h3>Recent Extractions</h3>
      <div className="list-group">
        {history.map((item, index) => (
          <div key={index} className="list-group-item">
            <div className="d-flex justify-content-between">
              <span>{new Date(item.timestamp).toLocaleString()}</span>
              <span>{item.count} emails</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}