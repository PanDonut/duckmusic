import React, { useEffect, useState } from 'react'
import axios from 'axios'
import createState from '../hooks/createState';
import {useDispatch } from 'react-redux'
import actions from '../store/actionTypes'
import { ExternalLink } from 'react-feather'
import { Link } from 'react-router-dom'
import './lyrics/lyrics.modular.css';
import Palette from 'react-palette'

function Lyrics({song, currentTime, songId, sly}) {
    const dispatch = useDispatch();
    const [topsc, setTop] = useState(0);
    const [cu, setCu] = useState([]);
    const [ly, setLy] = useState(null);
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

    return (
        <div className="mm-lyrics">
            <p>©Musiq</p>
            <div className="lydiv">
                
                {ly != null ?
        state.lyrics.map((list) => {
            if (currentTime >= list.start && currentTime <= list.end) {
                if (state.lyrics.indexOf(list) == 0 || state.lyrics.indexOf(list) == 1) {
                    document.documentElement.style.setProperty('--top-lyrics', '10%');
                } else {
                    document.documentElement.style.setProperty('--top-lyrics', '' + ( (-295 * (state.lyrics.indexOf(list))) + 100) + 'px');
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
)


}

export default Lyrics
