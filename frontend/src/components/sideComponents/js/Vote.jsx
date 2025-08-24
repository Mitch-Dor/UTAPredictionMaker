import { useState, useEffect } from "react";
import { FaLock } from "react-icons/fa";
import '../css/vote.css';
import { postUserResponse } from "../../mainComponents/js/backendCalls/http";

export default function Vote({ poll, user, setPolls }) {
    const [timeLeft, setTimeLeft] = useState("");
    const [selectedOption, setSelectedOption] = useState(null);
    const numRows = Math.ceil(poll.options.length / 3);
    useEffect(() => {
        function updateCountdown() {
            const now = new Date();
            const end = new Date(poll.end_date);
            const diff = end - now;

            if (diff <= 0) {
                setTimeLeft("Expired");
                return;
            }

            const hours = Math.floor(diff / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            setTimeLeft(
                `${hours.toString().padStart(2, "0")}:` +
                `${minutes.toString().padStart(2, "0")}:` +
                `${seconds.toString().padStart(2, "0")}`
            );
        }

        updateCountdown(); // initial run
        const interval = setInterval(updateCountdown, 1000);

        return () => clearInterval(interval); // cleanup
    }, [poll.end_date]);
    
    function checkVoteable() {
        // If the user voted already
        if (poll.user_selection){
            return false;
        }
        // If the poll has expired
        if (new Date(poll.end_date) < new Date()) {
            return false;
        }
        // If the user is not logged in
        if (!user) {
            return false;
        }
    
        return true;
    }

    async function submitVote() {
        try {
            // 👇 assuming you have `user` globally or via props/context
            const response = await postUserResponse(user.user_id, poll.poll_id, selectedOption);
            if (!response[0].user_id) { // If we got anything back it's good
                console.error("Error submitting user response.");
                return;
            }
            // update local poll state so UI updates
            setPolls(prevPolls => prevPolls.map(p => {
                if (p.poll_id !== poll.poll_id) return p;

                const updatedOptions = p.options.map(opt =>
                    opt.option_id === selectedOption
                        ? { ...opt, totalSelections: (opt.totalSelections || 0) + 1 }
                        : opt
                );

                return {
                    ...p,
                    user_selection: selectedOption,
                    options: updatedOptions,
                    totalSelections: p.totalSelections + 1
                };
            }));

            setSelectedOption(null); // clear highlight after submission
        } catch (err) {
            console.error("Error submitting vote:", err);
        }
    }
    
    return (
        <div className="aPoll">
            {checkVoteable() === false && (
                <div className="pollCover">
                    <FaLock size={20} style={{ color: "rgba(109, 109, 109, 0.309)" }} />
                </div>
            )}
            <div className="pollTitle">{poll.title}</div>
            <div className="availableUntil">{timeLeft !== "Expired" ? `Closes In: ${timeLeft}` : `Expired On ${new Date(poll.end_date).toLocaleString()}`}</div>
            {Array.from({ length: numRows }).map((_, i) => {
                // slice gives you the chunk for this row
                const rowOptions = poll.options.slice(i * 3, i * 3 + 3);

                return (
                <div key={i} className="pollRow">
                    {rowOptions.map((opt) => (
                    <div key={opt.option_id} className={`pollOption ${poll.user_selection === opt.option_id ? 'selected' : ''} ${selectedOption === opt.option_id ? 'selectedOption' : ''}`} onClick={() => {selectedOption === opt.option_id ? submitVote() : setSelectedOption(opt.option_id)}} >
                        <span className={`pollOptionPercentageCover`} style={{ width: `${(opt.totalSelections / poll.totalSelections) * 100}%` }} ></span>
                        <span className={`voteResult ${poll.correct_id !== null ? (opt.option_id === poll.correct_id ? 'winner' : 'loser') : 'undecided'}`} ></span>
                        <img className='pollImage' 
                            src={`https://play.pokemonshowdown.com/sprites/ani/${opt.str.toLowerCase()}.gif`} 
                            alt={opt.str} 
                            onError={(e) => {
                                const img = e.currentTarget;

                                if (!img.dataset.triedTeams) {
                                // First fallback → teams directory
                                img.dataset.triedTeams = "true";
                                img.src = `/assets/teams/${opt.str}.png`;
                                } else {
                                // Final fallback → UTALogo
                                img.src = `/assets/UTALogo.png`;
                                }
                            }}
                        />
                        <div className="optionText">{opt.str}</div>
                    </div>
                    ))}
                </div>
                );
            })}
        </div>
    )
}