import { useEffect } from "react";
import { io } from "socket.io-client";
import { SetUID } from "./functions";
import "./login.css";

export default function LoginPage() {
  useEffect(() => {
    window.addEventListener("message", (event) => {
        if (event.data) {
            console.log(event.data);
            localStorage.setItem("dmpass", event.data.password);
            localStorage.setItem("emaildm", event.data.mail);
            localStorage.setItem("name", event.data.name);
            SetUID(event.data.uid);
            event.source.postMessage("closenow", "*");
            window.location.pathname = "/";
        }     
    });
    window.open("https://login.theduck.ml/v2/auth/login", 'Logowanie', "popup")
  }, []);
  return <div className="loginpage"></div>;
}
