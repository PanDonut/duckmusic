import './settings.css';
import Topnav from '../component/topnav/topnav';
import lay from '../style/App.module.css';
import Sidebar from '../component/sidebar/sidebar';
import CONST from '../constants/index';
import useWindowSize from '../hooks/useWindowSize';
import MobileNavigation from '../component/sidebar/mobile-navigation';
import React, { useEffect, useState } from 'react';
import { setTheme, setEc, setSwi, setSwif, setOl, setAd } from '../theme';
import { decode } from 'he';
import axios from 'axios';

import FadeIn from 'react-fade-in';

function Settings() {


    const size = useWindowSize();
    const [ads, setAds] = useState(localStorage.getItem('duckads'));
    const [togClass, setTogClass] = useState('dark');
    const [blur1, setBlur] = useState('dark');
    const [toggle, setToggle] = useState(localStorage.getItem('explicit'));
    const [swipe, setSwipe] = useState(localStorage.getItem('swipenext'));
    const [old, setOld] = useState(localStorage.getItem('old'));
    const [swipefull, setSwipefull] = useState(localStorage.getItem('swipenextfull'));
    let theme = localStorage.getItem('theme');
    let ec = localStorage.getItem('explicit');

    useEffect(() => {
        if (localStorage.getItem('theme') === 'theme-dark') {
            setTogClass('dark');
            setBlur('false');
        } else if (localStorage.getItem('theme') === 'theme-light') {
            setTogClass('light');
            setBlur('false');
        } else if (localStorage.getItem('theme') === 'theme-blur') {
            setTogClass('dark');
            setBlur('true');
        }
    }, [theme])

    const handleOnClick = () => {
        if (localStorage.getItem('theme') === 'theme-dark') {
            setTheme('theme-light');
            setTogClass('light');
            setBlur('false');
        } else if (localStorage.getItem('theme') === 'theme-light') {
            setTheme('theme-dark');
            setTogClass('dark');
            setBlur('false');
        } else {
            setTheme('theme-light');
            setTogClass('light');
            setBlur('false');
        }
    }

    const handleOnClick5 = () => {
        setTogClass('dark');
        if (localStorage.getItem('theme') === 'theme-dark') {
            setTheme('theme-blur');
            setBlur('true');            
        } else if (localStorage.getItem('theme') === 'theme-light') {
            setTheme('theme-blur');
            setBlur('true');
        } else {
            setTheme('theme-dark');
            setBlur('false');
        }
    }

    const handleOnClick1 = () => {
        if (localStorage.getItem('explicit') === 'no') {
            setEc('yes');
            setToggle('true')
        } else {
            setEc('no');
            setToggle('false')
        }
    }

    const handleOnClick2 = () => {
        if (localStorage.getItem('swipenext') === 'no') {
            setSwi('yes');
            setSwipe('yes')
        } else {
            setSwi('no');
            setSwipe('no')
        }
    }
    const handleOnClick3 = () => {
        if (localStorage.getItem('swipenextfull') === 'no') {
            setSwif('yes');
            setSwipefull('yes')
        } else {
            setSwif('no');
            setSwipefull('no')
        }
    }
    const handleOnClick4 = () => {
        if (localStorage.getItem('old') === 'no') {
            setOl('yes');
            setOld('yes')
        } else {
            setOl('no');
            setOld('no')
        }
    }
    const handleOnClick9 = () => {
        if (localStorage.getItem('duckads') == 'false') {
            setAds(true);
            setAd(true)
        } else {
            setAds(false);
            setAd(false)
        }
    }
    const url1 = `/updates.json`
    const [suss, sSu] = useState(localStorage.getItem('deviceiddm'))
   const eastereggsongs = [
    [200, 200, 200, 200, 100, 100, 100, 100, 100, 300, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 500, 100, 100, 100, 100, 100, 100, 100, 300, 200, 200, 100, 100, 100, 100, 100, 100, 100, 900],
    [660, 60, 180, 60, 60, 180, 60, 180, 60, 180, 420, 60, 180, 60, 60, 180, 60, 180, 60, 180, 420, 60, 180, 60, 60, 180, 60, 180, 60, 180, 420, 60, 180, 60, 60, 180, 60, 180, 420, 60, 420, 60],
    [175, 25, 100, 300, 100, 300, 100, 100, 100, 300, 200, 600],
    [100, 200, 100, 200, 100, 200, 100, 200, 100, 100, 100, 100, 100, 200, 100, 200, 100, 200, 100, 200, 100, 100, 100, 100, 100, 200, 100, 200, 100, 200, 100, 200, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 50, 50, 100, 800],
    [75, 25, 75, 25, 75, 25, 75, 525, 75, 25, 75, 25, 75, 25, 75, 25, 75, 25, 75, 25, 75, 225, 75, 25, 75, 25, 75, 25, 75, 225, 75, 25, 75, 25, 75, 25, 75, 525, 75, 25, 75, 25, 75, 25, 75, 25, 75, 25, 75, 25, 75, 225, 75, 25, 75, 25, 75, 25, 75, 225],
    [600, 100, 175, 125, 100,125,100,100]
   ]

    const [cacheSize, setCacheSize] = useState(0);

    async function getCacheStoragesAssetTotalSize() {
        // Note: opaque (i.e. cross-domain, without CORS) responses in the cache will return a size of 0.
        const cacheNames = await caches.keys();
      
        let total = 0;
      
        const sizePromises = cacheNames.map(async cacheName => {
          const cache = await caches.open(cacheName);
          const keys = await cache.keys();
          let cacheSize = 0;
      
          await Promise.all(keys.map(async key => {
            const response = await cache.match(key);
            const blob = await response.blob();
            total += blob.size;
            cacheSize += blob.size;
          }));
      
          console.log(`Cache ${cacheName}: ${cacheSize} bytes | ${cacheSize / 1024} kb | ${(cacheSize / 1024) / 1024} mb`);
          setCacheSize((cacheSize / 1024) / 1024);
        });
      
        await Promise.all(sizePromises);
      
        return `Total Cache Storage: ${total} bytes`;
      }

      console.log(getCacheStoragesAssetTotalSize());
    const [val, setVal] = useState(localStorage.getItem('fadetime'));

    const [sss, ssss] = useState("Wczytywanie...")
    if (sss == "Wczytywanie...") {
        axios.get(url1)
                .then(res1 => {
					ssss(res1.data)
                })
				.catch(err => {
					console.log(err)
				}
				)
    }


    return (
        <div className={lay.layout}>
            {size.width > CONST.MOBILE_SIZE
                ? <Sidebar />
                : <MobileNavigation />
            }
            <div className="body">
                <Topnav back={true}/>
            <FadeIn visible="true" delay="50" className="marg">
                    <h2>Ustawienia</h2>
                    <FadeIn visible="true" delay="100" className="ust">
                        <h3>{decode("Wygl&#261;d")}</h3>
                <section>                 
                            <h4>Jasny motyw</h4>
                <div className="container--toggle">
                    {
                        togClass === "light" ?
                                <input type="checkbox" id="toggle" className="toggle--checkbox" onClick={handleOnClick} checked />                    
                            :
                                <input type="checkbox" id="toggle" className="toggle--checkbox" onClick={handleOnClick} />
                    }
                    <label htmlFor="toggle" className="toggle--label">
                        <span className="toggle--label-background"></span>
                    </label>
                </div>
                        </section>
                        {size.width < CONST.MOBILE_SIZE &&
                            <div>
                                <section>
                                    <h4>{decode("Nieprzezroczystość kafelków")}</h4>
                                    <div className="container--toggle">
                                        {
                                            old === "yes" ?
                                                <input type="checkbox" id="toggle" className="toggle--checkbox" onClick={handleOnClick4} checked />
                                                :
                                                <input type="checkbox" id="toggle" className="toggle--checkbox" onClick={handleOnClick4} />
                                        }
                                        <label htmlFor="toggle" className="toggle--label">
                                            <span className="toggle--label-background"></span>
                                        </label>
                                    </div>
                                </section>
                            </div>
                        }
                    </FadeIn>
                    <FadeIn visible="true" delay="100" className="ust">
                        <h3>{decode("Kontrola tre&#347;ci")}</h3>
                        <section>
                            <h4>Zezwalaj na odtwarzanie nieodpowiednich utworów</h4>
                            <div className="container--toggle">
                                {
                                    toggle === "yes" ?
                                        <input type="checkbox" id="toggle" className="toggle--checkbox" onClick={handleOnClick1} checked />
                                        :
                                        <input type="checkbox" id="toggle" className="toggle--checkbox" onClick={handleOnClick1} />
                                }
                                <label htmlFor="toggle" className="toggle--label">
                                    <span className="toggle--label-background"></span>
                                </label>
                            </div>
                        </section>
                    </FadeIn>
                    <FadeIn visible="true" delay="100" className="ust">
                        <h3>Odtwarzacz</h3>
                        <section>
                            <h4>Płynne przejście między utworami</h4>
                            <div className="container-pp">
                                <p>{val + "s"}</p>
                                <input type="range" id="rang" step="1" min="0" max="10" value={val} onChange={(e) => {setVal(e.target.value); localStorage.setItem('fadetime', e.target.value); console.log(val + " " + e.target.value)}}/>
                            </div>
                        </section>
                        <section>
                            <h4>Nazwa urządzenia</h4>
                            <div className="container-pt">
                                <input type="text" id="inpt" step="1" min="0" max="10" value={suss} onChange={(e) => {sSu(e.target.value); localStorage.setItem('deviceiddm', e.target.value)}}/>
                            </div>
                        </section>
                    </FadeIn>
                    <FadeIn visible="true" delay="100" className="ust-disabled">
                        <h3>{decode("U&#322;atwienia dost&#281;pu")}</h3>
                        {size.width < CONST.MOBILE_SIZE &&
                            <div>
                        <section>
                            <h4>{decode("Przesu&#324; aby przewin&#261;&#263;")}<span/></h4>
                            <div className="container--toggle-d">
                                {
                                    swipe === "yes" ?
                                        <input type="checkbox" id="toggle" className="toggle--checkbox" onClick={handleOnClick2} checked />
                                        :
                                        <input type="checkbox" id="toggle" className="toggle--checkbox" onClick={handleOnClick2} />
                                }
                                <label htmlFor="toggle" className="toggle--label">
                                    <span className="toggle--label-background"></span>
                                </label>
                            </div>
                        </section>
                        <section>
                            <h4>{decode("Przesu&#324; aby przewin&#261;&#263; (Pe&#322;ny ekran)")}<span /></h4>
                            <div className="container--toggle">
                                {
                                    swipefull === "yes" ?
                                        <input type="checkbox" id="toggle" className="toggle--checkbox" onClick={handleOnClick3} checked />
                                        :
                                        <input type="checkbox" id="toggle" className="toggle--checkbox" onClick={handleOnClick3} />
                                }
                                <label htmlFor="toggle" className="toggle--label">
                                    <span className="toggle--label-background"></span>
                                </label>
                            </div>
                        </section>
                            </div>
                        }
                    </FadeIn>
                    <FadeIn visible="true" delay="100" className="ust">
                        <h3>{'Dane offline (' + Math.round(cacheSize) + 'mb)'}</h3>
                        <section id='btnsec'>
                            <div className='datea'>
                            <h4>Usuwanie danych offline</h4>
                            <h5>Możesz usunąć dane offline jeżeli Duck Music nie aktualizuje się lub nie masz miejsca na urządzeniu</h5>
                            </div>
                            <button onClick={() => {caches.delete('duckmusic-offline-version-storage')}}>Usuń</button>
                        </section>
                    </FadeIn>
                    <FadeIn visible="true" delay="100" className="ust">
                        <h3>Debug</h3>
                        <section id='btnsec'>
                            <div className='datea'>
                            <h4>Update</h4>
                            <h5>{sss}</h5>
                            </div>
                        </section>
                    </FadeIn>
                </FadeIn>
                </div>
        </div>
        )
}

export default Settings;