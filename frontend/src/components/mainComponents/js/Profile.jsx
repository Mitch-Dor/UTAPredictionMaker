import React, { useEffect, useState } from 'react';
import '../css/profile.css'
import HeaderBar from '../../sideComponents/js/HeaderBar.jsx';
import { updateProfile } from './backendCalls/http.js';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [mode, setMode] = useState("view");

  function isValidImage(url) {
    return new Promise((resolve) => {
      if (!url) return resolve(false); // empty string
      const img = new Image();
      img.onload = () => resolve(true);   // successfully loaded
      img.onerror = () => resolve(false); // failed to load
      img.src = url;
    });
  }

  async function submitProfileUpdates() {
    const nameValue = document.getElementById("nameInput").value;
    const pfpValue = document.getElementById("pfpInput").value ? document.getElementById("pfpInput").value : user.profile_picture;
    const valid = await isValidImage(pfpValue);
    if (!valid) {
      alert("Profile picture URL is invalid or does not resolve to an image.");
      return;
    } else {
    }
    const resultData = await updateProfile(user.user_id, nameValue, pfpValue);
    if(resultData === 440) {
      alert("New name was flagged.");
      return;
    }
    setUser(prevUser => ({
      ...prevUser,             // keep all existing properties
      display_name: resultData.user.display_name,  // overwrite display_name
      profile_picture: resultData.user.profile_picture
    }));
    setMode("view");
  }

  return (
    <div className="profileContainer">
        <HeaderBar setUser={setUser} />
        <div className="profileContent">
          <div className="profilePicture">
            <img src={`${user && user.profile_picture ? user.profile_picture : '/assets/UTALogo.png'}`} />
          </div>
          {mode === "view" ? (
            <div className="profileInformationDisplay">
              <div className="switchModes" onClick={() => {setMode("edit")}}>Edit Profile</div>
              <div className="profileAttribute">
                <div className="profileAttributeLabel">E-Mail:</div>
                <div className="profileAttributeText">{user && user.email ? user.email : '???'}</div>
              </div>
              <div className="profileAttribute">
                <div className="profileAttributeLabel">Display Name:</div>
                <div className="profileAttributeText">{user && user.display_name ? user.display_name : user && user.name ? user.name : '???'}</div>
              </div>
            </div>
          ) : (
            <div className="profileInformationDisplay">
              <div className="switchModes" onClick={() => {setMode("view")}}>Stop Editing</div>
              <div className="profileAttribute">
                <div className="profileAttributeLabel">Diplay Name</div>
                <input type="text" className="profileAttributeInput" id="nameInput" placeholder="Display Name"></input>
              </div>
              <div className="profileAttribute">
                <div className="profileAttributeLabel">Profile Picture (URL)</div>
                <input type="text" className="profileAttributeInput" id="pfpInput" placeholder="Profile Picture (URL)"></input>
              </div>
              <button className="submitProfileChanges" onClick={() => {submitProfileUpdates()}}>Submit Changes</button>
            </div>
          )}
        </div>
    </div>
  );
}