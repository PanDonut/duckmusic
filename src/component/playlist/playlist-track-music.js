import React, { useState, useEffect, useCallback, useRef } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { changePlay } from "../../actions";
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
import { CreatePlaylist, AddToPlaylist } from "../../playlistcreator";
import { GetUID } from "../../pages/functions";

function PlaylistTrack(props) {
  const history = useHistory();
  const link =
    "duckmusic:" +
    props.data.song.songName
      .toLowerCase()
      .split(" ")
      .join("")
      .split("?")
      .join("") +
    props.data.song.songArtist
      .toLowerCase()
      .split(" ")
      .join("")
      .split("?")
      .join("");
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
    <div>
      <div
        ref={positi}
        className={`${styles.trackDiv} ${thisSong ? "activeTrack" : ""}`}
        style={
          props.data.listType != "album1"
            ? { gridTemplateColumns: "36px 1fr 38px" }
            : {}
        }
      >
        <button className={styles.playBtn}></button>

        {props.data.listType === "album1" ? (
          ""
        ) : (
          <img src={props.data.song.songimg} />
        )}

        <span className={styles.txta}>
          <TextBoldL>{props.data.song.songName}</TextBoldL>
          <TextRegularM>
            {props.data.song.ex == true ? (
              <>
                <span className={styles.explicit}>E </span>
                <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
              </>
            ) : (
              ""
            )}
            {props.data.song.lyrics != undefined ? (
              <>
                <span
                  className={styles.explicit}
                  style={{
                    width: "45px",
                    marginLeft: props.data.song.ex == true ? "20px" : "auto",
                  }}
                >
                  TEKST{" "}
                </span>
                <span>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </span>
              </>
            ) : (
              ""
            )}
            {`${props.data.song.songArtist}`}
          </TextRegularM>
        </span>
      </div>
      {show ? (
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
                CreatePlaylist(index, color, input);
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

export default connect(mapStateToProps, { changePlay })(PlaylistTrack);
