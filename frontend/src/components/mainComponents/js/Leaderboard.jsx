import { useEffect, useState } from "react";
import { getNumberCorrectResponses } from "./backendCalls/http";
import HeaderBar from "../../sideComponents/js/HeaderBar";
import '../css/leaderboard.css';

export default function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchLeaderboardData() {
      const leaderboard = await getNumberCorrectResponses();
      leaderboard.sort(function(a, b){return b.correct_count - a.correct_count});
      setLeaderboardData(leaderboard);
    }

    fetchLeaderboardData();
  }, []);

  let previousCorrect = -1;
  let previousIndex = -1;

  return (
    <div id="leaderboardContainer">
      <HeaderBar setUser={setUser} />
      <div className="leaderboardContent">
        <div className="leaderboard">
          <div className="leaderBoardTitle">Leaderboard</div>
          <div className="leaderboardHeader">
            <div className="leaderboardHeaderPlace">Place</div>
            <div className="leaderboardHeaderImage">PFP</div>
            <div className="leaderboardHeaderName">User</div>
            <div className="leaderboardHeaderNumber">Number Correct</div>
          </div>
          {leaderboardData.length > 0 && leaderboardData.map((entry, i) => {
            // If this user's correct_count differs from the previous, update previousIndex
            if (entry.correct_count !== previousCorrect) {
              previousIndex = i + 1; // place is 1-based
              previousCorrect = entry.correct_count;
            }

            return (
              <div className="leaderboardEntry" key={i}>
                <div className="leaderboardEntryPlace">{previousIndex}</div>
                <div className="leaderboardEntryImage">
                  <img src={entry.profile_picture} alt="Profile" />
                </div>
                <div className="leaderboardEntryName">
                  {entry.display_name ? entry.display_name : entry.name}
                </div>
                <div className="leaderboardEntryNumber">{entry.correct_count}</div>
              </div>
            );
          })}
        </div>
      </div>
  </div>
  );
}