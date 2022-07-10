import { useHistory } from "react-router-dom";
import { Logo } from "../component/icons";
import "../style/index.css";
import { SetUID } from "./functions";

function Logout() {
  const history = useHistory();
  if (navigator.onLine) {
    localStorage.removeItem("namedm");
    localStorage.removeItem("emailduckmusic");
    localStorage.removeItem("dmpass");
    localStorage.removeItem("duckmusic.userid");

    setTimeout(function () {
      window.location.replace("https://duckmusic.vercel.app/");
    }, 2000);

    return (
      <div>
        <h1 className="authtext">Wylogowywanie...</h1>
      </div>
    );
  } else {
    history.push("/");
  }
}

export default Logout;
