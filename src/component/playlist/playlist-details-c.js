import TitleS from '../text/title-s';
import TextBoldM from '../text/text-bold-m';
import SONGS from '../../data/songs.json';
import styles from "./playlist-details.module.css";

function PlaylistDetails({ data }) {
	return (
        <div className={styles.playlistDetails} onClick={() => { document.documentElement.style.setProperty('--dispopen', 'none') }}>
            <div className={styles.imgBox}>
                <img src={SONGS[data.playlistData[0].songindex].songimg} />
            </div>
            <div className={styles.textBox}>
                <TitleS>{data.type}</TitleS>
                <h1>{data.title}</h1>
            </div>
        </div>
	);
}

export default PlaylistDetails;
