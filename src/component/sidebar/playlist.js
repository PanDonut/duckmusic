import { Link } from "react-router-dom";

import styles from './playlist.module.css';

import TitleS from '../text/title-s';
import TextRegularM from '../text/text-regular-m';
import PlaylistButton from './playlist-button';
import { PLAYLISTBTN } from '../../constants';
import { PLAYLIST } from '../../data';

var indexnmbr = 5;
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
function Playlist() {
    return (
      <div className={styles.Playlist}>
        <TitleS>Proponowane</TitleS>

        <div>
          {PLAYLISTBTN.map((playlist) => {
            return (
                <PlaylistButton 
                  href={playlist.path} 
                  ImgName={playlist.ImgName}
                  key={playlist.title}
                >
                  {playlist.title}
                </PlaylistButton>
            );
          })}
        </div>

        <hr className={styles.hr}/>

        <div>
          {PLAYLIST.filter((item) => item.index == rand).map((list) => {
            return (
              <Link to={`/playlist/${list.link}`} key={list.title}>
                  <TextRegularM>{list.title}</TextRegularM>
              </Link>
            );
          })}
          {PLAYLIST.filter((item) => item.index == rand1).map((list) => {
            return (
              <Link to={`/playlist/${list.link}`} key={list.title}>
                  <TextRegularM>{list.title}</TextRegularM>
              </Link>
            );
          })}
          {PLAYLIST.filter((item) => item.index == rand2).map((list) => {
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