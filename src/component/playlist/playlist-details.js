import TitleS from '../text/title-s';
import TextBoldM from '../text/text-bold-m';

import styles from "./playlist-details.module.css";

function PlaylistDetails({ data, txt }) {
	return (
        <div className={styles.playlistDetails} onClick={() => { document.documentElement.style.setProperty('--dispopen', 'none') }}>
            <div className={styles.imgBox}>
                <img src={data.imgUrl} />
            </div>
            <div className={styles.textBox}>
                <TitleS>{data.type}</TitleS>
                <h1>{data.title}</h1>
                <div className={styles.Artist}>
                    <h5 className={styles.svb}>{txt + " "}<svg className={styles.svv} version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 31.955 31.955" width="10px" height="10px">
                        <circle cx="10" cy="10" r="10" />
                    </svg></h5><TextBoldM>{" " + data.artist}</TextBoldM>
                </div>
            </div>
        </div>
	);
}

export default PlaylistDetails;
