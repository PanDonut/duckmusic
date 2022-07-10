import "./style/index.css";
import { getDatabase, ref, onValue, set } from "firebase/database";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { GetImg } from "./image.js";
import { aut } from "./dauth";
import { SetUID } from "./pages/functions";

function Authorize() {
  const history = useHistory();

  const [uname, setUName] = useState("");
  const { path, uid, pass, cnt } = useParams();

  const analytics = getAnalytics(aut);
  const db = getDatabase(aut);

  SetUID(uid);
  const nameRef = ref(db, "users/" + uid + "/name");
  onValue(nameRef, (snapshot) => {
    const data = snapshot.val();
    localStorage.setItem("name", data);
    if (uname != data) {
      setUName(data);
    }
  });
  localStorage.setItem("dmpass", pass);

  localStorage.setItem("emailduckmusic", path);
  GetImg(aut, path.split(".").join(""));
  console.log(cnt.replace(">", "/"));
  setTimeout(function () {
    history.push(cnt.split(">").join("/"));
  }, 2000);

  return (
    <div>
      <h1 className="authtext">{"Autoryzowanie " + uname}</h1>
    </div>
  );
}

export default Authorize;
