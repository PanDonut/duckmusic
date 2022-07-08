import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from "redux";
import { Provider } from "react-redux";
import { reducer } from "./reducers/index";
import App from './App';
import './style/index.css';
import { useEffect } from 'react';
import SONGS from './data/songs.json';
import PLAYLISTS from './data/index.json';
import { aut } from './dauth';
import { GetUID } from './pages/functions';
import { getDatabase, onValue, ref } from 'firebase/database';

if (localStorage.getItem("dmvol") == null) {
    localStorage.setItem("dmvol", 1)
}
var albums = {};
async function LoadPlaylists() {
SONGS.filter(item => item.album != undefined && item.album != null && item.album != "").forEach(element => {
    if (albums[element.album] == null || albums[element.album] == undefined) {
        albums[element.album] = [];
    }
    albums[element.album].push(SONGS.indexOf(element));
});
await Object.keys(albums).forEach(key => {
    var ar = {
		"index": Math.random().toString(36).substring(2, 15) + key,
		"type": "album",
		"title": key,
		"link": key.replaceAll(" ",""),
        "ex": "no",
		"imgUrl": SONGS[albums[key][0]].songimg,
		"hoverColor": "rgb(22, 91, 51)",
		"artist": SONGS[albums[key][0]].songArtist.replaceAll(",", ", "),
		"playlistBg": "rgb(187, 37, 40)",
		"playlistData": []
	};
    albums[key].forEach(element => {
        ar.playlistData.push(
            {
                "songindex": element
            }
        )
    });
    PLAYLISTS.unshift(ar);
});

var rar = {
    "index": "_favourites",
    "type": "playlista",
    "title": "Ulubione",
    "link": "favourites",
    "ex": "no",
    "imgUrl": "https://i.ibb.co/gFRtwt5/heart-playlist.png",
    "hoverColor": "rgb(22, 91, 51)",
    "artist": `Przygotowane dla ${localStorage.getItem('name')}`,
    "playlistBg": "rgb(187, 37, 40)",
    "playlistData": []
};

var rer = {
    "index": "_def",
    "type": "_def",
    "title": "_def",
    "link": "_def",
    "ex": "no",
    "imgUrl": "https://i.ibb.co/gFRtwt5/heart-playlist.png",
    "hoverColor": "rgb(22, 91, 51)",
    "artist": "_def",
    "playlistBg": "rgb(187, 37, 40)",
    "playlistData": []
};

const db = getDatabase(aut);
var likedSongs = [];
var nameRef1 = ref(db,"users/" + GetUID() +"/dmusic/liked");
onValue(nameRef1, (snapshot) => {
     const data = snapshot.val();
     if (data != null || data != undefined || likedSongs == []) {
        JSON.parse(data).forEach(element => {
            rar.playlistData.push(
                {
                    "songindex": element
                }
            )
        });
        PLAYLISTS.unshift(rar);
        PLAYLISTS.unshift(rer);
    }
});
}

LoadPlaylists();

const store = createStore(reducer);
ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);