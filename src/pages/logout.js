import { Logo } from "../component/icons";
import '../style/index.css'

function Logout() {

    localStorage.removeItem('name');

    setTimeout(function () { window.location.replace("https://duckmusic.vercel.app/"); }, 2000);

    return (
        <div>
            <h1 className="authtext">Wylogowywanie...</h1>
        </div>
        )
}

export default Logout;