import { useEffect } from "react";
import { useParams } from "react-router-dom";
import SONGS from "../data/songs.json";
import "./widget.css";

export default function SmallWidget() {
  const { path, autoplay, loop } = useParams();
  useEffect(() => {
    if (document.getElementById("wave")) {
      Array.from(document.getElementById("wave").children).forEach(
        (element, index) => {
          element.style.animationDelay = `calc(${index} * .15s)`;
        }
      );
    }
  }, [document.getElementById("wave")]);;
  return (
    <>
      {SONGS.map((item) => {
        if (
          item.songName.toLowerCase().split(" ").join("").split("?").join("") +
            item.songArtist
              .toLowerCase()
              .split(" ")
              .join("")
              .split("?")
              .join("") ==
          path
        ) {
          return (
            <div>
              <audio
                preload="auto"
                src={item.link}
                autoPlay={autoplay}
                loop={loop}
              />
              <div className="widget_base">
                <div id="widget_img">
                  <img id="songimg" src={item.songimg} />
                  <div id="imgplayoverlay">
                    <svg
                      id="wave"
                      data-name="Layer 1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 50 38.05"
                    >
                      <title>Audio Wave</title>
                      <path
                        id="1"
                        data-name="1"
                        d="M0.91,15L0.78,15A1,1,0,0,0,0,16v6a1,1,0,1,0,2,0s0,0,0,0V16a1,1,0,0,0-1-1H0.91Z"
                      />
                      <path
                        id="2"
                        data-name="2"
                        d="M6.91,9L6.78,9A1,1,0,0,0,6,10V28a1,1,0,1,0,2,0s0,0,0,0V10A1,1,0,0,0,7,9H6.91Z"
                      />
                      <path
                        id="3"
                        data-name="3"
                        d="M12.91,0L12.78,0A1,1,0,0,0,12,1V37a1,1,0,1,0,2,0s0,0,0,0V1a1,1,0,0,0-1-1H12.91Z"
                      />
                      <path
                        id="4"
                        data-name="4"
                        d="M18.91,10l-0.12,0A1,1,0,0,0,18,11V27a1,1,0,1,0,2,0s0,0,0,0V11a1,1,0,0,0-1-1H18.91Z"
                      />
                      <path
                        id="5"
                        data-name="5"
                        d="M24.91,15l-0.12,0A1,1,0,0,0,24,16v6a1,1,0,0,0,2,0s0,0,0,0V16a1,1,0,0,0-1-1H24.91Z"
                      />
                      <path
                        id="6"
                        data-name="6"
                        d="M30.91,10l-0.12,0A1,1,0,0,0,30,11V27a1,1,0,1,0,2,0s0,0,0,0V11a1,1,0,0,0-1-1H30.91Z"
                      />
                      <path
                        id="7"
                        data-name="7"
                        d="M36.91,0L36.78,0A1,1,0,0,0,36,1V37a1,1,0,1,0,2,0s0,0,0,0V1a1,1,0,0,0-1-1H36.91Z"
                      />
                      <path
                        id="8"
                        data-name="8"
                        d="M42.91,9L42.78,9A1,1,0,0,0,42,10V28a1,1,0,1,0,2,0s0,0,0,0V10a1,1,0,0,0-1-1H42.91Z"
                      />
                      <path
                        id="9"
                        data-name="9"
                        d="M48.91,15l-0.12,0A1,1,0,0,0,48,16v6a1,1,0,1,0,2,0s0,0,0,0V16a1,1,0,0,0-1-1H48.91Z"
                      />
                    </svg>
                  </div>
                </div>
                <span>
                  <p id="title">{item.songName}</p>
                  <p id="artist">
                    {item.ex == true ? (
                      <>
                        <span className="explicit">E </span>
                        <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                      </>
                    ) : (
                      ""
                    )}
                    {item.lyrics != undefined ? (
                      <>
                        <span
                          className="explicit"
                          style={{
                            width: "45vh",
                            marginLeft: item.ex == true ? "20px" : "auto",
                          }}
                        >
                          TEKST{" "}
                        </span>
                        <span>
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </span>
                      </>
                    ) : (
                      ""
                    )}
                    {`${item.songArtist}`}
                  </p>
                </span>
              </div>
            </div>
          );
        }
      })}
    </>
  );
}
