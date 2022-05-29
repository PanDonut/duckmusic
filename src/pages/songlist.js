import { useParams } from "react-router";
import { connect } from "react-redux";
import { changeTrack, songTrack } from "../actions";
import react from "react";
import Topnav from "../component/topnav/topnav";
import TextRegularM from "../component/text/text-regular-m";
import PlayButton from "../component/buttons/play-button";
import LinkButton from "../component/buttons/link-button";
import { Like } from "../component/icons";
import EmbedButton from "../component/buttons/embed-button";
import IconButton from "../component/buttons/icon-button";
import PlaylistDetails from "../component/playlist/playlist-details1";
import PlaylistTrack from "../component/playlist/playlist-track";
import AddButton from "../component/buttons/add-button";
import * as Icons from "../component/icons";
import PLAYLIST from "../data/index.json";
import { NavLink, useLocation, Link } from "react-router-dom";
import { decode } from "he";
import SONGLIST from "../data/songs.json";
import Footer from "../component/footer/footer";
import "./react-responsive-modal.css";
import styles from "./playlist.module.css";
import "./playlist.module.css";
import "../style/App.module.css";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import copy from "copy-to-clipboard";
import { AddToPlaylist } from "../playlistcreator";
import Sidebar from "../component/sidebar/sidebar";
import lay from "../style/App.module.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NotFound from "./404";
import { getDatabase, ref, onValue, set } from "firebase/database";
import { aut } from "../dauth";
import CONST from "../constants/index";
import useWindowSize from "../hooks/useWindowSize";
import MobileNavigation from "../component/sidebar/mobile-navigation";
import convertTime from "../functions/convertTimeTxt";
import div from "react-fade-in";
import { useReducer } from "react";
import { RemoveLiked } from "../playlistcreator";
import Color from "color-thief-react";
import axios from "axios";
import Confetti from "canvas-confetti";

