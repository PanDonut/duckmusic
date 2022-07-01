import PLAYLIST from './data/index.json';
import SONGLIST from './data/songs.json';
import { getDatabase, ref, onValue, set } from "firebase/database";
import { aut } from './dauth.js';
import { GetUID } from './pages/functions';
import { useEffect, useState } from 'react';

export function CreatePlaylist(firstindex, color, name) {
    const db = getDatabase(aut);
    let pl = [];
    const index = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const nameRef = ref(db, 'users/' + GetUID() + '/duckmusic/playlist');
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

    set(ref(db, 'users/' + GetUID() + "/duckmusic"), {
        playlist: JSON.stringify(pl)
    });
}

export function CreateEmptyPlaylist(color, name) {
    const db = getDatabase(aut);
    let pl = [];
    const index = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const nameRef = ref(db, 'users/' + GetUID() + '/duckmusic/playlist');
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
                    ]
            }
        )

    set(ref(db, 'users/' + GetUID() + "/duckmusic"), {
        playlist: JSON.stringify(pl)
    });

    window.location.reload(true);
}

export function AddToPlaylist(song, index, item) {
    const db = getDatabase(aut);
    let pl = [];
    const nameRef = ref(db, 'users/' + GetUID() + '/duckmusic/playlist');
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

    set(ref(db, 'users/' + GetUID() + "/duckmusic"), {
        playlist: JSON.stringify(pl)
    });
}

export function RemoveItem(index, song) {
    const db = getDatabase(aut);
    let pl = [];
    const nameRef = ref(db, 'users/' + GetUID() + '/duckmusic/playlist');
    onValue(nameRef, (snapshot) => {
        const data = snapshot.val();
        if (data != null) {
            if (pl != data) {
                pl = JSON.parse(data);
            }
        }
    });

    pl.splice(index, 1);
    console.log(pl);

    set(ref(db, 'users/' + GetUID() + "/duckmusic"), {
        playlist: JSON.stringify(pl)
    });
}

export function ImportPlaylist(file) {
    const db = getDatabase(aut);
    let pl = [];
    const index = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const nameRef = ref(db, 'users/' + GetUID() + '/duckmusic/playlist');
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

    set(ref(db, 'users/' + GetUID() + "/duckmusic"), {
        playlist: JSON.stringify(pl)
    });

    window.location.reload(true);
}

export function RemoveSong(index, song) {
    const db = getDatabase(aut);
    let pl = [];
    const nameRef = ref(db, 'users/' + GetUID() + '/duckmusic/playlist');
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

    set(ref(db, 'users/' + GetUID() + "/duckmusic"), {
        playlist: JSON.stringify(pl)
    });
}

export function RemoveLiked(index, song) {
    const db = getDatabase(aut);
    let pl = [];
    const nameRef = ref(db, 'users/' + GetUID() + '/dmusic/liked');
    onValue(nameRef, (snapshot) => {
        const data = snapshot.val();
        if (data != null) {
            if (pl != data) {
                pl = JSON.parse(data);
            }
        }
    });

    console.log(index);
    pl.splice(index, 1);
    console.log(pl);

    set(ref(db, 'users/' + GetUID() + "/dmusic"), {
        liked: JSON.stringify(pl)
    });
}

export function LikeSong(index) {
    const db = getDatabase(aut);
    let pl = [];
    const nameRef = ref(db, 'users/' + GetUID() + '/dmusic/liked');
    var [likedSongs, setLikedSongs] = useState([]);
    var nameRef1 = ref(
        db,
        "users/" +
          GetUID() +
          "/dmusic/liked"
      );
      onValue(nameRef1, (snapshot) => {
        const data = snapshot.val();
        if (data != null || data != undefined || likedSongs == []) {
          setLikedSongs(JSON.parse(data));
        }
      });
        console.log(likedSongs);
        var dat = likedSongs;
        dat.push(index);
        set(
          ref(
            db,
            "users/" +
              GetUID() +
              "/dmusic"
          ),
          {
            liked: JSON.stringify(dat),
          }
        );
}

export function SendFriendRequest(email) {
}