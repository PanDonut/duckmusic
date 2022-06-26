import { connect } from "react-redux";
import * as Icons from "../icons";
import TextRegularM from "../text/text-regular-m";
import IconButton from "../buttons/icon-button";
import React, { useEffect, useRef, useState } from "react";
import { aut } from "../../dauth";
import { getDatabase, ref, onValue, set } from "firebase/database";
import { changeTrack, customTrack, songTrack } from "../../actions/index";
import styles from "./footer-left.module.css";
import { useHistory } from "react-router-dom";
import PLAYLIST from "../../data/index.json";
import Color from "color-thief-react";
import useWindowSize from "../../hooks/useWindowSize";
import { GetUID } from "../../pages/functions";

function FooterLeft(props, increaseIndex, decreaseIndex) {
  return (
    <div className={styles.footerLeft}>
      <ImgBox
        trackData={props.data}
        i={props.styleit}
        setShowFull={props.setShowFull}
      />
      <SongDetails trackData={props.data} i={props.styleit} />
    </div>
  );
}

function changeColor(color, amount) {
  // #FFF not supportet rather use #FFFFFF
  if (color) {
    const clamp = (val) => Math.min(Math.max(val, 0), 0xff);
    const fill = (str) => ("00" + str).slice(-2);

    const num = parseInt(color.substr(1), 16);
    const red = clamp((num >> 16) + amount);
    const green = clamp(((num >> 8) & 0x00ff) + amount);
    const blue = clamp((num & 0x0000ff) + amount);
    return (
      "#" +
      fill(red.toString(16)) +
      fill(green.toString(16)) +
      fill(blue.toString(16))
    );
  } else {
    return "#00000000";
  }
}

function ImgBox({ trackData, i, setShowFull }) {
  const img = useRef(null);
  return (
    <div>
      <Color
        src={trackData.trackImg}
        format="rgbString"
        quality={1}
        crossOrigin="anonymous"
      >
        {({ data, loading, error }) => {
          if (loading == false) {
            document.documentElement.style.setProperty("--song-hover", data);
          }
          console.log(error);
        }}
      </Color>
      <Color
        src={trackData.trackImg}
        format="hex"
        quality={1}
        crossOrigin="anonymous"
      >
        {({ data, loading, error }) => {
          if (loading == false) {
            document.documentElement.style.setProperty(
              "--song-a",
              changeColor(data, -20)
            );
          }
          console.log(error);
        }}
      </Color>
      <div className={`${styles.imgBox} ${i == true ? styles.um : ""}`}>
        <div
          className="full-it"
          onClick={() => {
            setShowFull(true);
          }}
        ></div>
        <img ref={img} src={trackData.trackImg}></img>
      </div>
      <div className={styles.imgBoxfull}>
        <img src={trackData.trackImg} alt=" " />
      </div>
    </div>
  );
}

function SongDetails(props, { trackData, i }, increaseIndex, decreaseIndex) {
  const sus = useRef(null);
  const zus = useRef(null);
  const size = useWindowSize();
  const history = useHistory();
  function checkOverflow(el) {
    var curOverflow = el.style.overflow;

    if (!curOverflow || curOverflow === "visible") el.style.overflow = "hidden";

    var isOverflowing =
      el.clientWidth < el.scrollWidth || el.clientHeight < el.scrollHeight;

    el.style.overflow = curOverflow;

    return isOverflowing;
  }
  var name = props.trackData.trackName;
  let isMounted = true;
  const [PLAYLISTC, setPosts] = useState(null);
  const db = getDatabase(aut);
  if (localStorage.getItem("emaildm") != null) {
    const nameRef = ref(db, "users/" + GetUID() + "/duckmusic/playlist");
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

  const [big, setBig] = useState(false);
  const [biga, setBiga] = useState(false);
  useEffect(() => {
    if (sus.current && zus.current) {
      document.documentElement.style.setProperty(
        "--size-title",
        sus.current.clientWidth + "px"
      );
      document.documentElement.style.setProperty(
        "--size-artist",
        zus.current.clientWidth + "px"
      );
      if (sus.current.clientWidth > size.width - 225) {
        setBig(true);
      } else {
        setBig(false);
      }
      if (zus.current.clientWidth > size.width - 225) {
        setBiga(true);
      } else {
        setBiga(false);
      }
    }
  });
  return (
    <div>
      <div className={styles.songDetails}>
        <p
          id="sas"
          className={`${styles.tit} ${big == true ? styles.go : ""} ${
            props.i == true ? styles.u : ""
          }`}
          ref={sus}
          onLoad={() => {
            if (sus.current) {
            }
          }}
        >
          {props.trackData.trackName}
        </p>
        <div
          ref={zus}
          className={`${styles.aaa} ${styles.tit2} ${
            biga == true ? styles.go : ""
          } ${props.i == true ? styles.ui : ""}`}
        >
          {props.trackData.trackArtist.split(",").map((item) => {
            return (
              <div
                className={styles.Artist1}
                onClick={() => {
                  {
                    document.documentElement.style.setProperty(
                      "--img-opacity",
                      "1"
                    );
                    {
                      history.push(
                        "/artist/" + item.toLowerCase().split(" ").join("-")
                      );
                    }
                  }
                }}
              >
                <TextRegularM>{item}</TextRegularM>
                {props.trackData.trackArtist.split(",").indexOf(item) <
                props.trackData.trackArtist.split(",").length - 1
                  ? ","
                  : ""}
                &nbsp;
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.songDetailsfull}>
        {props.trackData.trackArtist.split(",").map((item) => {
          return (
            <div
              className={styles.Artist1}
              onClick={() => {
                {
                  document.documentElement.style.setProperty(
                    "--img-opacity",
                    "1"
                  );
                  {
                    history.push(
                      "/artist/" + item.toLowerCase().split(" ").join("-")
                    );
                  }
                }
              }}
            >
              <TextRegularM>{item}&nbsp;</TextRegularM>
            </div>
          );
        })}
        <TextRegularM>{props.trackData.trackName}</TextRegularM>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    trackData: state.trackData,
  };
};

export default connect(mapStateToProps, {
  changeTrack,
  customTrack,
  songTrack,
})(FooterLeft);
