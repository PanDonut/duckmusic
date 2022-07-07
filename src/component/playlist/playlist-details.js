import TitleS from '../text/title-s';
import TextBoldM from '../text/text-bold-m';

import styles from "./playlist-details.module.css";
import { useState } from 'react';

function PlaylistDetails({ data }) {
    const [loading, setLoading] = useState(false);
	return (
        <div className={styles.playlistDetails} onClick={() => { document.documentElement.style.setProperty('--dispopen', 'none') }}>
            <div className={`${styles.imgBox} ${loading == true ? '' : 'SzkieletonLadowacz'}`}>
                <img onLoad={() => {
                    setLoading(true);
                }} src={data.imgUrl} />
            </div>
            <div className={`${styles.textBox}`}>
                <TitleS>{data.type}</TitleS>
                <h1>{data.title}</h1>
                <div className={styles.Artist}>
                    <TextBoldM>{data.artist}</TextBoldM>
                </div>
            </div>
        </div>
	);
}

export default PlaylistDetails;
