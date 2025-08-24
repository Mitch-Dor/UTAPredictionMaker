import React, { useEffect, useState } from 'react';
import '../css/voteS2S2.css'
import HeaderBar from '../../sideComponents/js/HeaderBar.jsx';
import Vote from '../../sideComponents/js/Vote.jsx';
import { getPolls, getUserResponses } from './backendCalls/http.js';

// import { isAdmin } from './backendCalls/http.js';


export default function VoteS2S2() {
  const [polls, setPolls] = useState([]);
  const [userResponses, setUserResponses] = useState([]);
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    async function getPollData() {
      const pollData = await getPolls();
      if (user) {
        const responses = await getUserResponses(user.user_id);
        // merge with existing polls
        const mergedPolls = pollData.map(poll => {
          const userPoll = responses.find(u => u.poll_id === poll.poll_id);
          return userPoll ? { ...poll, user_selection: userPoll.user_selection } : poll;
        });
        setPolls(mergedPolls);
        setUserResponses(responses);
      } else {
        setPolls(pollData);
      }
    }

    getPollData();
  }, [user]);

  function useMockData(){
    const mockPolls = [
      {title: 'Who Wins?', options: [{str: "Philadelphia Phanpys", option_id: 9, totalSelections: 4}, {str: "Team4", option_id: 10, totalSelections: 6}], poll_id: 4, end_date: "2025-08-20T15:00:00Z", totalSelections: 10, correct_id: 10},
      {title: 'Who Is Stronger?', options: [{str: "Arceus", option_id: 6, totalSelections: 7}, {str: "Dialga", option_id: 7, totalSelections: 1}, {str: "Palkia", option_id: 8, totalSelections: 2}, {str: "Giratina", option_id: 11, totalSelections: 2}], poll_id: 3, end_date: "2025-08-18T23:59:59Z", totalSelections: 10, correct_id: 7},
      {title: 'Who Wins?', options: [{str: "Team1", option_id: 4, totalSelections: 4}, {str: "Team2", option_id: 5, totalSelections: 6}], poll_id: 2, end_date: "2025-08-25T02:40:00Z", totalSelections: 10, correct_id: null},
      {title: 'Who Is Stronger?', options: [{str: "Groudon", option_id: 1, totalSelections: 3}, {str: "Kyogre", option_id: 2, totalSelections: 4}, {str: "Rayquaza", option_id: 3, totalSelections: 3}], poll_id: 1, end_date: "2025-08-27T09:30:00Z", totalSelections: 10, correct_id: null},
    ];
    const mockUserPolls = [
      {poll_id: 4, user_selection: 9},
      {poll_id: 1, user_selection: 2}
    ];

    setPolls(mockPolls);
    setUserResponses(mockUserPolls);
  }

  return (
    <div id="mainContainer">
        <HeaderBar setUser={setUser} />
        <div className="voteContent">
          {polls.map((poll) => {
            return <Vote key={poll.poll_id} poll={poll} setPolls={setPolls} user={user} />
          })}
        </div>
    </div>
  );
}