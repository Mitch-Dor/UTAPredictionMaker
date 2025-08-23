import '../css/signIn.css';

export default function SignIn({ }) {

    return (
        <div className="signInContainer">
            <div className="signInInputs">
                <input type="text" className="signInInput" id="usernameInput" placeholder='username'></input>
                <input type="password" className="signInInput" id="passwordInput" placeholder='password'></input>
            </div>
            <button className="submitButton">Log In</button>
        </div>
    )
}