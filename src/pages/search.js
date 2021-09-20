import Topnav from '../component/topnav/topnav';
import TitleM from '../component/text/title-m'
import PlaylistCardS from '../component/cards/playlist-card-s';
import { PLAYLIST } from '../data/index';

import styles from "./search.module.css";

function Search() {
    return (
        <div className={styles.SearchPage}>
            <Topnav search={true}/>

            <div className={styles.Search}>
                <TitleM>Szukaj</TitleM>
                <div className={styles.SearchCardGrid}>
                    {PLAYLIST.map((item) => {
                        return (
                            <PlaylistCardS
                                key={item.title}
                                data={item}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Search;