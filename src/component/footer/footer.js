import React, { useRef, useEffect, useState, useCallback } from "react";
import { connect } from "react-redux";
import { changeTrack, changePlay, customTrack, songTrack } from "../../actions";
import useWindowSize from "../../hooks/useWindowSize";
import FooterLeft from "./footer-left";
import createState from "../../hooks/createState";
import MusicControlBox from "./player/music-control-box";
import MusicControlBoxPh from "./player/music-control-box-ph";
import MusicControlBoxPhone from "./player/music-control-box-phone";
import MusicControlBoxs from "./player/music-control-box-small";
import MusicProgressBar from "./player/music-progress-bar";
import MusicProgressBarF from "./player/music-progress-bar-full";
import MusicProgressBarBot from "./player/music-progress-bar-bot";
import FooterRight from "./footer-right";
import Audio from "./audio";
import * as Icons from "../icons";
import { LYRICSNEW } from "../../data/lyrics";
import axios from "axios";
import database from "firebase/database";
import firebase from "../../firebase.js";
import Lyrics from "../Lyrics";
import SONGLIST from "../../data/songs.json";
import PLAYLIST from "../../data/index.json";
import CONST from "../../constants/index";
import styles from "./footer.module.css";
import "../lyrics/lyrics.modular.css";
import TextTransition, { presets } from "react-text-transition";
import convertTime from "../../functions/convertTime";
import { aut } from "../../dauth";
import { getDatabase, ref, onValue, set } from "firebase/database";
import div from "react-fade-in";
import AudioSpectrum from "react-audio-spectrum";
import { useReducer } from "react";
import {
  useMediaSession,
  HAS_MEDIA_SESSION,
} from "@mebtte/react-media-session";