const db = getDatabase(aut);
var nameRef1 = ref(db, "users/");
const clamp = (val, in_min, in_max, out_min, out_max) =>
  ((val - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;

function DraggableMobileGrid({ gridbuttons, listbuttons, topHook, setHook }) {
  const size = useWindowSize();
  return (
    <div className={styles._dui_wrapper_drag_mob_grid}>
      <div
        className={styles._dui_dragger_bg}
        style={{ opacity: (90 - topHook) / 100 }}
        onClick={() => {
          setHook(100);
        }}
      ></div>
      <div style={{ top: `${topHook}%` }} className={styles._dui_drag_mob_grid}>
        <div
          className={styles._dui_dragger}
          onTouchStart={(e) => {
            console.log(e);
          }}
          onTouchMove={(e) => {
            if (topHook > 0) {
              setHook(clamp(e.touches[0].clientY, 0, size.height, 0, 100));
            }
          }}
          onTouchEnd={() => {
            if (topHook <= 50) {
              setHook(5);
            } else if (topHook > 50 && topHook < 80) {
              setHook(35);
            } else {
              setHook(100);
            }
          }}
        >
          <div />
        </div>
        <div
          style={{
            gridAutoColumns:
              gridbuttons.length == 1
                ? `25vw`
                : `${100 / gridbuttons.length}vw`,
            height:
              gridbuttons.length == 1
                ? `25vw`
                : `${100 / gridbuttons.length}vw`,
          }}
          className={styles._dui_wrapper_dragger_mobile_grid_grid}
        >
          {gridbuttons != undefined
            ? gridbuttons.map((item) => {
                return (
                  <button key={item.text} onClick={item.action}>
                    {item.icon}
                    <p>{item.text}</p>
                  </button>
                );
              })
            : ""}
        </div>
        <div className={styles._dui_mgd}>
          {listbuttons != undefined
            ? listbuttons.map((item) => {
                return (
                  <button key={item.text} onClick={item.action}>
                    {item.text}
                  </button>
                );
              })
            : ""}
        </div>
      </div>
    </div>
  );
}

function PlaylistPage(props) {
  const [t, s] = useState(100);

  const [useControls, setUseControls] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setUseControls(true);
    }, 20000);
  }, []);
  var [likedSongs, setLikedSongs] = useState([]);
  useEffect(() => {
    if (localStorage.getItem("emaildm") != null) {
      nameRef1 = ref(
        db,
        "users/" +
          localStorage.getItem("emaildm").split(".").join("") +
          "/dmusic/liked"
      );
      onValue(nameRef1, (snapshot) => {
        const data = snapshot.val();
        if (data != null || data != undefined || likedSongs == []) {
          setLikedSongs(JSON.parse(data));
        }
      });
    }
  }, []);
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  const [PLAYLISTC, setPLAYLIST] = useState(null);

  const nameRef = ref(
    db,
    "users/" +
      localStorage.getItem("emaildm").split(".").join("") +
      "/duckmusic/playlist"
  );
  onValue(nameRef, (snapshot) => {
    const data = snapshot.val();
    if (PLAYLISTC == null) {
      if (PLAYLISTC != JSON.parse(data)) {
        setPLAYLIST(JSON.parse(data));
      }
    }
  });

  const handleScroll = (e) => {
    if (Math.round(e.target.scrollTop) > 227) {
      document.documentElement.style.setProperty(
        "--playbg",
        "linear-gradient(180deg, rgba(11,11,11,1) 0%, rgba(11,11,11,1) 37%, rgba(11,11,11,0.8018557764902836) 78%, rgba(11,11,11,0.5553571770505077) 89%, rgba(11,11,11,0) 100%)"
      );
    } else {
      document.documentElement.style.setProperty(
        "--playbg",
        "linear-gradient(180deg, rgba(0,0,0,0.47692580450148814) 0%, rgba(0,0,0,0.4) 37%, rgba(0,0,0,0.15) 78%, rgba(0,0,0,0.1) 89%, rgba(0,0,0,0) 100%)"
      );
    }
    forceUpdate();
  };

  const size = useWindowSize();
  const [playlistIndex, setPlaylistIndex] = useState(undefined);
  const [isthisplay, setIsthisPlay] = useState(false);
  const { path } = useParams();

  function changeBg(color) {
    document.documentElement.style.setProperty("--hover-home-bg", color);
  }

  useEffect(() => {
    setIsthisPlay(playlistIndex === props.trackData.trackKey[0]);
  });

  oncontextmenu = function (e) {
    e.preventDefault();
  };
  const notify = () =>
    toast.info("Skopiowano link!", {
      position: toast.POSITION.TOP_RIGHT,
    });
  const notifyembed = () =>
    toast.info("Skopiowano kod do umieszczenia na stronie!", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 5000,
    });

  const [sho, setSho] = useState(false);
  return (
    <>
      <div className={styles.PlaylistPage11} onScroll={handleScroll}>
        <ToastContainer
          position="bottom-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        {size.width < CONST.MOBILE_SIZE ? (
          <Topnav playlist={true} isSong={s} />
        ) : (
          <Topnav normal={true} />
        )}

        {SONGLIST.map((item) => {
          if (
            path ==
            item.songName
              .toLowerCase()
              .split(" ")
              .join("")
              .split("?")
              .join("") +
              item.songArtist
                .toLowerCase()
                .split(" ")
                .join("")
                .split("?")
                .join("")
          ) {
            return (
              <div key={item.songName}>
                <Color src={item.songimg} format="hex" crossOrigin="anonymous">
                  {({ data, loading, error }) => {
                    changeBg(data);
                    console.log(error);
                  }}
                </Color>
                {sho == true ? (
                  <div className={styles.selectoverlay}>
                    <div className={styles.flexselect}>
                      {PLAYLISTC == null || PLAYLISTC.lenght == 0 ? (
                        <div className={styles.listitem}>
                          <p>Nie masz żadnych playlist</p>
                        </div>
                      ) : (
                        ""
                      )}
                      {PLAYLISTC != null
                        ? PLAYLISTC.map((list) => {
                            return (
                              <div
                                className={styles.listitem}
                                onClick={() => {
                                  AddToPlaylist(
                                    SONGLIST.indexOf(item),
                                    PLAYLISTC.indexOf(list)
                                  );
                                  {
                                    setSho(false);
                                  }
                                }}
                              >
                                <p>{list.title}</p>
                              </div>
                            );
                          })
                        : ""}
                      <div
                        className={styles.listitem}
                        onClick={() => {
                          {
                            setSho(false);
                          }
                        }}
                      >
                        <p>Anuluj</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}

                <PlaylistDetails data={item} con={useControls} />
                <div className={styles.GridIcons}>
                  {size.width > CONST.MOBILE_SIZE && (
                    <div className={styles.PlaylistIcons}>
                      <button
                        onClick={() =>
                          props.songTrack([SONGLIST.indexOf(item), 0])
                        }
                      >
                        <PlayButton isthisplay={isthisplay} />
                      </button>
                    </div>
                  )}
                  {size.width < CONST.MOBILE_SIZE && (
                    <button
                      onClick={() =>
                        props.songTrack([SONGLIST.indexOf(item), 0])
                      }
                    >
                      Słuchaj
                    </button>
                  )}
                  {size.width > CONST.MOBILE_SIZE && navigator.onLine && (
                    <div className={styles.PlaylistIcons1}>
                      <button
                        onClick={() => {
                          setSho(true);
                        }}
                      >
                        <div className={styles.add}></div>
                      </button>
                      <button
                        onClick={() => {
                          forceUpdate();
                          if (!likedSongs.includes(SONGLIST.indexOf(item))) {
                            setLikedSongs((oldArray) => [
                              ...oldArray,
                              SONGLIST.indexOf(item),
                            ]);
                            console.log(likedSongs);
                            var dat = likedSongs;
                            dat.push(SONGLIST.indexOf(item));
                            set(
                              ref(
                                db,
                                "users/" +
                                  localStorage
                                    .getItem("emaildm")
                                    .split(".")
                                    .join("") +
                                  "/dmusic"
                              ),
                              {
                                liked: JSON.stringify(dat),
                              }
                            );
                            if (
                              localStorage.getItem("duckmusic.confetti") == 'true'
                            ) {
                              var sas = Confetti.create(
                                document.getElementsByTagName("canvas")[0],
                                {
                                  resize: true,
                                }
                              );
                              sas({
                                spread: 50,
                                origin: {
                                  x: 0.5,
                                  y: 0.75,
                                },
                                particleCount: 50,
                                startVelocity: 10,
                              });
                            }
                          } else {
                            RemoveLiked(
                              likedSongs.indexOf(SONGLIST.indexOf(item))
                            );
                            forceUpdate();
                          }
                        }}
                      >
                        <div
                          className={`${styles.love} ${
                            likedSongs.includes(SONGLIST.indexOf(item))
                              ? styles.isactive
                              : ""
                          }`}
                        >
                          <title>Lubię to!</title>
                          
                        </div>
                      </button>
                    </div>
                  )}
                  {size.width < CONST.MOBILE_SIZE &&
                    navigator.onLine &&
                    PLAYLISTC != null && (
                      <DraggableMobileGrid
                        topHook={t}
                        setHook={s}
                        listbuttons={PLAYLISTC.map((list) => {
                          return {
                            text: list.title,
                            action: () => {
                              AddToPlaylist(
                                SONGLIST.indexOf(item),
                                PLAYLISTC.indexOf(list)
                              );
                              s(100);
                            },
                          };
                        })}
                        gridbuttons={[
                          {
                            icon: (
                              <div
                                className={`${styles.love} ${styles.bigger} ${
                                  likedSongs.includes(SONGLIST.indexOf(item))
                                    ? styles.isactive
                                    : ""
                                }`}
                              >
                                <title>Lubię to!</title>
                              </div>
                            ),
                            text: " ",
                            action: () => {
                              if (
                                !likedSongs.includes(SONGLIST.indexOf(item))
                              ) {
                                setLikedSongs((oldArray) => [
                                  ...oldArray,
                                  SONGLIST.indexOf(item),
                                ]);
                                console.log(likedSongs);
                                var dat = likedSongs;
                                dat.push(SONGLIST.indexOf(item));
                                set(
                                  ref(
                                    db,
                                    "users/" +
                                      localStorage
                                        .getItem("emaildm")
                                        .split(".")
                                        .join("") +
                                      "/dmusic"
                                  ),
                                  {
                                    liked: JSON.stringify(dat),
                                  }
                                );
                              } else {
                                RemoveLiked(
                                  likedSongs.indexOf(SONGLIST.indexOf(item))
                                );
                                forceUpdate();
                              }
                            },
                          },
                        ]}
                      />
                    )}
                </div>
              </div>
            );
          }
        })}
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    trackData: state.trackData,
  };
};

export default connect(mapStateToProps, { songTrack })(PlaylistPage);
