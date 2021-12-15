import TitleS from '../text/title-s';
import TextBoldM from '../text/text-bold-m';

import styles from "./playlist-details.module.css";

function PlaylistDetails({ data }) {
	return (
        <div className={styles.playlistDetails} onClick={() => { document.documentElement.style.setProperty('--dispopen', 'none') }}>
            <div className={styles.imgBox}>
                <img src={data.songimg} />
            </div>
            <div className={styles.textBox}>
                <TitleS>Utwór</TitleS>
                <h1>{data.songName}</h1>
                <div className={styles.Artist}>
                    <TextBoldM>{data.songArtist}</TextBoldM>
                </div>
            </div>
        </div>
	);
}

export default PlaylistDetails;
