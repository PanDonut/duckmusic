﻿import React, { useState, useEffect, useCallback, useRef } from "react";
import { connect } from "react-redux";
import { changePlay, changeTrack } from "../../actions";
import TextBoldL from "../text/text-bold-l";
import TextRegularM from "../text/text-regular-m";
import Playgif from "../../image/now-play.gif";
import * as Icons from "../icons";
import "../../menup.css";
import { getDatabase, ref, onValue, set } from "firebase/database";
import { aut } from "../../dauth.js";
import SONGS from "../../data/songs.json";
import PLAYLISTS from "../../data/index.json";
import styles from "./playlist-track.module.css";
import { RgbStringColorPicker } from "react-colorful";
import { CreatePlaylist, AddToPlaylist } from "../../playlistcreator";
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

  console.log(
    props.data.sas.playlistData.filter(
      (ym) => ym.songindex == props.data.s.songindex
    )[0]
  );

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

  const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });
  console.log(anchorPoint);
  const positi = useRef(null);

  let col = "rgb(0,0,0)";
  const [color, setColor] = useState("rgb(0,0,0)");
  if (color != "rgb(0,0,0)") {
    document.documentElement.style.setProperty("--color", color);
  }
  return (
    <div className="TrackRel">
      <div
        onClick={() =>
          props.changeTrack([
            PLAYLISTS.indexOf(props.data.sas),
            props.data.sas.playlistData.indexOf(props.data.s),
          ])
        }
        ref={positi}
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
          onClick={() => props.changePlay(true)}
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
            {props.data.sas.playlistData.indexOf(
              props.data.sas.playlistData.filter(
                (ym) => ym.songindex == props.data.s.songindex
              )[0]
            ) + 1}
          </p>
        )}

        <span className={styles.txta}>
          <TextBoldL>{props.data.song.songName}</TextBoldL>
          <TextRegularM>{`${props.data.song.songArtist}`}</TextRegularM>
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
                width: "45px"
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
              setTimeout(setShow(true), 2000);
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
      {show ? (
        <>
        <div className="menup">
          <div className="blur" />
          <button
            className="menuitem"
            onClick={() => {
              StartPlaylistCreation(SONGS.indexOf(props.data.song));
              {
                setShow(false);
              }
            }}
          >
            <svg
              version="1.1"
              id="Layer_1"
              viewBox="0 0 455 455"
              width="1em"
              height="1em"
            >
              <polygon
                points="455,212.5 242.5,212.5 242.5,0 212.5,0 212.5,212.5 0,212.5 0,242.5 212.5,242.5 212.5,455 242.5,455 242.5,242.5 
	455,242.5 "
              />
            </svg>
            Nowa playlista
          </button>
          {PLAYLIST != null
            ? PLAYLIST.map((item) => {
                return (
                  <button
                    className="menuitem"
                    onClick={() => {
                      AddToPlaylist(
                        SONGS.indexOf(props.data.song),
                        PLAYLIST.indexOf(item),
                        item
                      );
                      {
                        setShow(false);
                      }
                    }}
                  >
                    {item.title}
                  </button>
                );
              })
            : ""}
          <button
            className="menuitem"
            onClick={() => {
              setShow(false);
            }}
          >
            <svg
              className="rot"
              version="1.1"
              id="Layer_1"
              viewBox="0 0 455 455"
              width="1em"
              height="1em"
            >
              <polygon
                points="455,212.5 242.5,212.5 242.5,0 212.5,0 212.5,212.5 0,212.5 0,242.5 212.5,242.5 212.5,455 242.5,455 242.5,242.5 
	455,242.5 "
              />
            </svg>
            Anuluj
          </button>
        </div>
        </>
      ) : (
        ""
      )}
      {create ? (
        <div className="foverlay">
          <div className="ff">
            <input
              className="PlInput SearchBox"
              autocomplete="off"
              placeholder="Nazwa playlisty"
              maxLength="40"
              value={input}
              onInput={(e) => setInput(e.target.value)}
            ></input>
            <button
              className="lumina_button"
              onClick={() => {
                CreatePlaylist(index, "#fff", input);
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
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isPlaying: state.isPlaying,
    trackData: state.trackData,
  };
};

export default connect(mapStateToProps, { changePlay, changeTrack })(
  PlaylistTrack
);
