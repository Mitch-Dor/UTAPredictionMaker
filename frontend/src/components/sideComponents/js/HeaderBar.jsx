import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SignIn from './SignIn';
import WaveSeparatorBottom from './WaveSeparatorBottom';
import '../css/headerBar.css';

export default function HeaderBar({ }) {
    const navigate = useNavigate();
    const [streaks, setStreaks] = useState([]);

    useEffect(() => {
        const interval = setInterval(() => {
        const id = Date.now(); // unique ID
        const top = (Math.random() * 96) + 3;   // 3–99%
        const left = Math.random() * 3;  // 0–3%

        setStreaks((prev) => [...prev, { id, top, left }]);

        // cleanup old streaks after 2s (animation time)
        setTimeout(() => {
            setStreaks((prev) => prev.filter((s) => s.id !== id));
        }, 2000);
        }, 300); // every 0.3s

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="headerBar">
            <div className="UTALogo"  onClick={() => navigate('/')}><img src="/assets/UTALogo.png"></img></div>
            <div className="links">
                <div className="headerLink" onClick={() => navigate('/')}>S2S2 Polls</div>
                <div className="headerLink" onClick={() => navigate('/leaderboard')}>Leaderboard</div>
            </div>
            <div className="loginContainer">
                <SignIn />
            </div>
            <div className="shootingBackground">
                {streaks.map((streak) => (
                    <div
                        key={streak.id}
                        className="streak"
                        style={{ top: `${streak.top}%`, left: `${streak.left}%` }}
                    />
                ))}
            </div>
            <WaveSeparatorBottom color="#4F5178" />
        </div>
    )
}