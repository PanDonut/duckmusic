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

    console.log(lyrics.length);

    useEffect(() => {
        if(lyrics.length < 1){
            const url = `/lyrics/${song.trackName.split(" ").map(piece => piece.toLowerCase()).join("-")}.json`
            axios.get(url)
                .then(res => {
                    lyrics = res.data;
                    setState.lyrics(lyrics);
                    dispatch({type: actions.SET_LYRICS, payload: {id: songId, lyrics}})
                })
                .catch(err => {
                    setState.error(true)
                })
                .finally(() => {
                    setState.loading(false);
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
            // console.log(currentLine, currentTime)
        }
    }, [currentTime])

    if (state.currentLine != state.lyrics.length - 1) {
        return (
            <div className="mm-lyrics">
                <p>©Musiq</p>
                {
                                <div>
                                    <span className="lt">
                            {state.lyrics[state.currentLine].lyrics}
                                    </span>
                                    <span className="lt-n">
                            {state.lyrics[state.currentLine + 1].lyrics}
                                    </span>
                                </div>
                }
                
            </div>
        )
    } else if (state.currentLine == state.lyrics.length - 1) {
        return (
            <div className="mm-lyrics">
                <p>©Musiq</p>
                {
                    <div>
                        <span className="lt">
                            {state.lyrics[state.currentLine].lyrics}
                        </span>
                    </div>

                }
                
            </div>
        )
    } else if (state.lyrics.length == 0) {
        return (
            <div className="mm-lyrics">
                <p>©Musiq</p>
                {
                    <div>
                        <span className="lt">
                            "f"
                        </span>
                    </div>

                }
                
            </div>
        )
    }
}

export default Lyrics
