import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/Leaderboard.css";
import axios from "axios";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const Leaderboard = () => {
  const [selectedChallengeId, setSelectedChallengeId] = useState<number | null>(
    null
  );
  const [selectProb, setSelectedProb] = useState(null);
  const [leaders, setLeaders] = useState(null);

  const getChallenges = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const id = user.id;
    const data = await axios.get(`http://localhost:3003/sub/get/${id}`);
    setLeaders(data.data.data);
  };
  const handleChallengeClick = (challengeId: number) => {
    setSelectedChallengeId(challengeId);
  };

  useEffect(() => {
    getChallenges();
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="container my-8">
        {selectedChallengeId && selectProb ? (
          <>
            <div className="leaderboard-header fade-in">
              <button
                className="back-button"
                onClick={() => setSelectedChallengeId(null)}
              >
                ← Back to Submissions
              </button>
              <h1 className="mb-4">{selectProb.problem?.problem_header}</h1>
            </div>

            <div className="card slide-in">
              <div className="card-header">
                <h2>Code</h2>
              </div>
              <div className="card-content">
                <table className="leaderboard-table">
                  <SyntaxHighlighter language="python" style={materialDark}>
                    {selectProb.code}
                  </SyntaxHighlighter>
                </table>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="card slide-in">
              <div className="card-header">
                <h2>Submissions</h2>
              </div>
              <div className="card-content">
                <table className="leaderboard-table">
                  <thead>
                    <tr>
                      <th>Problem</th>
                      <th>Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaders &&
                      leaders?.map((entry, idx) => (
                        <tr
                          key={entry._id}
                          className={idx + 1 <= 3 ? `rank-${idx + 1}` : ""}
                        >
                          <td>
                            <div className="problems-list">
                              <button
                                key={entry._id}
                                className="problem-link"
                                onClick={() => {
                                  setSelectedProb(entry);
                                  handleChallengeClick(entry._id);
                                }}
                              >
                                {entry.problem.problem_header}
                              </button>
                            </div>
                          </td>
                          <td>{formatTime(entry.time) || 0}</td>
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
