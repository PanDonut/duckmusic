import React, { useState, useEffect, useCallback, useRef } from "react";
import { connect } from "react-redux";
import { changePlay, customTrack } from "../../actions";
import TextBoldL from "../text/text-bold-l";
import TextRegularM from "../text/text-regular-m";
import Playgif from "../../image/now-play.gif";
import * as Icons from "../icons";
import "../../menup.css";
import { getDatabase, ref, onValue, set } from "firebase/database";
import { aut } from "../../dauth.js";
import SONGS from "../../data/songs.json";
import styles from "./playlist-track.module.css";
import { RgbStringColorPicker } from "react-colorful";
import { RemoveSong } from "../../playlistcreator";
import { GetUID } from "../../pages/functions";

function PlaylistTrack(props) {
  const [thisSong, setthisSong] = useState(false);
  const [create, setCreate] = useState(false);
  const [index, setIndex] = useState("");
  function StartPlaylistCreation(index1) {
    setIndex(index1);
    setCreate(true);
  }
  const [input, setInput] = useState("");
  /*setInterval(function(){
        setthisSong(props.data.song.link == localStorage.getItem('playedSong'));
    }, 50);*/
  const [dots, setdots] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (
      props.data.song.link === props.trackData.track &&
      props.isPlaying === true
    ) {
      setthisSong(true);
    } else {
      setthisSong(false);
    }
  });

  console.log(props.data.ind);

  const [PLAYLIST, setPLAYLIST] = useState(null);
  const db = getDatabase(aut);
  const nameRef = ref(db, "users/" + GetUID() + "/duckmusic/playlist");
  onValue(nameRef, (snapshot) => {
    const data = snapshot.val();
    if (data != null) {
      if (PLAYLIST == null) {
        setPLAYLIST(JSON.parse(data));
      }
    }
  });

  let col = "rgb(0,0,0)";
  const [color, setColor] = useState("rgb(0,0,0)");
  if (color != "rgb(0,0,0)") {
    document.documentElement.style.setProperty("--color", color);
  }
  return (
    <div className="TrackRel">
      <div
        onClick={() =>
          props.customTrack([
            props.data.plind,
            props.data.sing.playlistData.indexOf(props.data.ind),
          ])
        }
        className={`${styles.trackDiv} ${thisSong ? "activeTrack" : ""}`}
        style={
          props.data.listType === "album1"
            ? { gridTemplateColumns: "16px 1fr 38px" }
            : {}
        }
      >
        <button
        tabIndex="-1"
          className={styles.playBtn}
          onClick={() => props.changePlay(!props.isPlaying)}
        >
          {thisSong ? <Icons.Pause /> : <Icons.Play />}
        </button>

        {thisSong ? (
          // <svg
          //   id={styles.eI4wjv0hVNk}
          //   xmlns="http://www.w3.org/2000/svg"
          //   viewBox="0 0 14 14"
          //   width="16px"
          //   height="16px"
          //   shape-rendering="geometricPrecision"
          //   text-rendering="geometricPrecision"
          // >
          //   <g
          //     id={styles.eI4wjv0hVNk2_ts}
          //     transform="translate(4.99902,14) scale(1,1)"
          //   >
          //     <path
          //       id={styles.eI4wjv0hVNk2}
          //       d="M3.99902,14L5.99902,14L5.99902,0L3.99902,0L3.99902,14ZM-0.000977,0"
          //       transform="translate(-4.99902,-7)"
          //       fill="var(--akcent)"
          //       stroke="none"
          //       stroke-width="1"
          //     />
          //   </g>
          //   <g
          //     id={styles.eI4wjv0hVNk3_ts}
          //     transform="translate(9.116667,14) scale(1,0.16)"
          //   >
          //     <path
          //       id={styles.eI4wjv0hVNk3}
          //       d="M3.99902,14L5.99902,14L5.99902,0L3.99902,0L3.99902,14ZM-0.000977,0"
          //       transform="translate(-4.99902,-7)"
          //       fill="var(--akcent)"
          //       stroke="none"
          //       stroke-width="1"
          //     />
          //   </g>
          //   <g
          //     id={styles.eI4wjv0hVNk4_ts}
          //     transform="translate(12,14) scale(1,2)"
          //   >
          //     <path
          //       id={styles.eI4wjv0hVNk4}
          //       d="M3.99902,14L5.99902,14L5.99902,0L3.99902,0L3.99902,14ZM-0.000977,0"
          //       transform="translate(-4.9990,-7)"
          //       fill="var(--akcent)"
          //       stroke="none"
          //       stroke-width="1"
          //     />
          //   </g>
          //   <g
          //     id={styles.eI4wjv0hVNk5_ts}
          //     transform="translate(1,14) scale(1,0.56)"
          //   >
          //     <path
          //       id={styles.eI4wjv0hVNk5}
          //       d="M3.99902,14L5.99902,14L5.99902,0L3.99902,0L3.99902,14ZM-0.000977,0"
          //       transform="translate(-4,-7)"
          //       fill="var(--akcent)"
          //       stroke="none"
          //       stroke-width="1"
          //     />
          //   </g>
          // </svg>
          <div className="circ">
            <svg
              className="circle"
              viewBox="0 0 100 100"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle style={{animation: document.documentElement.style.getPropertyValue("--percent") != "sas" || document.documentElement.style.getPropertyValue("--percent") != "Infinity" ? '' : 'alternate-reverse linear infinite 1s fl'}} cx="50" cy="50" r="35" />
            </svg>
          </div>
        ) : (
          <p className={styles.SongIndex}>
            {props.data.pld.indexOf(
              props.data.pld.filter(
                (ym) => ym.songindex == props.data.sngind
              )[0]
            ) + 1}
          </p>
        )}

        <span className={styles.txta}>
          <TextBoldL>{props.data.song.songName}</TextBoldL>
          <TextRegularM>
            {`${props.data.song.songArtist}`}
          </TextRegularM>
        </span>
        {props.data.song.ex == true && props.data.song.lyrics != undefined ? (
          <>
            <span className={styles.explicit}>E </span>
          </>
        ) : (
          <div />
        )}
        {props.data.song.lyrics != undefined ? (
          <>
            <span
              className={styles.explicit}
              style={{
                width: "45px",
              }}
            >
              TEKST{" "}
            </span>
          </>
        ) : props.data.song.ex == true &&
          props.data.song.lyrics == undefined ? (
          <>
            <span className={styles.explicit}>E </span>
          </>
        ) : (
          <div />
        )}
      </div>
      {navigator.onLine ? (
          <button
            className='dots'
            onClick={() => {
              RemoveSong(props.data.pla, props.data.sing.playlistData.indexOf(props.data.ind))
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-three-dots-vertical"
              viewBox="0 0 16 16"
            >
              <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"></path>
            </svg>
          </button>
        ) : (
          ""
        )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isPlaying: state.isPlaying,
    trackData: state.trackData,
  };
};

export default connect(mapStateToProps, { changePlay, customTrack })(PlaylistTrack);
