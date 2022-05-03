import Sidebar from '../component/sidebar/sidebar';
import Topnav from '../component/topnav/topnav';
import CONST from '../constants/index';
import useWindowSize from '../hooks/useWindowSize';
import MobileNavigation from '../component/sidebar/mobile-navigation';
import lay from '../style/App.module.css';
import '../sylwester.css';
import SONGS from '../data/songs.json';
import { useRef } from 'react';

function Sylwester() {
    const size = useWindowSize();

	const arr = [

		{
			"index": "1",
			"songindex": 73
		},

		{
			"index": "2",
			"songindex": 74
		},

		{
			"index": "3",
			"songindex": 75
		},
		{
			"index": "4",
			"songindex": 76
		},

		{
			"index": "5",
			"songindex": 77
		},
		{
			"index": "6",
			"songindex": 78
		},
		{
			"index": "7",
			"songindex": 79
		}
	];
	const audioRef = useRef(null);

    return (
        <>
			<div className="sylwester">
				{
					arr.filter((list) => arr.indexOf(list) == 1).map((item) => {
						if (arr.indexOf(item) == 0) {
							document.documentElement.style.setProperty('--col-event', '#6ffc03');
							document.documentElement.style.setProperty('--col-event1', '#6ffc03')
						}

						if (audioRef.current) {
							audioRef.current.play();
						}

							return (
								<div id="show">
									<audio ref={audioRef} src={SONGS[item.songindex].link}></audio>
									<img src={SONGS[item.songindex].songimg}></img>
								</div>
							);
						}
					)
				}
            </div>
        </>
        )
}

export default Sylwester;