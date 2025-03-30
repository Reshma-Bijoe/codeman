import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import CodeEditor from "../components/CodeEditor";
import TestResults from "../components/TestResults";
import {
  Challenge as CH,
  getChallengeLeaderboard,
} from "../lib/challengesData";
import "../styles/Challenge.css";
import axios from "axios";

const Challenge = () => {
  const { id } = useParams<{ id: string }>();
  const [challenge, setChallenge] = useState<CH | null>(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [leaderboard, setLeaderboard] = useState([]);

  const [code, setCode] = useState("");
  const [testResults, setTestResults] = useState<
    {
      id: number;
      name: string;
      status: "pass" | "fail" | "running";
      message?: string;
    }[]
  >([]);
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [timer, setTimer] = useState<number>(0);
  const [timerRunning, setTimerRunning] = useState<boolean>(false);
  const [solved, setSolved] = useState<boolean>(false);
  const [pyodide, setPyodide] = useState(null);

  const getChallenge = async () => {
    const data = await axios.get(`http://localhost:3003/problems/${id}`);
    setChallenge(data.data.data);
  };

  const getLeaderboard = async () => {
    if (id) {
      const data = await axios.get(
        `http://localhost:3003/leader/getbyproblem/${id}`
      );
      setLeaderboard(data.data.data);
    }
  };

  useEffect(() => {
    // Check if user is logged in
    const loggedInUser = localStorage.getItem("user");
    getLeaderboard();
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
    if (!loggedInUser) {
      navigate("/welcome");
    }
    getChallenge();
  }, [navigate]);

  useEffect(() => {
    if (challenge) {
      setCode(challenge.defaultCode);
    }
  }, [challenge]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timerRunning) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerRunning]);

  if (!challenge) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container my-8 text-center">
          <h1>Challenge not found</h1>
          <Link to="/challenges" className="btn btn-primary mt-4">
            Back to Challenges
          </Link>
        </div>
      </div>
    );
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const startSolving = () => {
    if (!timerRunning) {
      setTimerRunning(true);
    }
  };

  const runTests = async () => {
    setIsRunning(true);
    setTestResults([]);

    try {
      const res = await axios.post("http://localhost:3003/problems/run", {
        code,
        testCases: challenge.test_cases,
      });
      const data = res.data;

      if (data.error) {
        setTestResults([
          { id: 0, name: "Error", status: "fail", message: data.error },
        ]);
      } else {
        const results = data.output
          .split("\n")
          .map((line, index) => {
            const match = line.match(
              /Input: (.*?) => Output: (.*?) \| Expected: (.*?) \| (✅|❌)/
            );
            if (match) {
              return {
                id: index,
                name: `Test Case ${index + 1}`,
                status: match[4] === "✅" ? "pass" : "fail",
                message:
                  match[4] === "✅"
                    ? undefined
                    : `Expected: ${match[3]}, Got: ${match[2]}`,
              };
            }
            return null;
          })
          .filter(Boolean);

        setTestResults(results);
      }
    } catch (error) {
      setTestResults([
        { id: 0, name: "Error", status: "fail", message: error.message },
      ]);
    }

    setIsRunning(false);
  };

  const handleSubmit = async () => {
    if (testResults.length === 0) {
      alert("Please run the tests before submitting.");
      return;
    }
    const completionTime = formatTime(timer);

    const allPassed = testResults.every((test) => test.status === "pass");

    if (!allPassed) {
      alert("Your solution failed some test cases. Please fix and try again.");
      return;
    }

    console.log("user", user);

    setIsSubmitting(true);

    const updateTimer = await axios.post(
      "http://localhost:3003/problems/update",
      { time: timer, user: user.id, problem: challenge._id }
    );

    const udpateLeader = await axios.post(
      "http://localhost:3003/leader/postleaderdata",
      { newtime: timer, userId: user.id, problemId: challenge._id }
    );

    setIsSubmitting(false);

    navigate('/');

    // completions.push({
    //   challengeId: challenge._id,
    //   userId: user.id,
    //   username: user.username,
    //   completionTime,
    //   timestamp: new Date().toISOString(),
    // });
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="container my-8">
        <div className="flex justify-between items-center mb-4 fade-in">
          <div>
            <Link to="/challenges" className="navbar-link mb-2 inline-block">
              ← Back to Challenges
            </Link>
            <h1>{challenge.problem_header}</h1>
            <div className="flex gap-2 my-2">
              <span
                className={`badge badge-outline ${
                  challenge.difficulty_level === "low"
                    ? "difficulty-easy"
                    : challenge.difficulty_level === "medium"
                    ? "difficulty-medium"
                    : "difficulty-hard"
                }`}
              >
                {challenge.difficulty_level}
              </span>
              {challenge?.tags?.map((tag, index) => (
                <span key={index} className="badge badge-secondary">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="challenge-actions">
            {timerRunning && (
              <div className="timer-display">Time: {formatTime(timer)}</div>
            )}
            <button
              className="btn btn-outline"
              onClick={() => setShowLeaderboard(!showLeaderboard)}
            >
              {showLeaderboard ? "Hide Leaderboard" : "Show Leaderboard"}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            className={`${showLeaderboard ? "md:col-span-2" : "md:col-span-3"}`}
          >
            <div className="card mb-8 slide-in">
              <div className="card-header">
                <h2>Problem Description</h2>
              </div>
              <div className="card-content">
                <p>{challenge.problem_description}</p>

                {!timerRunning && !solved && (
                  <button
                    className="btn btn-primary mt-4"
                    onClick={startSolving}
                  >
                    Start Solving
                  </button>
                )}
              </div>
            </div>

            {(timerRunning || solved) && (
              <div className="editor-container mb-8 fade-in">
                <div className="editor-header">
                  <span>Python</span>
                  <div className="flex gap-2">
                    <button
                      className="btn btn-outline"
                      onClick={runTests}
                      disabled={isRunning}
                    >
                      {isRunning ? "Running..." : "Run Tests"}
                    </button>
                    <button
                      className="btn btn-primary"
                      onClick={handleSubmit}
                      disabled={isSubmitting || isRunning || solved}
                    >
                      {isSubmitting
                        ? "Submitting..."
                        : solved
                        ? "Submitted"
                        : "Submit Solution"}
                    </button>
                  </div>
                </div>
                <CodeEditor value={code} onChange={setCode} language="python" />
              </div>
            )}

            {(timerRunning || solved) && (
              <TestResults testCases={testResults} isRunning={isRunning} />
            )}
          </div>

          {showLeaderboard && (
            <div className="md:col-span-1 fade-in">
              <div className="card">
                <div className="card-header">
                  <h2>Top Performers</h2>
                </div>
                <div className="card-content">
                  <table className="leaderboard-table">
                    <thead>
                      <tr>
                        <th>Rank</th>
                        <th>User</th>
                        <th>Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leaderboard.map((entry, idx) => (
                        <tr key={entry._id} className={`rank-${idx + 1}`}>
                          <td>#{idx + 1}</td>
                          <td>
                            <div className="flex items-center gap-2">
                              {entry?.author?.username}
                            </div>
                          </td>
                          <td>{formatTime(entry.time)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Challenge;
