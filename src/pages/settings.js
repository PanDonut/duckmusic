import "./settings.css";
import Topnav from "../component/topnav/topnav";
import lay from "../style/App.module.css";
import Sidebar from "../component/sidebar/sidebar";
import CONST from "../constants/index";
import useWindowSize from "../hooks/useWindowSize";
import MobileNavigation from "../component/sidebar/mobile-navigation";
import React, { useEffect, useReducer, useState } from "react";
import { setTheme, setEc, setSwi, setSwif, setOl, setAd } from "../theme";
import { decode } from "he";
import axios from "axios";
import { konsol } from "../actions";
import { connect } from "react-redux";

import div from "react-fade-in";

function Settings(props) {
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const size = useWindowSize();
  const [ads, setAds] = useState(localStorage.getItem("duckads"));
  const [togClass, setTogClass] = useState("dark");
  const [blur1, setBlur] = useState("dark");
  const [toggle, setToggle] = useState(localStorage.getItem("explicit"));
  const [conf, setConf] = useState(localStorage.getItem("duckmusic.confetti"));
  const [swipe, setSwipe] = useState(localStorage.getItem("swipenext"));
  const [old, setOld] = useState(localStorage.getItem("old"));
  const [swipefull, setSwipefull] = useState(
    localStorage.getItem("swipenextfull")
  );
  let theme = localStorage.getItem("theme");
  let ec = localStorage.getItem("explicit");

  useEffect(() => {
    if (localStorage.getItem("theme") === "theme-dark") {
      setTogClass("dark");
      setBlur("false");
    } else if (localStorage.getItem("theme") === "theme-light") {
      setTogClass("light");
      setBlur("false");
    } else if (localStorage.getItem("theme") === "theme-blur") {
      setTogClass("dark");
      setBlur("true");
    }
  }, [theme]);

  const handleOnClick = () => {
    if (localStorage.getItem("theme") === "theme-dark") {
      setTheme("theme-light");
      setTogClass("light");
      setBlur("false");
    } else if (localStorage.getItem("theme") === "theme-light") {
      setTheme("theme-dark");
      setTogClass("dark");
      setBlur("false");
    } else {
      setTheme("theme-light");
      setTogClass("light");
      setBlur("false");
    }
  };

  const handleOnClick5 = () => {
    setTogClass("dark");
    if (localStorage.getItem("theme") === "theme-dark") {
      setTheme("theme-blur");
      setBlur("true");
    } else if (localStorage.getItem("theme") === "theme-light") {
      setTheme("theme-blur");
      setBlur("true");
    } else {
      setTheme("theme-dark");
      setBlur("false");
    }
  };

  const handleOnClick1 = () => {
    if (localStorage.getItem("explicit") === "no") {
      setEc("yes");
      setToggle("true");
    } else if (localStorage.getItem("explicit") === "yes") {
      setEc("no");
      setToggle("false");
    } else {
      setEc("yes");
      setToggle("true");
    }
  };
  const handleOnClick69 = () => {
    if (localStorage.getItem("duckmusic.confetti") == "false") {
      setConf("true");
      localStorage.setItem("duckmusic.confetti", "true");
    } else if (localStorage.getItem("duckmusic.confetti") == "true") {
      setConf("false");
      localStorage.setItem("duckmusic.confetti", "false");
    } else {
      localStorage.setItem("duckmusic.confetti", "true");
    }
  };

  if (localStorage.getItem("duckmusic.confset") == null) {
    localStorage.setItem(
      "duckmusic.confset",
      JSON.stringify({
        mincount: 10,
        maxcount: 200,
        minspread: 10,
        maxspread: 100,
        minv: 10,
        maxv: 30,
      })
    );
  }

  const handleOnClick2 = () => {
    if (localStorage.getItem("swipenext") === "no") {
      setSwi("yes");
      setSwipe("yes");
    } else {
      setSwi("no");
      setSwipe("no");
    }
  };
  const handleOnClick3 = () => {
    if (localStorage.getItem("swipenextfull") === "no") {
      setSwif("yes");
      setSwipefull("yes");
    } else {
      setSwif("no");
      setSwipefull("no");
    }
  };
  const handleOnClick4 = () => {
    if (localStorage.getItem("old") === "no") {
      setOl("yes");
      setOld("yes");
    } else {
      setOl("no");
      setOld("no");
    }
  };
  const handleOnClick9 = () => {
    if (localStorage.getItem("duckads") == "false") {
      setAds(true);
      setAd(true);
    } else {
      setAds(false);
      setAd(false);
    }
  };
  const url1 = `/updates.json`;
  const [suss, sSu] = useState(localStorage.getItem("deviceiddm"));
  const eastereggsongs = [
    [
      200,
      200,
      200,
      200,
      100,
      100,
      100,
      100,
      100,
      300,
      100,
      100,
      100,
      100,
      100,
      100,
      100,
      100,
      100,
      100,
      100,
      100,
      100,
      500,
      100,
      100,
      100,
      100,
      100,
      100,
      100,
      300,
      200,
      200,
      100,
      100,
      100,
      100,
      100,
      100,
      100,
      900,
    ],
    [
      660,
      60,
      180,
      60,
      60,
      180,
      60,
      180,
      60,
      180,
      420,
      60,
      180,
      60,
      60,
      180,
      60,
      180,
      60,
      180,
      420,
      60,
      180,
      60,
      60,
      180,
      60,
      180,
      60,
      180,
      420,
      60,
      180,
      60,
      60,
      180,
      60,
      180,
      420,
      60,
      420,
      60,
    ],
    [175, 25, 100, 300, 100, 300, 100, 100, 100, 300, 200, 600],
    [
      100,
      200,
      100,
      200,
      100,
      200,
      100,
      200,
      100,
      100,
      100,
      100,
      100,
      200,
      100,
      200,
      100,
      200,
      100,
      200,
      100,
      100,
      100,
      100,
      100,
      200,
      100,
      200,
      100,
      200,
      100,
      200,
      100,
      100,
      100,
      100,
      100,
      100,
      100,
      100,
      100,
      100,
      50,
      50,
      100,
      800,
    ],
    [
      75,
      25,
      75,
      25,
      75,
      25,
      75,
      525,
      75,
      25,
      75,
      25,
      75,
      25,
      75,
      25,
      75,
      25,
      75,
      25,
      75,
      225,
      75,
      25,
      75,
      25,
      75,
      25,
      75,
      225,
      75,
      25,
      75,
      25,
      75,
      25,
      75,
      525,
      75,
      25,
      75,
      25,
      75,
      25,
      75,
      25,
      75,
      25,
      75,
      25,
      75,
      225,
      75,
      25,
      75,
      25,
      75,
      25,
      75,
      225,
    ],
    [600, 100, 175, 125, 100, 125, 100, 100],
  ];

  const [val, setVal] = useState(localStorage.getItem("fadetime"));

  const [sss, ssss] = useState("Wczytywanie...");
  if (sss == "Wczytywanie...") {
    axios
      .get(url1)
      .then((res1) => {
        ssss(res1.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <div className="body">
        <Topnav back={true} />
        <div visible="true" delay="50" className="marg">
          <h2>Ustawienia</h2>
          <div visible="true" delay="100" className="ust">
            <h3>{decode("Wygl&#261;d")}</h3>
            <section>
              <h4>Jasny motyw</h4>
              <div className="container--toggle">
                {localStorage.getItem("theme") === "light" ? (
                  <input
                    type="checkbox"
                    id="toggle"
                    className="toggle--checkbox"
                    onClick={handleOnClick}
                    checked
                  />
                ) : (
                  <input
                    type="checkbox"
                    id="toggle"
                    className="toggle--checkbox"
                    onClick={handleOnClick}
                  />
                )}
                <label htmlFor="toggle" className="toggle--label">
                  <span className="toggle--label-background"></span>
                </label>
              </div>
            </section>
            <section>
              <h4>Konfetti</h4>
              <div className="container--toggle">
                {localStorage.getItem("duckmusic.confetti") === "true" ? (
                  <input
                    type="checkbox"
                    id="toggle"
                    className="toggle--checkbox"
                    onClick={handleOnClick69}
                    checked
                  />
                ) : (
                  <input
                    type="checkbox"
                    id="toggle"
                    className="toggle--checkbox"
                    onClick={handleOnClick69}
                  />
                )}
                <label htmlFor="toggle" className="toggle--label">
                  <span className="toggle--label-background"></span>
                </label>
              </div>
            </section>
            {localStorage.getItem("duckmusic.confetti") == "true" ? (
              <>
                <section>
                  <h4>Minimalna ilość konfetti</h4>
                  <div className="container--toggle">
                    <div className="container-pt">
                      <input
                        type="number"
                        id="inpt"
                        step="1"
                        min="0"
                        max="10"
                        value={
                          JSON.parse(localStorage.getItem("duckmusic.confset"))
                            .mincount
                        }
                        onChange={(e) => {
                          var s = JSON.parse(
                            localStorage.getItem("duckmusic.confset")
                          );
                          if (e.target.value != "") {
                            if (e.target.value) s.mincount = e.target.value;
                            localStorage.setItem(
                              "duckmusic.confset",
                              JSON.stringify(s)
                            );
                            forceUpdate();
                          }
                          forceUpdate();
                        }}
                      />
                    </div>
                    <label htmlFor="toggle" className="toggle--label">
                      <span className="toggle--label-background"></span>
                    </label>
                  </div>
                </section>
              </>
            ) : (
              ""
            )}
            {size.width < CONST.MOBILE_SIZE && (
              <div>
                <section>
                  <h4>{decode("Nieprzezroczystość kafelków")}</h4>
                  <div className="container--toggle">
                    {old === "yes" ? (
                      <input
                        type="checkbox"
                        id="toggle"
                        className="toggle--checkbox"
                        onClick={handleOnClick4}
                        checked
                      />
                    ) : (
                      <input
                        type="checkbox"
                        id="toggle"
                        className="toggle--checkbox"
                        onClick={handleOnClick4}
                      />
                    )}
                    <label htmlFor="toggle" className="toggle--label">
                      <span className="toggle--label-background"></span>
                    </label>
                  </div>
                </section>
              </div>
            )}
          </div>
          <div visible="true" delay="100" className="ust">
            <h3>{decode("Kontrola tre&#347;ci")}</h3>
            <section>
              <h4>Zezwalaj na odtwarzanie nieodpowiednich utworów</h4>
              <div className="container--toggle">
                {localStorage.getItem("explicit") === "yes" ? (
                  <input
                    type="checkbox"
                    id="toggle"
                    className="toggle--checkbox"
                    onClick={handleOnClick1}
                    checked
                  />
                ) : (
                  <input
                    type="checkbox"
                    id="toggle"
                    className="toggle--checkbox"
                    onClick={handleOnClick1}
                  />
                )}
                <label htmlFor="toggle" className="toggle--label">
                  <span className="toggle--label-background"></span>
                </label>
              </div>
            </section>
          </div>
          <div visible="true" delay="100" className="ust">
            <h3>Odtwarzacz</h3>
            <section>
              <h4>Nazwa urządzenia</h4>
              <div className="container-pt">
                <input
                  type="text"
                  id="inpt"
                  step="1"
                  min="0"
                  max="10"
                  value={suss}
                  onChange={(e) => {
                    sSu(e.target.value);
                    localStorage.setItem("deviceiddm", e.target.value);
                  }}
                />
              </div>
            </section>
          </div>
          <div visible="true" delay="100" className="ust">
            <h3>Debug</h3>
            <section id="btnsec">
              <div className="datea">
                <h4>Konsola deweloperska</h4>
              </div>
              <button
                onClick={() => {
                  props.konsol(true);
                }}
              >
                Otwórz konsolę
              </button>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    trackData: state.trackData,
    custplay: state.custplay,
    isPlaying: state.isPlaying,
    konsola: state.konsola,
  };
};

export default connect(mapStateToProps, { konsol })(Settings);
