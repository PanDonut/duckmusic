import { useEffect } from "react";
import { io } from "socket.io-client";
import { SetUID } from "./functions";
import "./login.css";

export default function LoginPage() {
  useEffect(() => {
    window.addEventListener("message", (event) => {
        if (event.data.password != undefined) {
            console.log(event.data);
            localStorage.setItem("dmpass", event.data.password);
            localStorage.setItem("emailduckmusic", event.data.mail);
            localStorage.setItem("name", event.data.name);
            SetUID(event.data.uid);
        } 
        if (event.data == "__KILLPROCESS") {
          window.location.pathname = "/";
          setTimeout(() => {
            window.location.reload(true);
          }, 100)
        }
    });
  }, []);
  return <div className="loginpage">
    <iframe className="loginFrame" src="https://login.theduck.ml/v3/auth/login&form=iframe&theme=dark&appId=420691" />
  </div>;
}
