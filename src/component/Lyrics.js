import React, { useEffect, useState } from 'react'
import axios from 'axios'
import createState from '../hooks/createState';
import {useDispatch } from 'react-redux'
import actions from '../store/actionTypes'
import { ExternalLink } from 'react-feather'
import { Link } from 'react-router-dom'
import './lyrics/lyrics.modular.css';
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import useWindowSize from '../hooks/useWindowSize';

function Lyrics({ song, currentTime, songId, sly }) {
    const size = useWindowSize();
    const handle = useFullScreenHandle();
    const [translate, setIsTranslated] = useState(false);
    const [fullscreen, setIsFullscreen] = useState(false);
    const dispatch = useDispatch();
    const [topsc, setTop] = useState(0);
    const [cu, setCu] = useState([]);
    const [ly, setLy] = useState(null);

    function Enter() {
        setIsFullscreen(true);
        document.documentElement.style.setProperty('--ly-height', '100%');        
        handle.enter();
    }

    function Exit() {
        setIsFullscreen(false);
        document.documentElement.style.setProperty('--ly-height', 'calc(100vh - 94px)');
        handle.exit()
    }

    let lyrics = song.lyrics

        const [state, setState] = createState({
            lyrics: [{
                "start": 0,
                "end": 22.451456,
                "lyrics": "Brak utworu. Odtwórz coś żeby widzieć słowa"
            }, {
                "start": 23,
                "end": 1000000000,
                "lyrics": "Brak utworu. Odtwórz coś żeby widzieć słowa"
            }],
            currentLine: 0,
            loading: true,
            error: false
        })

    
    const [ses, setSes] = useState(true);

    console.log(currentTime);

    useEffect(() => {
        if(lyrics.length < 1){
            const url = `/lyrics/${song.trackName.split(" ").map(piece => piece.toLowerCase()).join("-")}.json`
            axios.get(url)
                .then(res => {
                    lyrics = res.data;
                    setLy(res.data);
                    setState.lyrics(lyrics);
                    dispatch({type: actions.SET_LYRICS, payload: {id: songId, lyrics}})
                })
        } else if (song.lyrics.length > 0) {
            const url = `/lyrics/noly.json`
            axios.get(url)
                .then(res => {
                    setState.lyrics([
                        {
                            "start": 0,
                            "end": 1000000,
                            "lyrics": "My też nie znamy tekstu"
                        }
                    ]);
                    dispatch({ type: actions.SET_LYRICS, payload: { id: songId, lyrics } })
                })
                .catch(err => {
                    setState.error(true)
                })
                .finally(() => {
                    setState.loading(false);
                })
        }
        else {
            setState.lyrics("My też nie znamy tekstu");
        }

        setState.currentLine(0);
    }, [song]);

    useEffect(() => {
        if(state.lyrics.length > 1){
            let currentLine = state.lyrics.findIndex(lyrics => currentTime >= lyrics.start && currentTime < lyrics.end);
            //fix last second error
            if(currentLine === -1){
                currentLine = state.lyrics.length - 1;
            }

            setState.currentLine(currentLine);
            setCu(currentLine);
        }
    }, [currentTime])
    if (size.width > 640) {
        if (state.lyrics[0].start == 'nosynchro') {
            return (
                <div className="mm-lyrics">
                    <p>©Musiq</p>
                    <div className="lydiv">

                        {ly != null ?
                            state.lyrics.map((list) => {
                                    return (
                                        <div>
                                            <span className="lt">
                                                {list.lyrics}
                                            </span>
                                        </div>
                                    )
                            })
                            : ''
                        }
                    </div>
                </div>
            );
        } else {
        return (
            <FullScreen handle={handle}>
                <div className="mm-lyrics">
                    {translate == false ?
                        <button className="button-translate" onClick={() => {
                            if (lyrics.length < 1) {
                                setIsTranslated(true);
                                const url = `/pl/lyrics/${song.trackName.split(" ").map(piece => piece.toLowerCase()).join("-")}.json`
                                axios.get(url)
                                .then(res => {

                                        if (res != undefined) {

                                            lyrics = res.data;

                                            setLy(res.data);

                                            setState.lyrics(lyrics);

                                            dispatch({ type: actions.SET_LYRICS, payload: { id: songId, lyrics } })

                                        } else {
                                            lyrics = [{
                                                "start": 0,
                                                "end": 1000,
                                                "lyrics": "Nie mamy tłumaczenia dla tego tekstu"
                                            }, {
                                                "start": 1000,
                                                "end": 100000,
                                                "lyrics": " "
                                            }];
                                            setLy([{
                                                "start": 0,
                                                "end": 1000,
                                                "lyrics": "Nie mamy tłumaczenia dla tego tekstu"
                                            }, {
                                                "start": 1000,
                                                "end": 100000,
                                                "lyrics": " "
                                            }]);
                                            setState.lyrics(lyrics);
                                        }

                                    })
                                    .catch(e => {
                                        lyrics = [{
                                            "start": 0,
                                            "end": 1000,
                                            "lyrics": "Nie mamy tłumaczenia dla tego tekstu"
                                        }, {
                                            "start": 1000,
                                            "end": 100000,
                                            "lyrics": e.toString()
                                        }];
                                        setLy([{
                                            "start": 0,
                                            "end": 1000,
                                            "lyrics": "Nie mamy tłumaczenia dla tego tekstu"
                                        }, {
                                            "start": 1000,
                                            "end": 100000,
                                            "lyrics": e.toString()
                                        }]);
                                        setState.lyrics(lyrics);
                                    })
                                    
                            }
                        }}><svg width="15px" height="15px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Przetłumacz</title><path d="M7.41 9l2.24 2.24-.83 2L6 10.4l-3.3 3.3-1.4-1.42L4.58 9l-.88-.88c-.53-.53-1-1.3-1.3-2.12h2.2c.15.28.33.53.51.7l.89.9.88-.88C7.48 6.1 8 4.84 8 4H0V2h5V0h2v2h5v2h-2c0 1.37-.74 3.15-1.7 4.12L7.4 9zm3.84 8L10 20H8l5-12h2l5 12h-2l-1.25-3h-5.5zm.83-2h3.84L14 10.4 12.08 15z" /></svg></button> : <button className="button-translate-active" onClick={() => {
                            if (lyrics.length < 1) {
                                setIsTranslated(false);
                                const url = `/lyrics/${song.trackName.split(" ").map(piece => piece.toLowerCase()).join("-")}.json`
                                axios.get(url)
                                    .then(res => {
                                        lyrics = res.data;
                                        setLy(res.data);
                                        setState.lyrics(lyrics);
                                        dispatch({ type: actions.SET_LYRICS, payload: { id: songId, lyrics } })
                                    })
                            }
                        }}><svg width="15px" height="15px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Oryginał</title><path d="M7.41 9l2.24 2.24-.83 2L6 10.4l-3.3 3.3-1.4-1.42L4.58 9l-.88-.88c-.53-.53-1-1.3-1.3-2.12h2.2c.15.28.33.53.51.7l.89.9.88-.88C7.48 6.1 8 4.84 8 4H0V2h5V0h2v2h5v2h-2c0 1.37-.74 3.15-1.7 4.12L7.4 9zm3.84 8L10 20H8l5-12h2l5 12h-2l-1.25-3h-5.5zm.83-2h3.84L14 10.4 12.08 15z" /></svg></button>}
                    {fullscreen == false ?
                        <button className="button-fullscreen" onClick={() => { Enter() }}><svg width="15px" height="15px" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><title>Pełny ekran</title><polygon points="208 48 208 16 16 16 16 208 48 208 48 70.627 208.687 231.313 231.313 208.687 70.627 48 208 48" />
                            <polygon points="464 304 464 441.373 299.313 276.687 276.687 299.313 441.373 464 304 464 304 496 496 496 496 304 464 304" /></svg></button> : <button className="button-fullscreen-active" onClick={() => { Exit() }}><svg width="15px" height="15px" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><title>Zamknij pełny ekran</title><polygon points="204 181.372 38.628 16 16 16 16 38.628 181.372 204 44 204 44 236 236 236 236 44 204 44 204 181.372" />
                                <polygon points="326.628 304 464 304 464 272 272 272 272 464 304 464 304 326.628 473.372 496 496 496 496 473.372 326.628 304" /></svg></button>}
                    <p>©Musiq</p>
                    <div className="lydiv">

                        {ly != null ?
                            state.lyrics.map((list) => {
                                if (currentTime >= list.start && currentTime <= list.end) {
                                    if (state.lyrics.indexOf(list) == 0 || state.lyrics.indexOf(list) == 1) {
                                        document.documentElement.style.setProperty('--top-lyrics', '10%');
                                    } else {
                                        document.documentElement.style.setProperty('--top-lyrics', 'calc(' + ((-25 * (state.lyrics.indexOf(list)))) + '% + ' + (-45 * (state.lyrics.indexOf(list))) + 'px + 10%)');
                                    }
                                    return (
                                        <div>
                                            <span className="lt">
                                                {list.lyrics}
                                            </span>
                                        </div>
                                    )
                                } else {
                                    return (
                                        <div>
                                            <span className="lt-n">
                                                {list.lyrics}
                                            </span>
                                        </div>
                                    )
                                }
                            })
                            : ''
                        }
                    </div>
                </div>
            </FullScreen>
        )
                    }
    } else {
        return (
                <div className="mm-lyrics">
                    {translate == false ?
                        <button className="button-translate" onClick={() => {
                            if (lyrics.length < 1) {
                                setIsTranslated(true);
                                const url = `/pl/lyrics/${song.trackName.split(" ").map(piece => piece.toLowerCase()).join("-")}.json`
                                axios.get(url)
                                .then(res => {

                                        if (res != undefined) {

                                            lyrics = res.data;

                                            setLy(res.data);

                                            setState.lyrics(lyrics);

                                            dispatch({ type: actions.SET_LYRICS, payload: { id: songId, lyrics } })

                                        }

                                    })
                                    .catch(e => {
                                        lyrics = [{
                                            "start": 0,
                                            "end": 1000,
                                            "lyrics": "Nie mamy tłumaczenia dla tego tekstu"
                                        }, {
                                            "start": 1000,
                                            "end": 100000,
                                            "lyrics": e.toString()
                                        }];
                                        setLy([{
                                            "start": 0,
                                            "end": 1000,
                                            "lyrics": "Nie mamy tłumaczenia dla tego tekstu"
                                        }, {
                                            "start": 1000,
                                            "end": 100000,
                                            "lyrics": e.toString()
                                        }]);
                                        setState.lyrics(lyrics);
                                    })
                                    
                            }
                        }}><svg width="15px" height="15px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Przetłumacz</title><path d="M7.41 9l2.24 2.24-.83 2L6 10.4l-3.3 3.3-1.4-1.42L4.58 9l-.88-.88c-.53-.53-1-1.3-1.3-2.12h2.2c.15.28.33.53.51.7l.89.9.88-.88C7.48 6.1 8 4.84 8 4H0V2h5V0h2v2h5v2h-2c0 1.37-.74 3.15-1.7 4.12L7.4 9zm3.84 8L10 20H8l5-12h2l5 12h-2l-1.25-3h-5.5zm.83-2h3.84L14 10.4 12.08 15z" /></svg></button> : <button className="button-translate-active" onClick={() => {
                            if (lyrics.length < 1) {
                                setIsTranslated(false);
                                const url = `/lyrics/${song.trackName.split(" ").map(piece => piece.toLowerCase()).join("-")}.json`
                                axios.get(url)
                                    .then(res => {
                                        lyrics = res.data;
                                        setLy(res.data);
                                        setState.lyrics(lyrics);
                                        dispatch({ type: actions.SET_LYRICS, payload: { id: songId, lyrics } })
                                    })
                            }
                        }}><svg width="15px" height="15px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Oryginał</title><path d="M7.41 9l2.24 2.24-.83 2L6 10.4l-3.3 3.3-1.4-1.42L4.58 9l-.88-.88c-.53-.53-1-1.3-1.3-2.12h2.2c.15.28.33.53.51.7l.89.9.88-.88C7.48 6.1 8 4.84 8 4H0V2h5V0h2v2h5v2h-2c0 1.37-.74 3.15-1.7 4.12L7.4 9zm3.84 8L10 20H8l5-12h2l5 12h-2l-1.25-3h-5.5zm.83-2h3.84L14 10.4 12.08 15z" /></svg></button>}
                    <div className="lydiv">

                        {ly != null ?
                            state.lyrics.map((list) => {
                                if (currentTime >= list.start && currentTime <= list.end) {
                                    if (state.lyrics.indexOf(list) == 0 || state.lyrics.indexOf(list) == 1) {
                                        document.documentElement.style.setProperty('--top-lyrics', '10%');
                                    } else {
                                        document.documentElement.style.setProperty('--top-lyrics', 'calc(' + ((-25 * (state.lyrics.indexOf(list)))) + '% + ' + (-45 * (state.lyrics.indexOf(list))) + 'px + 10%)');
                                    }
                                    return (
                                        <div>
                                            <span className="lt">
                                                {list.lyrics}
                                            </span>
                                        </div>
                                    )
                                } else if (currentTime <= list.end) {
                                    return (
                                        <div>
                                            <span className="lt-n">
                                                {list.lyrics}
                                            </span>
                                        </div>
                                    )
                                } else {
                                    return (
                                        <div>
                                            <span className="lt-no">
                                                {list.lyrics}
                                            </span>
                                        </div>
                                    )
                                }
                            })
                            : ''
                        }
                    </div>
                </div>
        )
    }




}

export default Lyrics
