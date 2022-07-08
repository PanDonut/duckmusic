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

export function LikeArtist(index) {
    const db = getDatabase(aut);
    let pl = [];
    const nameRef = ref(db, 'users/' + GetUID() + '/dmusic/arists');
    var [likedSongs, setLikedSongs] = useState([]);
    var nameRef1 = ref(
        db,
        "users/" +
          GetUID() +
          "/dmusic/artists"
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
            artists: JSON.stringify(dat),
          }
        );
}

export function SendFriendRequest(email) {
}

export async function connectHeart(props) {
    const device = await navigator.bluetooth.requestDevice({
      acceptAllDevices: true,
    })
    console.log(`%c\n👩🏼‍⚕️`, 'font-size: 82px;', 'Starting HR...\n\n')
    const server = await device.gatt.connect()
    const service = await server.getPrimaryService('heart_rate')
    const char = await service.getCharacteristic('heart_rate_measurement')
    char.oncharacteristicvaluechanged = props.onChange
    char.startNotifications()
    return char
  }
  
  
  // Basic example that prints a live updating chart of the heart rate history.
  // Note: This should only be used as a quick/hacky test, it's not optimized.
  
  let hrData = new Array(200).fill(10)
  
  
  export function printHeartRate(event) {
    const heartRate = event.target.value.getInt8(1)
    const prev = hrData[hrData.length - 1]
    hrData[hrData.length] = heartRate
    hrData = hrData.slice(-200)
    let arrow = ''
    if (heartRate !== prev) arrow = heartRate > prev ? '⬆' : '⬇'
    console.clear()
    console.graph(hrData)
    console.log(`%c\n💚 ${heartRate} ${arrow}`, 'font-size: 24px;', '\n\n(To disconnect, refresh or close tab)\n\n')
  }
  
  
  export function setupConsoleGraphExample(height, width) {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    canvas.height = height
    canvas.width = width
    context.fillStyle = '#fff'
    window.console.graph = data => {
      const n = data.length
      const units = Math.floor(width / n)
      width = units * n
      context.clearRect(0, 0, width, height)
      for (let i = 0; i < n; ++i) {
        context.fillRect(i * units, 0, units, 100 - (data[i] / 2))
      }
      console.log('%c ',
        `font-size: 0; padding-left: ${width}px; padding-bottom: ${height}px;
         background: url("${canvas.toDataURL()}"), -webkit-linear-gradient(#eee, #888);`,
      )
    }
  }