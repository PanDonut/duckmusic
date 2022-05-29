import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useReducer,
} from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { changePlay } from "./actions";
import { konsol } from "./actions";
import { connect } from "react-redux";
import { firebaseg, songTrack } from "./actions/index";
import Lyrics from "./component/Lyrics";
import QueueShow from "./pages/queue";
import Draggable from "react-draggable";
import { RgbStringColorPicker } from "react-colorful";
import { initializeApp } from "firebase/app";
import {
  getAnalytics,
  initializeAnalytics,
  logEvent,
} from "firebase/analytics";
import { getDatabase, ref, onValue, set } from "firebase/database";
import { signInWithEmailAndPassword } from "firebase/auth";
import useWindowSize from "./hooks/useWindowSize";
import Sidebar from "./component/sidebar/sidebar";
import MobileNavigation from "./component/sidebar/mobile-navigation";
import Footer from "./component/footer/footer";
import FooterTop from "./component/footer/footertop";
import Home from "./pages/home";
import Sylwester2021 from "./pages/event_sylwester202122";
import Search from "./pages/search";
import Library from "./pages/library";
import Artist from "./pages/artist";
import PlaylistPage from "./pages/playlist";
import PlaylistPageC from "./pages/playlistc";
import SongPage from "./pages/songlist";
import Embed from "./pages/embed";
import Info from "./pages/info";
import EmbedSmall from "./pages/embed-s";
import * as Icons from "./component/icons/index";
import CONST from "./constants/index";
import PLAYLIST from "./data/index.json";
import SONGLIST from "./data/songs.json";
import styles from "./style/App.module.css";
import Card from "./component/cards/playlist-card-m";
import NotFound from "./pages/404";
import Rewind from "./pages/rewind";
import LyricsCard from "./component/lyrics/lyrics-main";
import { keepTheme } from "./theme";
import Connection from "./pages/connection";
import Settings from "./pages/settings";
import Profile from "./pages/profile";
import Logout from "./pages/logout";
import { aut } from "./dauth";
import Login from "./login";
import "./security.js";
import "./menu.css";
import HandleAuth from "./authorization.js";
import Download_app from "./pages/download_app";
import ShareCustomPlaylist from "./pages/playlistshare";
import ShowOff from "./pages/showoff";
import ViewRewind from "./pages/rewind_viewer";
import Confetti from "canvas-confetti";
import { io } from "socket.io-client";
import { CreateEmptyPlaylist } from "./playlistcreator";
import { GetUID } from "./pages/functions";

let indexn = null;

