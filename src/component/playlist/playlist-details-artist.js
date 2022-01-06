import TitleS from '../text/title-s';
import TextBoldM from '../text/text-bold-m';

import styles from "./playlist-details.module.css";
import { useState } from 'react';
import useWindowSize from '../../hooks/useWindowSize'

function PlaylistDetails({ data }) {

    const size = useWindowSize();
	return (
        <div className={styles.playlistDetails1} onClick={() => { document.documentElement.style.setProperty('--dispopen', 'none') }}>
            <div className={styles.imgBox1}>               
                <img src={data.image} />    
                <div className={styles.nn}></div>  
                <div className={styles.nn1}></div>         
            </div>
            <div className={styles.textBox1}>
                { size.width > 640 ?
                data.verified == "true" ?
                <h1>{data.name}<svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 21.6596l-3.38079 1.8543-1.84158-3.3877-3.84662-.2679.28231-3.8456-3.09118-2.3049 2.31658-3.0825-1.3543-3.61028 3.61534-1.34071.81255-3.76935 3.76627.82672L12 0l2.7214 2.73168 3.7663-.82672.8125 3.76935 3.6154 1.34071-1.3543 3.61028 2.3166 3.0825-3.0912 2.3049.2823 3.8456-3.8466.2679-1.8416 3.3877L12 21.6596z" fill="#5b88e1"></path><path d="M16.8637 7.41226l-6.6435 7.77824-2.80421-3.2842-.4935.5775 3.29771 3.8617 7.2135-8.44649-.57-.48675z" fill="#fff"></path></svg></h1>
                :
                <h1>{data.name}</h1>
                : 
                data.verified == "true" ?
                <h1>{data.name + " "}<svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 21.6596l-3.38079 1.8543-1.84158-3.3877-3.84662-.2679.28231-3.8456-3.09118-2.3049 2.31658-3.0825-1.3543-3.61028 3.61534-1.34071.81255-3.76935 3.76627.82672L12 0l2.7214 2.73168 3.7663-.82672.8125 3.76935 3.6154 1.34071-1.3543 3.61028 2.3166 3.0825-3.0912 2.3049.2823 3.8456-3.8466.2679-1.8416 3.3877L12 21.6596z" fill="#5b88e1"></path><path d="M16.8637 7.41226l-6.6435 7.77824-2.80421-3.2842-.4935.5775 3.29771 3.8617 7.2135-8.44649-.57-.48675z" fill="#fff"></path></svg></h1>
                :
                <h1>{data.name}</h1>
                }
            </div>
        </div>
	);
}

export default PlaylistDetails;
