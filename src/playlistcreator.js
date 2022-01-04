import PLAYLIST from './data/index.json';
import SONGLIST from './data/songs.json';
import { getDatabase, ref, onValue, set } from "firebase/database";
import { aut } from './dauth.js';

export function CreatePlaylist(firstindex, color, name) {
    const db = getDatabase(aut);
    let pl = [];
    const index = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const nameRef = ref(db, 'users/' + localStorage.getItem('emaildm').split('.').join("") + '/duckmusic/playlist');
    onValue(nameRef, (snapshot) => {
        const data = snapshot.val();
        if (data != null) {
                if (pl != data) {
                    pl = JSON.parse(data);
                }
        }
    });

    pl.push
        (
            {
                "index": index,
                "type": "playlista",
                "title": name,
                "link": index,
                "ex": "no",
                "hoverColor": color,
                "playlistBg": color,
                "playlistData": [
                    {
                        "songindex": firstindex
                    }
                    ]
            }
        )

    set(ref(db, 'users/' + localStorage.getItem('emaildm').split('.').join("") + "/duckmusic"), {
        playlist: JSON.stringify(pl)
    });
}

export function AddToPlaylist(song, index, item) {
    const db = getDatabase(aut);
    let pl = [];
    const nameRef = ref(db, 'users/' + localStorage.getItem('emaildm').split('.').join("") + '/duckmusic/playlist');
    onValue(nameRef, (snapshot) => {
        const data = snapshot.val();
        if (data != null) {
            if (pl != data) {
                pl = JSON.parse(data);
            }
        }
    });

            pl[index].playlistData.push
                (
                    {
                        "songindex": song
                    }
                )

    set(ref(db, 'users/' + localStorage.getItem('emaildm').split('.').join("") + "/duckmusic"), {
        playlist: JSON.stringify(pl)
    });
}

export function RemoveItem(index, song) {
    const db = getDatabase(aut);
    let pl = [];
    const nameRef = ref(db, 'users/' + localStorage.getItem('emaildm').split('.').join("") + '/duckmusic/playlist');
    onValue(nameRef, (snapshot) => {
        const data = snapshot.val();
        if (data != null) {
            if (pl != data) {
                pl = JSON.parse(data);
            }
        }
    });

    const removeNumber = (arr, num) => arr.filter(el => el !== num);
    pl = pl.slice(index, index).concat(pl.slice(index + 1));
    console.log(pl);

    set(ref(db, 'users/' + localStorage.getItem('emaildm').split('.').join("") + "/duckmusic"), {
        playlist: JSON.stringify(pl)
    });
}

export function ImportPlaylist(file) {
    const db = getDatabase(aut);
    let pl = [];
    const index = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const nameRef = ref(db, 'users/' + localStorage.getItem('emaildm').split('.').join("") + '/duckmusic/playlist');
    onValue(nameRef, (snapshot) => {
        const data = snapshot.val();
        if (data != null) {
            if (pl != data) {
                pl = JSON.parse(data);
            }
        }
    });

    if (pl.includes(JSON.parse(file))) {
        console.log(file + " istnieje!")
    } else {
        pl.push(JSON.parse(file))
    }

    set(ref(db, 'users/' + localStorage.getItem('emaildm').split('.').join("") + "/duckmusic"), {
        playlist: JSON.stringify(pl)
    });

    window.location.reload(true);
}

export function RemoveSong(index, song) {
    const db = getDatabase(aut);
    let pl = [];
    const nameRef = ref(db, 'users/' + localStorage.getItem('emaildm').split('.').join("") + '/duckmusic/playlist');
    onValue(nameRef, (snapshot) => {
        const data = snapshot.val();
        if (data != null) {
            if (pl != data) {
                pl = JSON.parse(data);
            }
        }
    });

    pl[index].playlistData.splice(song, 1);
    console.log(pl);

    set(ref(db, 'users/' + localStorage.getItem('emaildm').split('.').join("") + "/duckmusic"), {
        playlist: JSON.stringify(pl)
    });
}