const clamp = (val, in_min, in_max, out_min, out_max) =>
  ((val - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;

var isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
function App(props) {
  useEffect(() => {
    const socket = io("http://localhost:42069");
    socket.on("connect", () => {
      socket.emit("conapp", "Duck Music");
      console.log("CON");
    });
  }, []);
  const size = useWindowSize();

  const [si, sE] = useState(false);
  const db1 = getDatabase();
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  let pl = null;
  let [usd, setUsd] = useState("none");
  let [utr, setUtr] = useState(null);
  if (localStorage.getItem("emaildm") != null && si == false) {
    const refData = ref(
      db1,
      "userdata/" +
        localStorage.getItem("emaildm").split(".").join("") +
        "/playing/deviceid"
    );
    const refData1 = ref(
      db1,
      "userdata/" +
        localStorage.getItem("emaildm").split(".").join("") +
        "/playing/track"
    );
    const refReq = ref(
      db1,
      "userrequests/" +
        localStorage.getItem("emaildm").split(".").join("") +
        "/pause"
    );
    onValue(refData, (snapshot) => {
      const data = snapshot.val();
      if (usd != data) {
        setUsd(data);
      }
    });
    var hearts = [
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
    ];
    onValue(refData1, (snapshot) => {
      const data = snapshot.val();
      if (utr != data) {
        setUtr(data);
      }
    });

    onValue(refReq, (snapshot) => {
      const data = snapshot.val();
      if (data != null) {
        if (
          JSON.parse(data)[0] == localStorage.getItem("deviceiddm") &&
          JSON.parse(data)[1] == "true"
        ) {
          props.changePlay(false);
          set(
            ref(
              db1,
              "userrequests/" +
                localStorage.getItem("emaildm").split(".").join("")
            ),
            {
              pause: null,
            }
          );
        }
      }
    });
  }

  const hcols = ["#db1414", "#db144c", "#ff5c8a", "#b52a84", "#fc2b2b"];

  if (
    localStorage.getItem("fadetime") == null ||
    localStorage.getItem("fadetime") == 0
  ) {
    localStorage.setItem("fadetime", 1);
  }
  if (localStorage.getItem("dmsavedata") == null) {
    localStorage.setItem(
      "dmsavedata",
      JSON.stringify([
        {
          type: 0,
          data: [0, 0],
          time: 0,
        },
      ])
    );
  }

  const footerRef = useRef(null);
  const db = getDatabase(aut);
  const letters = "aąbcćdeęfghijklłmnoóprstuwyzźż1234567890~`!@#$%^&*()-_+=[]{}|,.<>?".split(
    ""
  );

  useEffect(() => {
    if (GetUID() != null && localStorage.getItem("dmpass") != null) {
      console.log(
        localStorage
          .getItem("dmpass")
          .split("")
          .map((l) => {
            return letters[letters.indexOf(l) - 3];
          })
          .join("")
      );
    }
  }, [GetUID()]);
  const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });
  const [show, setShow] = useState(false); // hide menu
  const handleContextMenu = useCallback(
    (event) => {
      event.preventDefault();
      setAnchorPoint({ x: event.pageX, y: event.pageY });
      setShow(true);
    },
    [setAnchorPoint]
  );
  const [input, setInput] = useState("");
  const [create, setCreate] = useState(false);
  const [color, setColor] = useState("");
  if (color != "rgb(0,0,0)") {
    document.documentElement.style.setProperty("--color", color);
  }
  function StartPlaylistCreation() {
    setCreate(true);
  }

  const handleClick = useCallback(() => (show ? setShow(false) : null), [show]);

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  });

  useEffect(() => {
    keepTheme();
  });
  const d = new Date();

  const header = useRef(null);
  const consolewindow = useRef(null);
  var showhearts = false;

  if (localStorage.getItem("shuffle") == "true") {
  } else if (localStorage.getItem("shuffle") == "false") {
  } else {
    localStorage.setItem("shuffle", "false");
  }

  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  const [isMouseDown, setDown] = useState(false);

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    if (isMouseDown == true) {
      consolewindow.current.style.top = e.pageY - 20 + "px";
      consolewindow.current.style.left = e.pageX - 20 + "px";
    }
  }

  const [tourStep, setTourStep] = useState(0);

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }

  const [setIt, setI] = useState(false);

  if (localStorage.getItem("deviceiddm") == null) {
    if (isIOS == true) {
      localStorage.setItem("deviceiddm", "IPhone");
    } else {
      localStorage.setItem(
        "deviceiddm",
        Math.random().toString(36).substring(2, 15) +
          Math.random().toString(36).substring(2, 15) +
          Math.random().toString(36).substring(2, 15)
      );
    }
  }

  if (localStorage.getItem("emaildm") != null && props.isPlaying == true) {
    if (setIt == true) {
      setI(false);
    }
    set(
      ref(
        db1,
        "userdata/" +
          localStorage.getItem("emaildm").split(".").join("") +
          "/playing"
      ),
      {
        track: props.trackData.trackName + " · " + props.trackData.trackArtist,
        deviceid: localStorage.getItem("deviceiddm"),
      }
    );
  } else if (
    localStorage.getItem("emaildm") != null &&
    props.isPlaying == false &&
    setIt == false
  ) {
    setI(true);
    set(
      ref(
        db1,
        "userdata/" +
          localStorage.getItem("emaildm").split(".").join("") +
          "/playing"
      ),
      {
        deviceid: "none",
      }
    );
  }

  window.addEventListener("beforeunload", function (e) {
    // the absence of a returnValue property on the event will guarantee the browser unload happens
    if (si == false) {
      sE(true);
      delete e["returnValue"];
      set(
        ref(
          db1,
          "userdata/" +
            localStorage.getItem("emaildm").split(".").join("") +
            "/playing"
        ),
        {
          deviceid: "none",
        }
      );
    }
  });

  const [executedCmds, setexecutedCmds] = useState([
    "Wpisz help aby zobaczyć listę dostępnych komend",
  ]);

  const cmds = useRef(null);
  const [command, setCommand] = useState("");
  const inptcmd = useRef(null);
  function executeCmd(event) {
    if (event.keyCode === 13) {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      console.log("cmd-execute " + command);
      if (command == "help") {
        setexecutedCmds((oldArray) => [
          ...oldArray,
          "help \nhelp - Wyświetla listę dostępnych komend\ndelcache - Usuwa dane offline\nreload <true/false/brak> - Restartuje Duck Music\nplayer <command[play/pause/toggle/song <id>]>\nmanipulate <zmienna> - Ustaw wartość zmiennej\nclear - Czyści konsolę\ncalculate <działanie[minus/plus/divide/multiply]> <liczba> [działanie] <liczba>\nstart - Czyści konsolę i pokazuje startową informację konsoli\nkeybinds/shortcuts - Pokazuje menu skrótów klawiszowych\n'I don't even game' - ?",
        ]);
      } else if (command == "delcache") {
        caches.delete("duckmusic-offline-version-storage");
      } else if (command.split(" ")[0] == "reload") {
        console.log(command.split(" ")[1]);
        if (command.split(" ")[1] == "true") {
          window.location.reload(true);
        } else {
          window.location.reload(false);
        }
      } else if (
        command == "70mln" ||
        command == "70 milionów" ||
        command == "siedemdziesiąt milionów"
      ) {
        setexecutedCmds((oldArray) => [
          ...oldArray,
          command +
            " \nWiecie że za taką kwotę Jacek Sasin miał zorganizować wybory, które w rzeczywistości nigdy się nie odbyły?",
        ]);
      } else if (command.split(" ")[0] == "player") {
        console.log(command.split(" ")[1]);
        if (command.split(" ")[1] == "play") {
          props.changePlay(true);
          setexecutedCmds((oldArray) => [
            ...oldArray,
            command + " \nUruchamianie odtwarzacza...",
          ]);
        } else if (command.split(" ")[1] == "pause") {
          props.changePlay(false);
          setexecutedCmds((oldArray) => [
            ...oldArray,
            command + " \nZatrzymywanie odtwarzacza...",
          ]);
        } else if (command.split(" ")[1] == "toggle") {
          props.changePlay(!props.isPlaying);
          setexecutedCmds((oldArray) => [...oldArray, command]);
        } else if (command.split(" ")[1] == "song") {
          props.songTrack([command.split(" ")[2]]);
          setexecutedCmds((oldArray) => [
            ...oldArray,
            command +
              " \nOdtwarzam utwór '" +
              SONGLIST[command.split(" ")[2]].songName +
              "' w wykonaniu '" +
              SONGLIST[command.split(" ")[2]].songArtist +
              "'",
          ]);
        } else {
          setexecutedCmds((oldArray) => [
            ...oldArray,
            command +
              " \nERRNiepoprawny argument '" +
              command.split(" ")[1] +
              "' dla komendy '" +
              command.split(" ")[0] +
              "'",
          ]);
        }
      } else if (command.split(" ")[0] == "manipulate") {
        if (command.split(" ")[1] == "bg") {
          if (
            command.split(" ")[2] != undefined &&
            (command.split(" ")[2].includes("hsl") ||
              command.split(" ")[2].includes("rgb") ||
              command.split(" ")[2].includes("rgba") ||
              command.split(" ")[2].includes("#"))
          ) {
            document.documentElement.style.setProperty(
              "--hover-home-bg",
              command.split(" ")[2]
            );
            setexecutedCmds((oldArray) => [
              ...oldArray,
              command + " \nZmieniam kolor tła na " + command.split(" ")[2],
            ]);
          } else {
            setexecutedCmds((oldArray) => [
              ...oldArray,
              command +
                " \nERRNiepoprawny podargument '" +
                command.split(" ")[2] +
                "' dla komendy '" +
                command.split(" ")[0] +
                "' z argumentem '" +
                command.split(" ")[1] +
                "'",
            ]);
          }
        } else if (command.split(" ")[1] == "footer-height") {
          if (
            command.split(" ")[2] != undefined &&
            (command.split(" ")[2].includes("px") ||
              command.split(" ")[2].includes("%") ||
              command.split(" ")[2].includes("vw") ||
              command.split(" ")[2].includes("vh") ||
              command.split(" ")[2].includes("rem"))
          ) {
            document.documentElement.style.setProperty(
              "--footersize",
              command.split(" ")[2]
            );
            setexecutedCmds((oldArray) => [
              ...oldArray,
              command +
                " \nZmieniam wysokość odtwarzacza na " +
                command.split(" ")[2],
            ]);
          } else if (command.split(" ")[2] == "reset") {
            document.documentElement.style.setProperty("--footersize", "");
            setexecutedCmds((oldArray) => [
              ...oldArray,
              command + " \nResetuję wysokość odtwarzacza",
            ]);
          } else {
            setexecutedCmds((oldArray) => [
              ...oldArray,
              command +
                " \nERRNiepoprawny podargument '" +
                command.split(" ")[2] +
                "' dla komendy '" +
                command.split(" ")[0] +
                "' z argumentem '" +
                command.split(" ")[1] +
                "'",
            ]);
          }
        } else if (command.split(" ")[1] == "fade") {
          if (
            command.split(" ")[2] != undefined &&
            Number.isInteger(parseInt(command.split(" ")[2]))
          ) {
            setexecutedCmds((oldArray) => [
              ...oldArray,
              command +
                " \nWARNZmieniam długość przejścia między utworami na " +
                command.split(" ")[2] +
                "s",
            ]);
            localStorage.setItem("fadetime", parseInt(command.split(" ")[2]));
          } else {
            setexecutedCmds((oldArray) => [
              ...oldArray,
              command +
                " \nERRNiepoprawny podargument '" +
                command.split(" ")[2] +
                "' dla komendy '" +
                command.split(" ")[0] +
                "' z argumentem '" +
                command.split(" ")[1] +
                "'",
            ]);
          }
        } else {
          setexecutedCmds((oldArray) => [
            ...oldArray,
            command +
              " \nERRNiepoprawny argument '" +
              command.split(" ")[1] +
              "' dla komendy '" +
              command.split(" ")[0] +
              "'",
          ]);
        }
      } else if (command.split(" ")[0] == "clear") {
        if (command.split(" ")[1] == undefined) {
          setexecutedCmds([]);
        } else {
          setexecutedCmds((oldArray) => [
            ...oldArray,
            command +
              " \nERRKomenda '" +
              command.split(" ")[0] +
              "' nie przyjmuje argumentów",
          ]);
        }
      } else if (command.split(" ")[0] == "start") {
        if (command.split(" ")[1] == undefined) {
          setexecutedCmds(["Wpisz help aby zobaczyć listę dostępnych komend"]);
        } else {
          setexecutedCmds((oldArray) => [
            ...oldArray,
            command +
              " \nERRKomenda '" +
              command.split(" ")[0] +
              "' nie przyjmuje argumentów",
          ]);
        }
      } else if (command.split(" ")[0] == "calculate") {
        if (command.split(" ")[1] == "minus") {
          setexecutedCmds((oldArray) => [
            ...oldArray,
            command +
              " \n" +
              (parseInt(command.split(" ")[2]) -
                parseInt(command.split(" ")[3])),
          ]);
        } else if (command.split(" ")[1] == "plus") {
          setexecutedCmds((oldArray) => [
            ...oldArray,
            command +
              " \n" +
              (parseInt(command.split(" ")[2]) +
                parseInt(command.split(" ")[3])),
          ]);
        } else if (command.split(" ")[1] == "divide") {
          setexecutedCmds((oldArray) => [
            ...oldArray,
            command +
              " \n" +
              parseInt(command.split(" ")[2]) / parseInt(command.split(" ")[3]),
          ]);
        } else if (command.split(" ")[1] == "multiply") {
          setexecutedCmds((oldArray) => [
            ...oldArray,
            command +
              " \n" +
              parseInt(command.split(" ")[2]) * parseInt(command.split(" ")[3]),
          ]);
        } else {
          setexecutedCmds((oldArray) => [
            ...oldArray,
            command +
              " \nERRNiepoprawny argument '" +
              command.split(" ")[1] +
              "' dla komendy '" +
              command.split(" ")[0] +
              "'",
          ]);
        }
      } else if (
        command.split(" ")[0] == "keybinds" ||
        command.split(" ")[0] == "shortcuts"
      ) {
        if (command.split(" ")[1] == undefined) {
          setexecutedCmds((oldArray) => [...oldArray, command]);
          document.documentElement.style.setProperty("--keyguide", "block");
        } else {
          setexecutedCmds((oldArray) => [
            ...oldArray,
            command +
              " \nERRKomenda '" +
              command.split(" ")[0] +
              "' nie przyjmuje argumentów",
          ]);
        }
      } else if (command == "I don't even game") {
        caches.delete("duckmusic-offline-version-storage");
      } else if (command.split(" ")[0] == "sus") {
        if (command.split(" ")[1] == undefined) {
          setexecutedCmds((oldArray) => [
            ...oldArray,
            "\nIMGhttps://c.tenor.com/pt5CzNrQ6LIAAAAd/among-us-twerk.gif",
          ]);
        } else {
          setexecutedCmds((oldArray) => [
            ...oldArray,
            command +
              " \nERRKomenda '" +
              command.split(" ")[0] +
              "' nie przyjmuje argumentów",
          ]);
        }
      } else {
        setexecutedCmds((oldArray) => [
          ...oldArray,
          command + " \nERRNie znaleziono komendy '" + command + "'",
        ]);
      }
      setCommand("");
      forceUpdate();
      forceUpdate();
    }
  }
  useEffect(() => {
    const domNode = cmds.current;
    if (domNode) {
      domNode.scrollTop = domNode.scrollHeight;
    }
  });
  const [warning, setWarn] = useState(true);
  return (
    <Router>
      <div
        className={styles.layout}
        onClick={(e) => {
          if (localStorage.getItem("duckmusic.confetti") == "true") {
            var c = document.createElement("canvas");
            c.style.position = "fixed";
            c.style.top = `0px`;
            c.style.left = `0px`;
            c.style.width = `100%`;
            c.style.height = `100%`;
            c.style.pointerEvents = "none";
            c.style.zIndex = "999999";
            document.body.appendChild(c);
            var sas = Confetti.create(c, {
              resize: true,
            });

            sas({
              spread: Math.floor(Math.random() * (100 - 10) + 10),
              origin: {
                x: clamp(e.clientX, 0, size.width, 0, 1),
                y: clamp(e.clientY, 0, size.height, 0, 1),
              },
              particleCount: Math.floor(Math.random() * (200 - 10) + 10),
              startVelocity: Math.floor(Math.random() * (30 - 10) + 10),
              ticks: size.height,
            });
            setTimeout(() => {
              document.body.removeChild(c);
            }, size.height * 9.5);
          }
        }}
      >
        {localStorage.getItem("promowindowsdm") == "susamogus" ? (
          <div className={styles.windowspromote}>
            <div id={styles.promo1step}>
              <h1>Hej, hej, hej</h1>
              <h2>Korzystasz z systemu Windows 10 lub Windows 11?</h2>
              <div id={styles.selectbtns}>
                <button
                  className={styles.btnyes}
                  onClick={() => {
                    document.documentElement.style.setProperty(
                      "--promo",
                      "-100vw"
                    );
                  }}
                >
                  Tak
                </button>
                <button
                  className={styles.btnno}
                  onClick={() => {
                    document.documentElement.style.setProperty(
                      "--promo",
                      "-300vw"
                    );
                    {
                      localStorage.setItem("promowindowsdm", "showed");
                    }
                  }}
                >
                  Nie
                </button>
              </div>
            </div>
            <div id={styles.promo2step}>
              <h1>Świetnie!</h1>
              <h2>Możesz więc zainstalować nową aplikację Duck Music!</h2>
              <h3>Zalety to:</h3>
              <h4>Szybsze ładowanie</h4>
              <h4>Automatyczne aktualizacje</h4>
              <h4>Natywność</h4>
              <h2>Chcesz ją zainstalować?</h2>
              <div id={styles.selectbtns}>
                <button
                  className={styles.btnyes}
                  onClick={() => {
                    document.documentElement.style.setProperty(
                      "--promo",
                      "300vw"
                    );
                    {
                      localStorage.setItem("promowindowsdm", "showed");
                    }
                  }}
                >
                  Tak
                </button>
                <button
                  className={styles.btnno}
                  onClick={() => {
                    document.documentElement.style.setProperty(
                      "--promo",
                      "-200vw"
                    );
                  }}
                >
                  Nie
                </button>
              </div>
            </div>
            <div id={styles.promo2step}>
              <h1>OK</h1>
              <h2>Szanujemy Twoją decyzję</h2>
              <h3>
                Jeżeli zmienisz zdanie kliknij 'Zainstaluj nową wersję' w
                Ustawieniach Duck Music
              </h3>
              <div id={styles.selectbtns}>
                <button
                  className={styles.btnyes}
                  onClick={() => {
                    document.documentElement.style.setProperty(
                      "--promo",
                      "-100vw"
                    );
                  }}
                >
                  Wróć
                </button>
                <button
                  className={styles.btnno}
                  onClick={() => {
                    document.documentElement.style.setProperty(
                      "--promo",
                      "-300vw"
                    );
                    {
                      localStorage.setItem("promowindowsdm", "showed");
                    }
                  }}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
        {localStorage.getItem("emaildm") != null &&
        localStorage.getItem("dmtour") == "mogus" ? (
          <div className={styles.tour}>
            <h1>
              {"Cześć " +
                localStorage.getItem("name") +
                ", witaj na Duck Music!"}
            </h1>
            <h3>Czy chcesz nauczyć się jak korzystać z Duck Music?</h3>
            <div id={styles.selectbtns}>
              <button
                className={styles.btnyes}
                onClick={() => {
                  localStorage.setItem("dmtour", "showed");
                  {
                    setTourStep(1);
                  }
                }}
              >
                Tak
              </button>
              <button
                className={styles.btnno}
                onClick={() => {
                  localStorage.setItem("dmtour", "showed");
                  {
                    window.location.reload(true);
                  }
                }}
              >
                Nie, dziękuję
              </button>
            </div>
          </div>
        ) : (
          ""
        )}

        {tourStep == 1 ? (
          <div className={styles.tour}>
            <h1>{"Świetnie!"}</h1>
            <h3>Czy chcesz nauczyć się jak korzystać z Duck Music?</h3>
            <div id={styles.selectbtns}>
              <button
                className={styles.btnno}
                onClick={() => {
                  localStorage.setItem("dmtour", "showed");
                  {
                    window.location.reload(true);
                  }
                }}
              >
                Zamknij
              </button>
            </div>
          </div>
        ) : (
          ""
        )}
        <Switch className={styles.main}>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/debug/showoff/:data">
            <ShowOff />
          </Route>
          <Route exact path="/duckmusic::path">
            <SongPage />
          </Route>
          <Route exact path="/profile/:user/:path">
            <ShareCustomPlaylist />
          </Route>
          <Route exact path="/profile">
            <Profile />
          </Route>
          <Route exact path="/login1">
            <Login />
          </Route>
          <Route exact path="/rewind/:token/:path">
            <Rewind />
          </Route>
          <Route exact path="/logout">
            <Logout />
          </Route>
          <Route exact path="/myplaylist/:path">
            <PlaylistPageC />
          </Route>
          <Route exact path="/download/app">
            <Download_app />
          </Route>
          <Route
            exact
            path="/auth&email=:path&uid=:uid&pass=:pass/continue=:cnt"
          >
            <HandleAuth />
          </Route>
          <Route exact path="/library">
            <Library StartPlaylistCreation={StartPlaylistCreation} />
          </Route>
          <Route exact path="/lyrics">
            <Lyrics />
          </Route>
          <Route exact path="/artist/:path">
            <Artist />
          </Route>
          <Route exact path="/settings">
            <Settings />
          </Route>
          <Route exact path="/connect">
            <Connection />
          </Route>
          <Route
            exact
            path="/profile/user/currentuser/playlistdata/visual/queue"
          >
            <QueueShow />
          </Route>
          <Route exact path="/playlist/:path">
            <PlaylistPage />
          </Route>
          <Route exact path="/card/:path">
            <Card />
          </Route>
          <Route exact path="/embed/:path">
            <Embed />
          </Route>
          <Route exact path="/embed-small/:path">
            <EmbedSmall />
          </Route>
          <Route exact path="/search">
            <Search />
          </Route>
          <Route exact path="/liveevent/sylwester202122">
            <Sylwester2021 />
          </Route>
          <Route exact path="/info">
            <Info />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
      {show ? (
        <div
          className="menu"
          style={{
            top: anchorPoint.y,
            left: anchorPoint.x,
          }}
        >
          <div className="blur" />
          <Link to="/settings">
            <button className="menuitem">
              <Icons.Settings />
              Ustawienia
            </button>
          </Link>
          <Link to="/search">
            <button className="menuitem">
              <Icons.Search />
              Szukaj
            </button>
          </Link>
          <Link to="/info">
            <button className="menuitem">
              <Icons.Info />
              Informacje
            </button>
          </Link>
          <Link to="/profile">
            <button className="menuitem">
              <Icons.Profile />
              Profil
            </button>
          </Link>
          <br />
          <Link to="/logout">
            <button className="menuitem">
              <Icons.LogOut />
              Wyloguj się
            </button>
          </Link>
        </div>
      ) : (
        ""
      )}
      <Footer fre={footerRef} className={styles.foot} />
      {size.width > CONST.MOBILE_SIZE ? <Sidebar /> : <MobileNavigation />}
      <div className="keyguide">
        <div className="keys">
          <div className="key">
            <h3>Otwórz / zamknij to menu</h3>
            <div className="kes">
              <span>ctrl</span>
              <span>q</span>
            </div>
          </div>
          <div className="key">
            <h3>Odtwarzaj / zatrzymaj utwór</h3>
            <div className="kes">
              <span>ctrl</span>
              <span>spacja</span>
            </div>
          </div>
          <div className="key">
            <h3>Następny utwór</h3>
            <div className="kes">
              <span>ctrl</span>
              <span>m</span>
            </div>
          </div>
          <div className="key">
            <h3>Poprzedni utwór</h3>
            <div className="kes">
              <span>ctrl</span>
              <span>b</span>
            </div>
          </div>
        </div>
      </div>
      {localStorage.getItem("deviceiddm") != usd &&
      usd != "none" &&
      usd != null ? (
        <div className="playingoverlay">
          <h3>
            {"Odtwarzam "}
            <span>{utr}</span>
            {" na urządzeniu " + usd}
          </h3>
          <button
            onClick={() => {
              set(
                ref(
                  db1,
                  "userrequests/" +
                    localStorage.getItem("emaildm").split(".").join("")
                ),
                {
                  pause: JSON.stringify([usd, "true"]),
                }
              );
              set(
                ref(
                  db1,
                  "userdata/" +
                    localStorage.getItem("emaildm").split(".").join("") +
                    "/playing"
                ),
                {
                  track: null,
                  deviceid: null,
                }
              );
            }}
          >
            Zatrzymaj odtwarzanie
          </button>
        </div>
      ) : (
        ""
      )}
      {create ? (
        <div className="foverlay">
          <div className="ff">
            <input
              className="inputtrack"
              autocomplete="off"
              placeholder="Nazwa playlisty"
              maxLength="40"
              value={input}
              onInput={(e) => setInput(e.target.value)}
            ></input>
            <RgbStringColorPicker onChange={setColor} />
            <button
              className="lumina_button"
              onClick={() => {
                CreateEmptyPlaylist(color, input);
                {
                  setCreate(false);
                }
              }}
            >
              Utwórz playlistę
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
      {props.rewind == true ? <ViewRewind year={props.rewindyear} /> : ""}
      {props.konsola == true ? (
        <Draggable>
          <div className="console-lay">
            <div className="c-top">
              <h5>Konsola</h5>
              <svg
                onClick={() => {
                  props.konsol(false);
                }}
                width="20px"
                height="20px"
                viewBox="0 0 512 512"
                fill="#fff"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M480 480H32c-17.7 0-32-14.3-32-32s14.3-32 32-32h448c17.7 0 32 14.3 32 32s-14.3 32-32 32z" />
              </svg>
            </div>
            <div className="c-content" ref={cmds}>
              {executedCmds.map((item) => {
                if (item.includes("ERR")) {
                  return (
                    <h5 className="c-err">{"> " + item.replace("ERR", "")}</h5>
                  );
                } else if (item.includes("WARN")) {
                  return (
                    <h5 className="c-warn">
                      {"> " + item.replace("WARN", "")}
                    </h5>
                  );
                } else if (item.includes("IMG")) {
                  return (
                    <img className="c-img" src={item.replace("IMG", "")}></img>
                  );
                } else {
                  return <h5>{"> " + item}</h5>;
                }
              })}
            </div>
            <div className="c-grid">
              <h5>{">"}</h5>
              <input
                ref={inptcmd}
                className="c-input"
                placeholder="Wpisz komendę"
                value={command}
                onKeyUp={(e) => {
                  executeCmd(e);
                }}
                onChange={(e) => {
                  setCommand(e.target.value);
                }}
              ></input>
            </div>
          </div>
        </Draggable>
      ) : (
        ""
      )}
      {d.getMonth() + 1 == 2 && d.getDate() == 14
        ? hearts.map((item) => {
            return (
              <div
                className="heart"
                style={{ left: Math.floor(Math.random() * 100) + "vw" }}
              >
                <svg
                  className="heart"
                  version="1.1"
                  id="Capa_1"
                  xmlns="http://www.w3.org/2000/svg"
                  width="50px"
                  style={{ left: Math.floor(Math.random() * 100) + "vw" }}
                  fill={hcols[Math.floor(Math.random() * hcols.length)]}
                  height="50px"
                  viewBox="0 0 544.582 544.582"
                >
                  <path
                    d="M448.069,57.839c-72.675-23.562-150.781,15.759-175.721,87.898C247.41,73.522,169.303,34.277,96.628,57.839
		C23.111,81.784-16.975,160.885,6.894,234.708c22.95,70.38,235.773,258.876,263.006,258.876
		c27.234,0,244.801-188.267,267.751-258.876C561.595,160.732,521.509,81.631,448.069,57.839z"
                  />
                </svg>
              </div>
            );
          })
        : ""}
    </Router>
  );
}

const mapStateToProps = (state) => {
  return {
    trackData: state.trackData,
    custplay: state.custplay,
    isPlaying: state.isPlaying,
    konsola: state.konsola,
    rewindyear: state.rewindyear,
    rewind: state.rewind,
  };
};

export default connect(mapStateToProps, {
  firebaseg,
  changePlay,
  songTrack,
  konsol,
})(App);
