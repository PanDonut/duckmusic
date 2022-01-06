import TitleS from '../text/title-s';
import TextBoldM from '../text/text-bold-m';
import { useHistory } from 'react-router-dom';
import styles from "./playlist-details.module.css";

function PlaylistDetails({ data }) {
    const history = useHistory();
	return (
        <div className={styles.playlistDetails} onClick={() => { document.documentElement.style.setProperty('--dispopen', 'none') }}>
            <div className={styles.imgBox}>
                <img src={data.songimg} />
            </div>
            <div className={styles.textBox}>
                <TitleS>Utwór</TitleS>
                <h1>{data.songName}</h1>
                <div className={styles.ar1}>
                { data.songArtist.split(",").map(item => {
                    console.log(item.toLowerCase())
                    return (
                <div className={styles.Artist1} onClick={() => {{ document.documentElement.style.setProperty('--img-opacity', '1'); { history.push('/artist/' + item.toLowerCase().split(" ").join("-"))}}}}>
                    <TextBoldM>{item}&nbsp;</TextBoldM>
                </div>
                    );
                }
                )
                }
                </div>
            </div>
        </div>
	);
}

export default PlaylistDetails;
