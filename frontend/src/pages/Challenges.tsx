import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ChallengeCard from "../components/ChallengeCard";
import axios from "axios";
import { Challenge } from "../lib/challengesData";

const Challenges = () => {
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [challenges, setChallenges] = useState<Challenge[]>(null);

  const filteredChallenges = challenges?.filter((challenge) => {
    const matchesDifficulty =
      filter === "all" ||
      challenge.difficulty_level.toLowerCase() === filter.toLowerCase();
    const matchesSearch =
      challenge.problem_header
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      challenge.problem_description
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      challenge?.tags?.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );

    return matchesDifficulty && matchesSearch;
  });

  const getChallenges = async () => {
    const data = await axios.get("http://localhost:3003/problems/get/all");
    setChallenges(data.data.data);
  };

  useEffect(() => {
    getChallenges();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />

      {challenges && (
        <main className="container my-8">
          <div className="flex justify-between items-center mb-8 fade-in">
            <h1>Coding Challenges</h1>
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="Search challenges..."
                className="px-4 py-2 border border-border rounded-md"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="flex gap-4 mb-8 slide-in">
            <button
              className={`btn ${
                filter === "all" ? "btn-primary" : "btn-outline"
              }`}
              onClick={() => setFilter("all")}
            >
              All
            </button>
            <button
              className={`btn ${
                filter === "easy" ? "btn-primary" : "btn-outline"
              }`}
              onClick={() => setFilter("low")}
            >
              Easy
            </button>
            <button
              className={`btn ${
                filter === "medium" ? "btn-primary" : "btn-outline"
              }`}
              onClick={() => setFilter("medium")}
            >
              Medium
            </button>
            <button
              className={`btn ${
                filter === "hard" ? "btn-primary" : "btn-outline"
              }`}
              onClick={() => setFilter("hard")}
            >
              Hard
            </button>
          </div>

          <div className="grid grid-cols-3">
            {filteredChallenges?.map((challenge) => (
              <ChallengeCard key={challenge._id} challenge={challenge} />
            ))}

            {filteredChallenges?.length === 0 && (
              <div className="col-span-3 text-center my-16">
                <h3>No challenges found</h3>
                <p>Try changing your search or filter criteria</p>
              </div>
            )}
          </div>
        </main>
      )}
    </div>
  );
};

export default Challenges;
