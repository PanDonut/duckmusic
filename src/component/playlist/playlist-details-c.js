import TitleS from '../text/title-s';
import TextBoldM from '../text/text-bold-m';
import SONGS from '../../data/songs.json';
import styles from "./playlist-details.module.css";
import { useHistory } from 'react-router-dom';

function PlaylistDetails({ data, artists }) {
	const history = useHistory();
	return (
        <div className={styles.playlistDetails} onClick={() => { document.documentElement.style.setProperty('--dispopen', 'none') }}>
            <div className={`${styles.imgBox} ${data.playlistData.length >= 4 ? styles.gridImg : ''}`}>
            { data.playlistData.length < 4 ?
						<img src={data.playlistData[0] != undefined ? SONGS[data.playlistData[0].songindex].songimg : "https://firebasestorage.googleapis.com/v0/b/duck-auth.appspot.com/o/no.png?alt=media&token=b23a34e3-5ea9-4c32-bc04-19c0c05c99cd"} alt={data.title} />
						:
						<img src={SONGS[data.playlistData[0].songindex].songimg} alt={data.title} />
						}
						{ data.playlistData.length >= 4 ?
						<img src={SONGS[data.playlistData[1].songindex].songimg} alt={data.title} />
						:
						''
						}
						{ data.playlistData.length >= 4 ?
						<img src={SONGS[data.playlistData[2].songindex].songimg} alt={data.title} />
						:
						''
						}
						{ data.playlistData.length >= 4 ?
						<img src={SONGS[data.playlistData[3].songindex].songimg} alt={data.title} />
						:
						''
						}     
            </div>
            <div className={styles.textBox}>
                <TitleS>{data.type}</TitleS>
                <h1>{data.title}</h1>
				<div className={styles.ar1}>
				{
					data.playlistData.map(list => {
						return (
							<>
								{
                 SONGS[list.songindex].songArtist.split(",").map(item => {
                    return (
                <div className={styles.Artist1} onClick={() => {{ document.documentElement.style.setProperty('--img-opacity', '1'); { history.push('/artist/' + item.toLowerCase().split(" ").join("-"))}}}}>
                    <TextBoldM>{item}</TextBoldM>&nbsp;
                </div>
                    );
                }
				 )
			}
				 </>
                )
			})
				}
            </div>
			</div>
        </div>
	);
}

export default PlaylistDetails;
