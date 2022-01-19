import CONST from '../constants/index';
import useWindowSize from '../hooks/useWindowSize';
import MobileNavigation from '../component/sidebar/mobile-navigation';
import lay from '../style/App.module.css';
import Sidebar from '../component/sidebar/sidebar';
import { useHistory } from 'react-router-dom';
import Topnav from '../component/topnav/topnav';
import './queue-visuals.css';
import { connect } from 'react-redux';
import PLAYLIST from '../data/index.json'
import PlaylistTrack from '../component/playlist/playlist-track';
import SONGLIST from '../data/songs.json'

function QueueShow(props) {
    const size = useWindowSize();
    const history = useHistory();
    return (
        <div className={lay.layout}>
            {size.width > CONST.MOBILE_SIZE
                ? <Sidebar />
                : <MobileNavigation />
            }
            <div className='cont'>
            <Topnav normal={true}/>
            {  PLAYLIST[props.trackData.trackKey[0]].playlistData.map(item => {
                <PlaylistTrack
                data={{
                    sin: PLAYLIST[props.trackData.trackKey[0]].playlistData.indexOf(item),
                    song: SONGLIST[item.songindex]
                }}
            />
            }
            )
            }
            </div>
            </div>
    )
}

const mapStateToProps = (state) => {
    return {
        trackData: state.trackData,
        isPlaying: state.isPlaying
    };
};

export default connect(mapStateToProps)(QueueShow);