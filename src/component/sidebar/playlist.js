import { Link } from "react-router-dom";

import styles from './playlist.module.css';

import TitleS from '../text/title-s';
import TextRegularM from '../text/text-regular-m';
import PlaylistButton from './playlist-button';
import { PLAYLISTBTN } from '../../constants';
import PLAYLIST from '../../data/index.json';

var indexnmbr = PLAYLIST.length;
var rand = Math.floor((Math.random() * indexnmbr) + 1);
var rand1 = Math.floor((Math.random() * indexnmbr) + 1);
var rand2 = Math.floor((Math.random() * indexnmbr) + 1);

if (rand1 == rand) {
    rand1 = Math.floor((Math.random() * indexnmbr) + 1);
} else if (rand1 == rand2) {
    rand1 = Math.floor((Math.random() * indexnmbr) + 1);
}

if (rand2 == rand) {
    rand2 = Math.floor((Math.random() * indexnmbr) + 1);
} else if (rand2 == rand1) {
    rand2 = Math.floor((Math.random() * indexnmbr) + 1);
}

if (rand == rand1) {
    rand = Math.floor((Math.random() * indexnmbr) + 1);
} else if (rand == rand2) {
    rand = Math.floor((Math.random() * indexnmbr) + 1);
}

const random = Math.floor((Math.random() * PLAYLIST.length) + 0);
function Playlist() {
    return (
      <div className={styles.Playlist}>
        <TitleS>Proponowane</TitleS>

        <hr className={styles.hr}/>

        <div>
          {PLAYLIST.slice(random, (random + 2)).map((list) => {
            return (
              <Link to={`/playlist/${list.link}`} key={list.title}>
                  <TextRegularM>{list.title}</TextRegularM>
              </Link>
            );
          })}
        </div>
      </div>
    );
}
  
export default Playlist;