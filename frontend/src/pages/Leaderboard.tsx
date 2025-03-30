import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import {
  leaderboard,
  challenges,
  getChallengeLeaderboard,
  Challenge,
} from "../lib/challengesData";
import "../styles/Leaderboard.css";
import axios from "axios";

const Leaderboard = () => {
  const [selectedChallengeId, setSelectedChallengeId] = useState<number | null>(
    null
  );
  const [selectProb, setSelectedProb] = useState<Challenge>();

  const [leaders, setLeaders] = useState<Challenge[]>(null);
  const [allLeaders, setAllLeaders] = useState(null);

  const getChallenges = async () => {
    const data = await axios.get("http://localhost:3003/problems/get/all");
    setLeaders(data.data.data);
  };
  const handleChallengeClick = (challengeId: number) => {
    setSelectedChallengeId(challengeId);
  };

  useEffect(() => {
    getChallenges();
  }, []);

  const getLeaderByproblem = async (id) => {
    const data = await axios.get(
      `http://localhost:3003/leader/getbyproblem/${id}`
    );
    setAllLeaders(data.data.data);
  };

  useEffect(() => {
   if (selectedChallengeId) {
     getLeaderByproblem(selectedChallengeId);
   }
  }, [selectedChallengeId]);

  const formatTime = (seconds: number) => {
    console.log("se", seconds);
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
                ← Back to Global Leaderboard
              </button>
              <h1 className="mb-4">
                Leaderboard: {selectProb?.problem_header}
              </h1>
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
                    {allLeaders?.map((entry, idx) => (
                      <tr
                        key={entry.id}
                        className={idx + 1 <= 3 ? `rank-${idx + 1}` : ""}
                      >
                        <td>#{idx + 1}</td>
                        <td>
                          <div className="flex items-center gap-2">
                            {entry?.author?.username}
                          </div>
                        </td>
                        <td>{formatTime(entry?.time)}</td>
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
                    {leaders?.map(
                      (entry, idx) =>
                        entry.best_time && (
                          <tr
                            key={entry._id}
                            className={idx + 1 <= 3 ? `rank-${idx + 1}` : ""}
                          >
                            <td>#{idx + 1}</td>
                            <td>
                              <div className="flex items-center gap-2">
                                {entry?.best_author?.username}
                              </div>
                            </td>
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
                                  {entry.problem_header}
                                </button>
                              </div>
                            </td>
                            <td>{formatTime(entry.best_time) || 0}</td>
                            <td>{5}</td>
                          </tr>
                        )
                    )}
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
