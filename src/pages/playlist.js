import { useParams } from "react-router";
import { connect } from "react-redux";
import { changeTrack, setQueue } from "../actions";
import react, { useReducer } from "react";
import Topnav from "../component/topnav/topnav";
import TextRegularM from "../component/text/text-regular-m";
import PlayButton from "../component/buttons/play-button";
import LinkButton from "../component/buttons/link-button";
import EmbedButton from "../component/buttons/embed-button";
import IconButton from "../component/buttons/icon-button";
import PlaylistDetails from "../component/playlist/playlist-details";
import PlaylistTrack from "../component/playlist/playlist-track";
import * as Icons from "../component/icons";
import PLAYLIST from "../data/index.json";
import { NavLink, useLocation, Link, useHistory } from "react-router-dom";
import { decode } from "he";
import SONGLIST from "../data/songs.json";
import Footer from "../component/footer/footer";
import "./react-responsive-modal.css";
import styles from "./playlist.module.css";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import copy from "copy-to-clipboard";

import Sidebar from "../component/sidebar/sidebar";
import lay from "../style/App.module.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NotFound from "./404";
import CONST from "../constants/index";
import useWindowSize from "../hooks/useWindowSize";
import MobileNavigation from "../component/sidebar/mobile-navigation";
import convertTime from "../functions/convertTimeTxt";
import div from "react-fade-in";

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
  const history = useHistory();
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = (e) => {
    if (Math.round(e.target.scrollTop) > 227) {
      document.documentElement.style.setProperty(
        "--playbg",
        "linear-gradient(180deg, rgba(11,11,11,1) 0%, rgba(11,11,11,1) 37%, rgba(11,11,11,0.8018557764902836) 78%, rgba(11,11,11,0.5553571770505077) 89%, rgba(11,11,11,0) 100%)"
      );
      document.documentElement.style.setProperty(
        "--bg-full",
        "var(--hover-home-bg)"
      );
    } else {
      document.documentElement.style.setProperty(
        "--playbg",
        "linear-gradient(180deg, rgba(0,0,0,0.47692580450148814) 0%, rgba(0,0,0,0.4) 37%, rgba(0,0,0,0.15) 78%, rgba(0,0,0,0.1) 89%, rgba(0,0,0,0) 100%)"
      );
    }
    e.target.scrollTop > 580 ? setScrolled(true) : setScrolled(false);
  };

  const size = useWindowSize();
  const [playlistIndex, setPlaylistIndex] = useState(undefined);
  const [isthisplay, setIsthisPlay] = useState(false);
  const { path } = useParams();

  function changeBg(color) {
    document.documentElement.style.setProperty("--hover-home-bg", color);
  }

  useEffect(() => {
    setIsthisPlay(playlistIndex + 1 === props.trackData.trackKey[0]);
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
  const [open, setOpen] = react.useState(false);
  var link11 = "https://duckmusic.vercel.app/embed/" + path;
  var embed11 =
    "<div id='embed-duckmusic-eFf56ch'>" +
    "\n <iframe class='embed-duckmusic-eFf56ch' src='" +
    "https://duckmusic.vercel.app/embed/" +
    path +
    "' frameBorder='0'></iframe>" +
    "\n <style>" +
    "\n .embed-duckmusic-eFf56ch {width: 100%;height: 100%;} #embed-duckmusic-eFf56ch {width: 400px;height: 600px;}" +
    "\n </style>" +
    "\n </div>";
  var embed111 =
    "<div id='embed-duckmusic-eFf56ch'>" +
    "\n <iframe class='embed-duckmusic-eFf56ch' src='" +
    "https://duckmusic.vercel.app/embed-small/" +
    path +
    "' frameBorder='0'></iframe>" +
    "\n <style>" +
    "\n .embed-duckmusic-eFf56ch {width: 100%;height: 100%;} #embed-duckmusic-eFf56ch {width: 400px;height: 600px;}" +
    "\n </style>" +
    "\n </div>";
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  var [recc1, setRecc1] = useState([]);
  var [recc2, setRecc2] = useState([]);
  var [recc3, setRecc3] = useState([]);
  useEffect(() => {
    setRecc1(PLAYLIST.filter(itm => itm.link != path)[Math.floor((Math.random()*PLAYLIST.filter(itm => itm.link != path).length))]);
    setRecc2(PLAYLIST.filter(itm => itm.link != path)[Math.floor((Math.random()*PLAYLIST.filter(itm => itm.link != path).length))]);
    setRecc3(PLAYLIST.filter(itm => itm.link != path)[Math.floor((Math.random()*PLAYLIST.filter(itm => itm.link != path).length))]);
    forceUpdate();
  }, [])
  return (
    <>
      <div className={styles.PlaylistPage} onScroll={handleScroll}>
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
        <div style={{backgroundImage: `url(${PLAYLIST.filter(item => item.link == path)[0].banner ? PLAYLIST.filter(item => item.link == path)[0].banner : PLAYLIST.filter(item => item.link == path)[0].imgUrl}`}} className={styles.imgBg}></div>
        <div className={styles.gradientBg}></div>
        <div className={styles.Bg}></div>
        {size.width < CONST.MOBILE_SIZE ? (
          ''
        ) : (
          <Topnav useScrolled={scrolled} normal={true} />
        )}

        {PLAYLIST.map((item) => {
          if (item.link == path) {
            return (
              <div
                key={item.title}
                onLoad={() => {
                  changeBg(item.playlistBg);
                  setPlaylistIndex(PLAYLIST.indexOf(item));
                }}
              >
                {size.width < CONST.MOBILE_SIZE && (
                  <div className={styles.overlay}>
                    <PlaylistDetails data={item} />
                    <div className={styles.ovlist}>
                      <Link to="/settings">
                        <button className={styles.btn}>
                          <svg
                            width="50px"
                            height="50px"
                            version="1.1"
                            id="Capa_1"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 489.8 489.8"
                          >
                            <path
                              d="M343.45,71.8c-14.4-8.2-29.7-14.6-45.7-19V36.5c0-20.1-16.4-36.5-36.5-36.5h-32.5c-20.1,0-36.5,16.4-36.5,36.5v16.3
			c-16,4.4-31.3,10.7-45.7,19l-11.6-11.5c-6.9-6.9-16.1-10.7-25.8-10.7s-18.9,3.8-25.8,10.7l-23,23c-6.9,6.9-10.7,16.1-10.7,25.8
			s3.8,18.9,10.7,25.8l11.5,11.5c-8.2,14.4-14.6,29.7-19,45.7h-16.3c-20.1,0-36.5,16.4-36.5,36.5v32.5c0,20.1,16.4,36.5,36.5,36.5
			h16.3c4.4,16,10.7,31.3,19,45.7l-11.5,11.6c-14.2,14.2-14.2,37.4,0,51.6l23,23c6.9,6.9,16.1,10.7,25.8,10.7s18.9-3.8,25.8-10.7
			l11.5-11.5c14.4,8.2,29.7,14.6,45.7,19v16.3c0,20.1,16.4,36.5,36.5,36.5h32.5c20.1,0,36.5-16.4,36.5-36.5V437
			c16-4.4,31.3-10.7,45.7-19l11.5,11.5c6.9,6.9,16.1,10.7,25.8,10.7s18.9-3.8,25.8-10.7l23-23c14.2-14.2,14.2-37.4,0-51.6
			l-11.5-11.5c8.2-14.4,14.6-29.7,19-45.7h16.3c20.1,0,36.5-16.4,36.5-36.5v-32.5c0-20.1-16.4-36.5-36.5-36.5h-16.3
			c-4.4-16-10.7-31.3-19-45.7l11.5-11.5c14.2-14.2,14.2-37.4,0-51.6l-23-23c-6.9-6.9-16.1-10.7-25.8-10.7s-18.9,3.8-25.8,10.7
			L343.45,71.8z M379.25,84.5c0.9-0.9,2.2-0.9,3.1,0l23,23c0.9,0.9,0.9,2.2,0,3.1l-21.1,21.1c-5.8,5.8-6.7,14.9-2.1,21.7
			c12.1,18,20.3,38,24.5,59.2c1.6,8,8.6,13.8,16.8,13.8h29.9c1.2,0,2.2,1,2.2,2.2v32.5c0,1.2-1,2.2-2.2,2.2h-29.9
			c-8.2,0-15.2,5.8-16.8,13.8c-4.2,21.3-12.5,41.2-24.5,59.2c-4.6,6.8-3.7,15.9,2.1,21.7l21.1,21.1c0.9,0.9,0.9,2.2,0,3.1l-23,23
			c-0.8,0.9-2.2,0.8-3.1,0l-21.1-21.1c-5.8-5.8-14.9-6.7-21.7-2.1c-18.1,12.1-38,20.3-59.2,24.5c-8,1.6-13.8,8.6-13.8,16.8v29.9
			c0,1.2-1,2.2-2.2,2.2h-32.5c-1.2,0-2.2-1-2.2-2.2v-29.9c0-8.2-5.8-15.2-13.8-16.8c-21.2-4.2-41.2-12.5-59.2-24.5
			c-2.9-1.9-6.2-2.9-9.5-2.9c-4.4,0-8.8,1.7-12.1,5l-21.1,21.1c-0.9,0.9-2.2,0.9-3.1,0l-23-23c-0.9-0.9-0.9-2.2,0-3.1l21.1-21.1
			c5.8-5.8,6.7-14.9,2.1-21.7c-12.1-18.1-20.3-38-24.5-59.2c-1.6-8-8.6-13.8-16.8-13.8h-30.1c-1.2,0-2.2-1-2.2-2.2v-32.5
			c0-1.2,1-2.2,2.2-2.2h29.9c8.2,0,15.2-5.8,16.8-13.8c4.2-21.2,12.5-41.2,24.5-59.2c4.5-6.8,3.7-15.9-2.1-21.7l-21.1-21.1
			c-0.4-0.4-0.6-0.9-0.6-1.6c0-0.6,0.2-1.1,0.6-1.5l23-23c0.9-0.9,2.2-0.9,3.1,0l21.1,21.1c5.8,5.8,14.9,6.7,21.7,2.1
			c18.1-12.1,38-20.3,59.2-24.5c8-1.6,13.8-8.6,13.8-16.8V36.5c0-1.2,1-2.2,2.2-2.2h32.5c1.2,0,2.2,1,2.2,2.2v29.9
			c0,8.2,5.8,15.2,13.8,16.8c21.2,4.2,41.2,12.5,59.2,24.5c6.8,4.5,15.9,3.7,21.7-2.1L379.25,84.5z"
                            />
                            <path
                              d="M244.95,145.3c-54.9,0-99.6,44.7-99.6,99.6s44.7,99.6,99.6,99.6s99.6-44.7,99.6-99.6S299.85,145.3,244.95,145.3z
			 M244.95,310.2c-36,0-65.3-29.3-65.3-65.3s29.3-65.3,65.3-65.3s65.3,29.3,65.3,65.3S280.95,310.2,244.95,310.2z"
                            />
                          </svg>
                          <h2>Ustawienia</h2>
                        </button>
                      </Link>
                      <button
                        className={styles.btn}
                        onClick={() => {
                          copy(link11);
                          {
                            notify();
                          }
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="50px"
                          width="50px"
                          viewBox="0 -22 612 511"
                          className="embed_svg__Svg-ulyrgf-0 embed_svg__hJgLcF"
                        >
                          <path d="m453.332031 85.332031c0 38.292969-31.039062 69.335938-69.332031 69.335938s-69.332031-31.042969-69.332031-69.335938c0-38.289062 31.039062-69.332031 69.332031-69.332031s69.332031 31.042969 69.332031 69.332031zm0 0" />
                          <path d="m384 170.667969c-47.0625 0-85.332031-38.273438-85.332031-85.335938 0-47.058593 38.269531-85.332031 85.332031-85.332031s85.332031 38.273438 85.332031 85.332031c0 47.0625-38.269531 85.335938-85.332031 85.335938zm0-138.667969c-29.417969 0-53.332031 23.9375-53.332031 53.332031 0 29.398438 23.914062 53.335938 53.332031 53.335938s53.332031-23.9375 53.332031-53.335938c0-29.394531-23.914062-53.332031-53.332031-53.332031zm0 0" />
                          <path d="m453.332031 426.667969c0 38.289062-31.039062 69.332031-69.332031 69.332031s-69.332031-31.042969-69.332031-69.332031c0-38.292969 31.039062-69.335938 69.332031-69.335938s69.332031 31.042969 69.332031 69.335938zm0 0" />
                          <path d="m384 512c-47.0625 0-85.332031-38.273438-85.332031-85.332031 0-47.0625 38.269531-85.335938 85.332031-85.335938s85.332031 38.273438 85.332031 85.335938c0 47.058593-38.269531 85.332031-85.332031 85.332031zm0-138.667969c-29.417969 0-53.332031 23.9375-53.332031 53.335938 0 29.394531 23.914062 53.332031 53.332031 53.332031s53.332031-23.9375 53.332031-53.332031c0-29.398438-23.914062-53.335938-53.332031-53.335938zm0 0" />
                          <path d="m154.667969 256c0 38.292969-31.042969 69.332031-69.335938 69.332031-38.289062 0-69.332031-31.039062-69.332031-69.332031s31.042969-69.332031 69.332031-69.332031c38.292969 0 69.335938 31.039062 69.335938 69.332031zm0 0" />
                          <path d="m85.332031 341.332031c-47.058593 0-85.332031-38.269531-85.332031-85.332031s38.273438-85.332031 85.332031-85.332031c47.0625 0 85.335938 38.269531 85.335938 85.332031s-38.273438 85.332031-85.335938 85.332031zm0-138.664062c-29.417969 0-53.332031 23.933593-53.332031 53.332031s23.914062 53.332031 53.332031 53.332031c29.421875 0 53.335938-23.933593 53.335938-53.332031s-23.914063-53.332031-53.335938-53.332031zm0 0" />
                          <path d="m135.703125 245.761719c-7.425781 0-14.636719-3.863281-18.5625-10.773438-5.824219-10.21875-2.238281-23.253906 7.980469-29.101562l197.949218-112.851563c10.21875-5.867187 23.253907-2.28125 29.101563 7.976563 5.824219 10.21875 2.238281 23.253906-7.980469 29.101562l-197.953125 112.851563c-3.328125 1.898437-6.953125 2.796875-10.535156 2.796875zm0 0" />
                          <path d="m333.632812 421.761719c-3.585937 0-7.210937-.898438-10.539062-2.796875l-197.953125-112.851563c-10.21875-5.824219-13.800781-18.859375-7.976563-29.101562 5.800782-10.238281 18.855469-13.84375 29.097657-7.976563l197.953125 112.851563c10.21875 5.824219 13.800781 18.859375 7.976562 29.101562-3.945312 6.910157-11.15625 10.773438-18.558594 10.773438zm0 0" />
                        </svg>
                        <h2>Udostępnij</h2>
                      </button>
                    </div>
                  </div>
                )}

                <PlaylistDetails data={item} />
                <div className={styles.GridIcons}>
                  {size.width > CONST.MOBILE_SIZE && (
                      <button
                      className="mogus"
                        onClick={() => {
                          var queue = [];
                          item.playlistData.forEach(element => {
                            queue.push(SONGLIST[element.songindex])
                          });
                          props.setQueue(
                            {
                              name: item.title,
                              data: queue
                            }
                          );
                          props.changeTrack([PLAYLIST.indexOf(item) + 1, 0]);
                          forceUpdate();
                        }
                        }
                      >
                        <PlayButton isthisplay={isthisplay} cstm="true" />
                        {`${props.queue.name == item.title ? "ZATRZYMAJ" : "SŁUCHAJ"}`}
                      </button>
                  )}
                  {size.width < CONST.MOBILE_SIZE && (
                    <button
                      onClick={() => {
                          var queue = [];
                          item.playlistData.forEach(element => {
                            queue.push(SONGLIST[element.songindex])
                          });
                          props.setQueue(
                            {
                              name: item.title,
                              data: queue
                            }
                          );
                          props.changeTrack([PLAYLIST.indexOf(item) + 1, 0]);
                          forceUpdate();
                        }
                      }
                    >
                      Słuchaj
                    </button>
                  )}
                </div>

                <div className={styles.ListHead}>
                  <TextRegularM></TextRegularM>
                  <TextRegularM>UTWORY</TextRegularM>
                </div>

                <div visible="true" delay="50" className={styles.PlaylistSongs}>
                  {item.playlistData.map((song) => {
                    return (
                        <PlaylistTrack
                          data={{
                            listType: item.type,
                            sas: item,
                            sin: song.index,
                            song: SONGLIST[song.songindex],
                            s: song
                          }}
                        />
                    );
                  })}
                </div>
                { size.width > CONST.MOBILE_SIZE ?
                <div className="Related" style={{position: scrolled == true ? 'fixed' : 'absolute', top: scrolled == true ? '-490px' : '90px'}}>
                  <div className="Albums">
                    <div onClick={() => {history.push(`/${recc1.type ? 'album' : 'playlist'}/${recc1.link}`)}} className="Album r1">
                      <img src={recc1 != undefined ? recc1.imgUrl : ''} />
                      <h2>{`POLECAN${recc1.type == "album" ? "Y ALBUM" : "A PLAYLISTA"}`}</h2>
                      <h3>{recc1.artist}</h3>
                      <h1>{recc1.title}</h1>
                    </div>
                    <div onClick={() => {history.push(`/${recc2.type ? 'album' : 'playlist'}/${recc2.link}`)}} className="Album r2">
                      <img src={recc2 != undefined ? recc2.imgUrl : ''} />
                      <h2>{`POLECAN${recc2.type == "album" ? "Y ALBUM" : "A PLAYLISTA"}`}</h2>
                      <h3>{recc2.artist}</h3>
                      <h1>{recc2.title}</h1>
                    </div>
                    <div onClick={() => {history.push(`/${recc3.type ? 'album' : 'playlist'}/${recc3.link}`)}} className="Album r3">
                      <img src={recc3 != undefined ? recc3.imgUrl : ''} />
                      <h2>{`POLECAN${recc3.type == "album" ? "Y ALBUM" : "A PLAYLISTA"}`}</h2>
                      <h3>{recc3.artist}</h3>
                      <h1>{recc3.title}</h1>
                    </div>
                  </div>
                </div>
                :
                ''
                }
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
    isPlaying: state.isPlaying,
    queue: state.queue
  };
};

export default connect(mapStateToProps, { changeTrack, setQueue })(PlaylistPage);
