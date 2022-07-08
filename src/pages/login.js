import { useEffect } from "react";
import { io } from "socket.io-client";
import { SetUID } from "./functions";
import "./login.css";

export default function LoginPage() {
  useEffect(() => {
    window.addEventListener("message", (event) => {
        if (event.data != "__KILLPROCESS") {
            console.log(event.data);
            localStorage.setItem("dmpass", event.data.password);
            localStorage.setItem("emaildm", event.data.mail);
            localStorage.setItem("name", event.data.name);
            SetUID(event.data.uid);
        } else {
          window.location.pathname = "/";
          setTimeout(() => {
            window.location.reload(true);
          }, 100)
        }
    });
  }, []);
  return <div className="loginpage">
    <iframe className="loginFrame" src="http://192.168.0.108:3001/v3/auth/login&form=iframe&theme=light" />
  </div>;
}
