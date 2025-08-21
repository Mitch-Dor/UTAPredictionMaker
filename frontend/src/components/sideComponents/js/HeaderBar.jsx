import { useNavigate } from 'react-router-dom';

export default function HeaderBar({ }) {
    const navigate = useNavigate();
    
    return (
        <div>
            <button id="SingleDraft" className="modeBTN bigBTNs" onClick={() => navigate('/single-draft')}>Single Draft</button>
            <button id="DraftSandbox" className="modeBTN bigBTNs" onClick={() => navigate('/draft-sandbox')}>Draft Sandbox</button>
            <button id="MultiDraft" className="modeBTN bigBTNs" onClick={() => navigate('/multi-draft')}>Multiplayer Draft</button>
        </div>
    )
}