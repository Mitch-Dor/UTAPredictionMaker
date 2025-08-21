import { React } from 'react';
import { Routes, Route } from 'react-router-dom';

// Pages and Routes
import VoteS2S2 from '../mainComponents/js/VoteS2S2';
import Leaderboard from '../mainComponents/js/Leaderboard';
import Profile from '../mainComponents/js/Profile';

function RouteControl() {
  return (
      <Routes>
        <Route exact path='/' element={<VoteS2S2 />} />
        <Route exact path='/leaderboard' element={<Leaderboard />} />
        <Route exact path='/profile' element={<Profile />} />
      </Routes>
  );
}

export default RouteControl;
