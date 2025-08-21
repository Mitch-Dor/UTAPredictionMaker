import { useNavigate } from 'react-router-dom';
import '../css/headerBar.css';

export default function HeaderBar({ }) {
    const navigate = useNavigate();

    return (
        <div className="headerBar">
            <div className="UTALogo"><img src="/assets/UTALogo.png"></img></div>
            <div className="links">
                <div className="headerLink" onClick={() => navigate('/')}>S2S2 Polls</div>
                <div className="headerLink" onClick={() => navigate('/leaderboard')}>Leaderboard</div>
            </div>
        </div>
    )
}