
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { leaderboard, challenges, getChallengeLeaderboard } from '../lib/challengesData';
import '../styles/Leaderboard.css';

const Leaderboard = () => {
  const [selectedChallengeId, setSelectedChallengeId] = useState<number | null>(null);
  
  const handleChallengeClick = (challengeId: number) => {
    setSelectedChallengeId(challengeId);
  };
  
  const selectedChallenge = challenges.find(c => c.id === selectedChallengeId);
  const challengeLeaderboard = selectedChallengeId ? getChallengeLeaderboard(selectedChallengeId) : [];
  
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="container my-8">
        {selectedChallengeId ? (
          <>
            <div className="leaderboard-header fade-in">
              <button 
                className="back-button" 
                onClick={() => setSelectedChallengeId(null)}
              >
                ← Back to Global Leaderboard
              </button>
              <h1 className="mb-4">Leaderboard: {selectedChallenge?.title}</h1>
            </div>
            
            <div className="card slide-in">
              <div className="card-header">
                <h2>Top Performers</h2>
              </div>
              <div className="card-content">
                <table className="leaderboard-table">
                  <thead>
                    <tr>
                      <th>Rank</th>
                      <th>User</th>
                      <th>Completion Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {challengeLeaderboard.map((entry) => (
                      <tr key={entry.id} className={entry.rank <= 3 ? `rank-${entry.rank}` : ''}>
                        <td>#{entry.rank}</td>
                        <td>
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full overflow-hidden">
                              <img src={entry.avatar} alt={entry.username} />
                            </div>
                            {entry.username}
                          </div>
                        </td>
                        <td>{entry.completionTime}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : (
          <>
            <h1 className="mb-8 fade-in">Global Leaderboard</h1>
            
            <div className="card slide-in">
              <div className="card-header">
                <h2>Top Performers</h2>
              </div>
              <div className="card-content">
                <table className="leaderboard-table">
                  <thead>
                    <tr>
                      <th>Rank</th>
                      <th>User</th>
                      <th>Problem</th>
                      <th>Time</th>
                      <th>Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaderboard.map((entry) => (
                      <tr key={entry.id} className={entry.rank <= 3 ? `rank-${entry.rank}` : ''}>
                        <td>#{entry.rank}</td>
                        <td>
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full overflow-hidden">
                              <img src={entry.avatar} alt={entry.username} />
                            </div>
                            {entry.username}
                          </div>
                        </td>
                        <td>
                          <div className="problems-list">
                            {challenges.slice(0, 3).map(challenge => (
                              <button
                                key={challenge.id}
                                className="problem-link"
                                onClick={() => handleChallengeClick(challenge.id)}
                              >
                                {challenge.title}
                              </button>
                            ))}
                          </div>
                        </td>
                        <td>
                          {Math.floor(Math.random() * 60) + 30}:{Math.floor(Math.random() * 60).toString().padStart(2, '0')}
                        </td>
                        <td>{entry.score}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Leaderboard;
