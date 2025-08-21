import React, { useEffect, useState } from 'react';
import '../css/voteS2S2.css'
import HeaderBar from '../../sideComponents/js/HeaderBar.jsx';
// import { isAdmin } from './backendCalls/http.js';


export default function VoteS2S2() {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(false);

  // useEffect(() => {
  //   async function checkAdmin() {
  //     if (user) {
  //       const admin = await isAdmin(user.user_google_id);
  //       setAdmin(admin);
  //     }
  //   }
  //   checkAdmin();
  // }, [user]);
  
  return (
    <div id="mainContainer">
        <HeaderBar />
    </div>
  );
}