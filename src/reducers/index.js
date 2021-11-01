import { PLAYLIST } from "../data/index";
import { PLAYPAUSE, CHANGETRACK } from "../actions/index";

const INITIAL_STATE = {
    trackData: {
    songid: '0',
    trackKey: [0, 0],
    track: ``,
    trackName: ` `,
    trackImg: `https://i.ibb.co/jzp9qcm/trans.png`,
    trackArtist: ` `    
  },
  isPlaying: false
};

export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PLAYPAUSE:
      return {
        ...state,
        isPlaying: action.payload
      };
    case CHANGETRACK:
      return {
        ...state,
        trackData: {
          ...state.trackData,
          trackKey: action.payload,
          track: `${
            PLAYLIST[action.payload[0]].playlistData[action.payload[1]].link
          }`,
          trackName: `${
            PLAYLIST[action.payload[0]].playlistData[action.payload[1]].songName
          }`,
          trackImg: `${
            PLAYLIST[action.payload[0]].playlistData[action.payload[1]].songimg
          }`,
          trackArtist: `${
            PLAYLIST[action.payload[0]].playlistData[action.payload[1]].songArtist
          }`,
          id: `${
            PLAYLIST[action.payload[0]].playlistData[action.payload[1]].songID
          }`
        }
      };
    default:
      return state;
  }
};
