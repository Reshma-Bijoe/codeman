
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ChallengeCard from '../components/ChallengeCard';
import { Challenge } from '../lib/challengesData';
import '../styles/Home.css';
import axios from 'axios';

const Home = () => {
  const [user, setUser] = useState(null);
  const [challenges, setChallenges] = useState<Challenge []>(null);

  const navigate = useNavigate();
  
  // Get featured challenges (first 3)
  const featuredChallenges = challenges?.slice(0, 3);

  const getChallenges = async () => {
    const data = await axios.get("http://localhost:3003/problems/get/all");
    setChallenges(data.data.data);
  }

  useEffect(() => {
    // Check if user is logged in
    const loggedInUser = localStorage.getItem('user');
    if (!loggedInUser) {
      navigate('/welcome');
      return;
    }
    getChallenges();
    
    setUser(JSON.parse(loggedInUser));
  }, [navigate]);

  if (!user) return null;

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="container my-8">
        <section className="welcome-section fade-in">
          <h1 className="mb-4">Welcome, {user.username}!</h1>
          <p className="text-center mb-8 max-w-xl mx-auto">
            Ready to improve your Python coding skills? Choose a challenge below
            to get started.
          </p>
          <Link to="/challenges" className="btn btn-primary my-4">
            Explore All Challenges
          </Link>
        </section>

        <section className="my-8 slide-in">
          <div className="flex justify-between items-center mb-4">
            <h2>Featured Challenges</h2>
            <Link to="/challenges" className="navbar-link">
              View All Challenges →
            </Link>
          </div>
          <div className="grid grid-cols-3">
            {featuredChallenges && featuredChallenges.map((challenge) => (
              <ChallengeCard key={challenge._id} challenge={challenge} />
            ))}
          </div>
        </section>

        <section className="my-8 fade-in">
          <div className="card">
            <div className="card-header">
              <h2>How It Works</h2>
            </div>
            <div className="card-content">
              <div className="grid grid-cols-3">
                <div className="text-center p-4">
                  <h3>1. Choose a Challenge</h3>
                  <p>
                    Browse through our collection of Python coding challenges,
                    ranging from easy to hard difficulty.
                  </p>
                </div>
                <div className="text-center p-4">
                  <h3>2. Write Your Solution</h3>
                  <p>
                    Use our online Python editor to write and test your solution
                    against sample test cases.
                  </p>
                </div>
                <div className="text-center p-4">
                  <h3>3. Submit and Compare</h3>
                  <p>
                    Submit your solution to see how you rank against other
                    coders on the leaderboard.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