function Footer(props) {
  async function showPictureInPictureWindow() {
    const canvas = document.createElement('canvas');
canvas.width = canvas.height = 512;

const video = document.createElement('video');
video.srcObject = canvas.captureStream();
video.muted = true;
    const image = new Image();
    image.crossOrigin = true;
    image.src = [...navigator.mediaSession.metadata.artwork].pop().src;
    await image.decode();
  
    canvas.getContext('2d').drawImage(image, 0, 0, 512, 512);
    await video.play();
    await video.requestPictureInPicture();
  }
  const [trackInfo, setTR] = useState({
    songid: "0",
    trackKey: [0, 0],
    track: ``,
    trackName: `Brak utworu`,
    trackImg: `https://i.scdn.co/image/ab67616d00001e02d3ee4bf67c2ac2154006ad72`,
    trackArtist: ` `,
    lyrics: [],
    canSkip: true,
    isCustom: false,
  });
  const [vau, SU] = useState(10);
  const size = useWindowSize();
  let isMounted = true;
  const [PLAYLISTC, setPosts] = useState(null);
  const db = getDatabase(aut);
  const db1 = getDatabase();
  if (localStorage.getItem("emaildm") != null) {
    const nameRef = ref(
      db,
      "users/" +
        localStorage.getItem("emaildm").split(".").join("") +
        "/duckmusic/playlist"
    );
    onValue(nameRef, (snapshot) => {
      const data = snapshot.val();
      if (data != null) {
        if (isMounted) {
          if (PLAYLISTC == null) {
            isMounted = false;
            setPosts(JSON.parse(data));
          }
        }
      }
    });
  }

  if (localStorage.getItem("fadetime") == null) {
    localStorage.setItem("fadetime", 0);
  }
  function decreaseIndex() {
    if (trackInfo.canSkip == "true") {
      if (trackInfo.isCustom == "false") {
        if (localStorage.getItem("shuffle") == "false") {
          if (
            trackInfo.trackKey[1] ===
            PLAYLIST[trackInfo.trackKey[0]].playlistData.length
          ) {
            props.changeTrack([trackInfo.trackKey[0], 0]);
          } else {
            props.changeTrack([
              trackInfo.trackKey[0],
              parseInt(trackInfo.trackKey[1]) - 1,
            ]);
          }
        } else if (localStorage.getItem("shuffle") == "true") {
          if (
            trackInfo.trackKey[1] ===
            PLAYLIST[trackInfo.trackKey[0]].playlistData.length
          ) {
            props.changeTrack([trackInfo.trackKey[0], 0]);
          } else {
            props.changeTrack([
              trackInfo.trackKey[0],
              parseInt(trackInfo.trackKey[1]) - 1,
            ]);
          }
        } else {
          localStorage.setItem("shuffle", "false");
        }
      } else if (trackInfo.isCustom == "true") {
        if (localStorage.getItem("shuffle") == "false") {
          if (
            trackInfo.trackKey[1] ===
            PLAYLISTC[trackInfo.trackKey[0]].playlistData.length
          ) {
            props.customTrack([trackInfo.trackKey[0], 0]);
          } else {
            props.customTrack([
              trackInfo.trackKey[0],
              parseInt(trackInfo.trackKey[1]) - 1,
            ]);
          }
        } else if (localStorage.getItem("shuffle") == "true") {
          if (
            trackInfo.trackKey[1] ===
            PLAYLISTC[trackInfo.trackKey[0]].playlistData.length
          ) {
            props.customTrack([trackInfo.trackKey[0], 0]);
          } else {
            props.customTrack([
              trackInfo.trackKey[0],
              parseInt(trackInfo.trackKey[1]) - 1,
            ]);
          }
        } else {
          localStorage.setItem("shuffle", "false");
        }
      }
    }
    SongData();
  }
  function increaseIndex() {
    if (trackInfo.canSkip == "true") {
      if (trackInfo.isCustom == "false") {
        if (localStorage.getItem("shuffle") == "false") {
          if (
            trackInfo.trackKey[1] ===
            PLAYLIST[trackInfo.trackKey[0]].playlistData.length
          ) {
            props.changeTrack([trackInfo.trackKey[0], 0]);
          } else {
            props.changeTrack([
              trackInfo.trackKey[0],
              parseInt(trackInfo.trackKey[1]) + 1,
            ]);
          }
        } else if (localStorage.getItem("shuffle") == "true") {
          if (
            trackInfo.trackKey[1] ===
            PLAYLIST[trackInfo.trackKey[0]].playlistData.length
          ) {
            props.changeTrack([trackInfo.trackKey[0], 0]);
          } else {
            props.changeTrack([
              trackInfo.trackKey[0],
              Math.floor(
                Math.random() *
                  parseInt(
                    PLAYLIST[trackInfo.trackKey[0]].playlistData.length
                  ) -
                  1
              ),
            ]);
          }
        } else {
          localStorage.setItem("shuffle", "false");
        }
      } else if (trackInfo.isCustom == "true") {
        if (localStorage.getItem("shuffle") == "false") {
          if (
            trackInfo.trackKey[1] ===
            PLAYLISTC[trackInfo.trackKey[0]].playlistData.length
          ) {
            props.customTrack([trackInfo.trackKey[0], 0]);
          } else {
            props.customTrack([
              trackInfo.trackKey[0],
              parseInt(trackInfo.trackKey[1]) + 1,
            ]);
          }
        } else if (localStorage.getItem("shuffle") == "true") {
          if (
            trackInfo.trackKey[1] ===
            PLAYLISTC[trackInfo.trackKey[0]].playlistData.length
          ) {
            props.customTrack([trackInfo.trackKey[0], 0]);
          } else {
            props.customTrack([
              trackInfo.trackKey[0],
              Math.floor(
                Math.random() *
                  parseInt(PLAYLISTC[trackInfo.trackKey[0]].playlistData.length)
              ) + 0,
            ]);
          }
        } else {
          localStorage.setItem("shuffle", "false");
        }
      }
    } else {
      if (trackInfo.isCustom == "false") {
        if (localStorage.getItem("shuffle") == "true") {
          props.songTrack([Math.floor(Math.random() * (SONGLIST.length - 1))]);
        }
      }
    }
    SongData();
  }

  function Expand() {
    document.documentElement.style.setProperty("--disp-ly", "block");
    document.documentElement.style.setProperty("--disp2", "none");
    document.documentElement.style.setProperty("--disp3", "flex");
  }

  function Hide() {
    document.documentElement.style.setProperty("--disp2", "flex");
    document.documentElement.style.setProperty("--disp3", "none");
    setTimeout(
      document.documentElement.style.setProperty("--disp-ly", "none"),
      500
    );
  }

  function Expand2() {
    document.documentElement.style.setProperty("--expanded", "translateY(0px)");
    document.documentElement.style.setProperty("--dispbt1", "none");
    document.documentElement.style.setProperty("--dispbt2", "block");
  }

  function Hide2() {
    document.documentElement.style.setProperty(
      "--expanded",
      "translateY(340px)"
    );
    document.documentElement.style.setProperty("--dispbt1", "block");
    document.documentElement.style.setProperty("--dispbt2", "none");
  }

  function Expand1() {
    if (size.width < CONST.MOBILE_SIZE) {
      document.documentElement.style.setProperty("--footersize", "100%");
      document.documentElement.style.setProperty("--botf", "0px");
      document.documentElement.style.setProperty("--mobile-radius", "0px");
      document.documentElement.style.setProperty("--dispbg", "block");
      document.documentElement.style.setProperty("--dispbt1", "block");
      document.documentElement.style.setProperty("--dispbt2", "none");
      document.documentElement.style.setProperty("--imgn", "none");
      document.documentElement.style.setProperty("--musicctr", "none");
      document.documentElement.style.setProperty("--lyrics", "flex");
      document.documentElement.style.setProperty("--phmu", "flex");
      document.documentElement.style.setProperty("--dipy", "flex");
      document.documentElement.style.setProperty(
        "--expanded",
        "translateY(200vh)"
      );
      document.documentElement.style.setProperty(
        "--imgpos",
        "translateX(calc(50vw - 50%))"
      );
      document.documentElement.style.setProperty("--footwidth", "100%");
      document.documentElement.style.setProperty("--txtdisplay", "block");
      document.documentElement.style.setProperty("--footopa", "0");
      document.documentElement.style.setProperty("--imgfull", "inline-flex");
      document.documentElement.style.setProperty(
        "--sus",
        "blur(4px) grayscale(20%) brightness(50%)"
      );
      document.documentElement.style.setProperty(
        "--bg-footer1",
        "url(" + trackInfo.trackImg + ")"
      );
    }
  }

  function Hide1() {
    document.documentElement.style.setProperty("--footersize", "62px");
    document.documentElement.style.setProperty(
      "--footwidth",
      "calc(100% - 20px)"
    );
    document.documentElement.style.setProperty("--botf", "55px");
    document.documentElement.style.setProperty("--dispbg", "none");
    document.documentElement.style.setProperty("--dispbt1", "none");
    document.documentElement.style.setProperty("--lyrics", "none;");
    document.documentElement.style.setProperty("--dispbt2", "none");
    document.documentElement.style.setProperty("--imgn", "block");
    document.documentElement.style.setProperty("--imgfull", "none");
    document.documentElement.style.setProperty("--musicctr", "flex");
    document.documentElement.style.setProperty("--phmu", "none");
    document.documentElement.style.setProperty("--mobile-radius", "20px");
    document.documentElement.style.setProperty("--dipy", "none");
    document.documentElement.style.setProperty("--txtdisplay", "none");
    document.documentElement.style.setProperty("--sus", "none");
    document.documentElement.style.setProperty("--footopa", "0.5");
    document.documentElement.style.setProperty(
      "--bg-footer1",
      "var(--card-background)"
    );
  }

  const [isOpen, setIsOpen] = React.useState("false");
  const audioRef = useRef(null);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  const handleTrackClick = (position) => {
    audioRef.current.currentTime = position;
  };

  useEffect(() => {
    if (props.isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [audioRef, props.isPlaying]);
  const au = useRef(null);

  if (localStorage.getItem("firecon") == null) {
    localStorage.setItem("firecon", false);
  }

  if (localStorage.getItem("loop") == "true") {
  } else if (localStorage.getItem("loop") == "false") {
  } else {
    localStorage.setItem("loop", "false");
  }

  useEffect(() => {
    audioRef.current.volume = volume;
  }, [audioRef, volume]);

  localStorage.getItem("explicit");
  if (
    (props.isPlaying &&
      trackInfo.trackName.includes("🅴") &&
      localStorage.getItem("explicit") == "no") ||
    (props.isPlaying &&
      trackInfo.trackName.includes("🅴") &&
      localStorage.getItem("explicit") == null)
  ) {
    audioRef.current.pause();
    document.documentElement.style.setProperty("--error-ex", "block");
    setTimeout(function () {
      document.documentElement.style.setProperty("--error-ex", "none");
      console.log("mogus");
    }, 10000);
  }

  const [songsPlayed, setNewSong] = useState(0);

  const [state, setState] = createState({
    currentTime: currentTime,
  });
  function EndSong() {
    if (localStorage.getItem("loop") == "true") {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    } else {
      increaseIndex();
    }
  }
  if (trackInfo.trackName != "Brak utworu") {
    document.head.children.namedItem("description").content =
      trackInfo.trackArtist;
    document.head.children.namedItem("author").content = trackInfo.trackArtist;
  } else {
    document.title = "Duck Music";
    document.head.children.namedItem("description").content = " ";
    document.head.children.namedItem("author").content = " ";
  }

  const [keyguide, setKeyGuide] = useState(false);

  document.onkeyup = function (e) {
    if (e.ctrlKey && e.keyCode == 32) {
      e.preventDefault();
      props.changePlay(!props.isPlaying);
    } else if (e.ctrlKey && e.keyCode == 66) {
      e.preventDefault();
      decreaseIndex();
    } else if (e.ctrlKey && e.keyCode == 77) {
      e.preventDefault();
      increaseIndex();
    } else if (e.ctrlKey && e.keyCode == 81) {
      e.preventDefault();
      if (keyguide == true) {
        document.documentElement.style.setProperty("--keyguide", "none");
      } else {
        document.documentElement.style.setProperty("--keyguide", "block");
      }
      setKeyGuide(!keyguide);
    }
  };

  document.onkeydown = function (e) {
    if (e.ctrlKey && e.keyCode == 32) {
      e.preventDefault();
    } else if (e.ctrlKey && e.keyCode == 66) {
      e.preventDefault();
    } else if (e.ctrlKey && e.keyCode == 77) {
      e.preventDefault();
    } else if (e.ctrlKey && e.keyCode == 81) {
      e.preventDefault();
    }
  };

  window.addEventListener(
    "load",
    useEffect(() => {
      if (localStorage.getItem("dmsavedata") != null) {
        if (JSON.parse(localStorage.getItem("dmsavedata"))[0].type == 0) {
          props.changeTrack(
            JSON.parse(localStorage.getItem("dmsavedata"))[0].data
          );
        } else if (
          JSON.parse(localStorage.getItem("dmsavedata"))[0].type == 1
        ) {
          props.songTrack(
            JSON.parse(localStorage.getItem("dmsavedata"))[0].data
          );
        } else if (
          JSON.parse(localStorage.getItem("dmsavedata"))[0].type == 2
        ) {
          props.customTrack(
            JSON.parse(localStorage.getItem("dmsavedata"))[0].data
          );
        }
        if (audioRef.current) {
          audioRef.current.currentTime = JSON.parse(
            localStorage.getItem("dmsavedata")
          )[0].time;
        }
        console.log(audioRef.current);
      }
      const url = `https://raw.githubusercontent.com/PanDonut/duckmusic/main/public/updates.json`;
      const url1 = `/updates.json`;
      axios
        .get(url)
        .then((res) => {
          axios
            .get(url1)
            .then((res1) => {
              if (res1.data < res.data) {
                window.location.reload(true);
              }
              console.log(res1.data);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
      if (localStorage.getItem("dmupdate") == null) {
        localStorage.setItem("dmupdate", 0);
      }
      if (
        localStorage.getItem("emaildm") == null &&
        window.location.pathname != "/logout"
      ) {
        document.location.href =
          "https://dauth.vercel.app/v2/auth/login&redirect=duckmusic.vercel.app/continue=" +
          window.location.pathname.split("/").join(">");
      }
    }, [])
  );

  if (trackInfo.isCustom == "false" && trackInfo.canSkip == "true") {
    localStorage.setItem(
      "dmsavedata",
      JSON.stringify([
        {
          type: 0,
          data: trackInfo.trackKey,
          time: currentTime,
        },
      ])
    );
  } else if (trackInfo.isCustom == "false" && trackInfo.canSkip == "false") {
    localStorage.setItem(
      "dmsavedata",
      JSON.stringify([
        {
          type: 1,
          data: trackInfo.trackKey,
          time: currentTime,
        },
      ])
    );
  }

  function SongData() {
    if ("mediaSession" in navigator) {
      var li = trackInfo.trackArtist.replaceAll(",", ", ").lastIndexOf(",");
      navigator.mediaSession.metadata = new window.MediaMetadata({
        title: trackInfo.trackName ? trackInfo.trackName : "Fetching...",
        artist:
          li != -1
            ? trackInfo.trackArtist.replaceAll(",", ", ").substring(0, li) +
              " i" +
              trackInfo.trackArtist.replaceAll(",", ", ").substring(li + 1)
            : trackInfo.trackArtist,
        album: trackInfo.album == undefined ? "" : trackInfo.album,
        artwork: [
          { src: trackInfo.trackImg, sizes: "96x96", type: "image/png" },
          { src: trackInfo.trackImg, sizes: "128x128", type: "image/png" },
          { src: trackInfo.trackImg, sizes: "192x192", type: "image/png" },
          { src: trackInfo.trackImg, sizes: "256x256", type: "image/png" },
          { src: trackInfo.trackImg, sizes: "384x384", type: "image/png" },
          { src: trackInfo.trackImg, sizes: "512x512", type: "image/png" },
        ],
      });

      navigator.mediaSession.setActionHandler("play", function () {
        audioRef.current.play();
        props.changePlay(true);
        SongData();
      });
      navigator.mediaSession.setActionHandler("pause", function () {
        audioRef.current.pause();
        props.changePlay(false);
        SongData();
      });
      navigator.mediaSession.setActionHandler("previoustrack", function () {
        decreaseIndex();
      });
      navigator.mediaSession.setActionHandler("nexttrack", function () {
        increaseIndex();
      });
      navigator.mediaSession.setActionHandler("seekto", function (e) {
        audioRef.current.currentTime = e;
      });
    }
  }

  const [fstyle, setFooterStyle] = useState({
    opacity: 0,
    transform: "translateY(130px) translateX(-50%)",
  });
  const [useStyle, setUsingStyle] = useState(false);

  useEffect(() => {
    if (size.width > CONST.MOBILE_SIZE) {
      setFooterStyle({ opacity: 1, transform: "" });
    }
  }, [Math.round(currentTime)]);
  useEffect(() => {
    if (size.width < CONST.MOBILE_SIZE) {
      setFooterStyle({
        opacity: 0,
        transform: "translateY(130px) translateX(-50%)",
      });
      audioVolumeOut(audioRef.current, () => {
      });
      setTimeout(() => {
        setTR(props.trackData);
      }, 700);
      setTimeout(() => {
        setFooterStyle({
          opacity: 1,
          transform: "translateY(0px) translateX(-50%)",
        });
      }, 1000);
      audioVolumeInTime(1500, audioRef.current, () => {
        console.log("IN");
      });
    } else {
      setUsingStyle(true);
      setTimeout(() => {
        setTR(props.trackData);
      }, 700);
      setTimeout(() => {
        setUsingStyle(false);
      }, 2000);
    }
  }, [props.trackData.trackKey[0], props.trackData.trackKey[1]]);

  useEffect(() => {
    console.log(props.isPlaying);
    if (props.isPlaying == true) {
      audioVolumeIn(audioRef.current, () => {
        console.log("played");
      });
    }
  }, [props.isPlaying]);

  function audioVolumeIn(q, callback) {
    if (q.volume) {
      var InT = 0;
      var setVolume = 1; // Target volume level for new song
      var speed = 0.1; // Rate of increase
      q.volume = InT;
      var eAudio = setInterval(function () {
        console.log(q.volume);
        InT += speed;
        q.volume = InT.toFixed(1);
        if (InT.toFixed(1) >= setVolume) {
          clearInterval(eAudio);
          callback();
          //alert('clearInterval eAudio'+ InT.toFixed(1));
        }
      }, 50);
    }
  }
  function audioVolumeInTime(time, q, callback) {
    if (q.volume) {
      var InT = 0;
      var setVolume = 1; // Target volume level for new song
      var speed = 0.1; // Rate of increase
      q.volume = InT;
      setTimeout(() => {
        var eAudio = setInterval(function () {
          console.log(q.volume);
          InT += speed;
          q.volume = InT.toFixed(1);
          if (InT.toFixed(1) >= setVolume) {
            clearInterval(eAudio);
            callback();
            //alert('clearInterval eAudio'+ InT.toFixed(1));
          }
        }, 50);
      }, time);
    }
  }

  function audioVolumeOut(q, callback) {
    if (q.volume) {
      var InT = 0.4;
      var setVolume = 0; // Target volume level for old song
      var speed = 0.1; // Rate of volume decrease
      q.volume = InT;
      var fAudio = setInterval(function () {
        if (q.paused == false) {
          InT -= speed;
          q.volume = InT.toFixed(1);
          if (InT.toFixed(1) <= setVolume) {
            clearInterval(fAudio);
            callback();
            //alert('clearInterval fAudio'+ InT.toFixed(1));
          }
        }
      }, 50);
    }
  }

  return (
    <footer className={styles.footer} style={fstyle}>
      <div className={styles.cantplay}>
        <h4>Duck Music nie może teraz tego odtworzyć</h4>
      </div>
      <div className={styles.cantplayex}>
        <h4>Odtwarzanie nieodpowiednich utworów jest wyłączone</h4>
      </div>
      {size.width > CONST.MOBILE_SIZE ? (
        <Lyrics
          currentTime={currentTime}
          song={trackInfo}
          songId={trackInfo.id}
          sly={trackInfo.lyrics}
        />
      ) : (
        ""
      )}

      <div
        className={`${styles.nowplayingbar} ${
          useStyle == true ? styles.loaded : ""
        }`}
      >
        <div
          onClick={() => {
            Expand1();
          }}
          className={styles.child1}
        >
          {size.width < CONST.MOBILE_SIZE && (
            <div className={styles.footerMid}>
              <MusicProgressBarBot
                currentTime={currentTime}
                duration={duration}
              />
            </div>
          )}
          <FooterLeft data={trackInfo} styleit={useStyle} />
        </div>

        {size.width > CONST.MOBILE_SIZE && (
          <div className={styles.footerMid}>
            <MusicControlBox />
            <MusicProgressBar
              currentTime={currentTime}
              duration={duration}
              handleTrackClick={handleTrackClick}
            />
          </div>
        )}
        {size.width < CONST.MOBILE_SIZE && (
          <div visible="true" delay="500" className={styles.footerMe}>
            <MusicProgressBarF
              currentTime={currentTime}
              duration={duration}
              handleTrackClick={handleTrackClick}
            />
            <MusicControlBoxPhone />
          </div>
        )}

        <FooterRight
          ctime={currentTime}
          volume={volume}
          setVolume={setVolume}
          opn={Expand}
          clo={Hide}
        ></FooterRight>
        <Audio
          ref={audioRef}
          handleDuration={setDuration}
          handleCurrentTime={setCurrentTime}
          trackData={trackInfo}
          isPlaying={props.isPlaying}
          handleEnd={EndSong}
          load={SongData}
          fadeIn={audioVolumeIn}
          fadeOut={audioVolumeOut}
        />
      </div>
      {size.width < CONST.MOBILE_SIZE ? (
        <Lyrics
          currentTime={currentTime}
          song={trackInfo}
          songId={trackInfo.id}
          sly={trackInfo.lyrics}
        />
      ) : (
        ""
      )}
    </footer>
  );
}

const mapStateToProps = (state) => {
  return {
    trackData: state.trackData,
    isPlaying: state.isPlaying,
  };
};

export default connect(mapStateToProps, {changeTrack, changePlay, customTrack, songTrack,})(Footer);
