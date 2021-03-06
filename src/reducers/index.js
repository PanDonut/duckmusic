import PLAYLIST from "../data/index.json";
import SONGLIST from "../data/songs.json";
import {
  PLAYPAUSE,
  CHANGETRACK,
  CUSTOMTRACK,
  SONGTRACK,
  FIREBASEG,
  KONSOL,
  REW,
  REWINDY,
} from "../actions/index";
import axios from "axios";
import { aut } from "../dauth";
import { getDatabase, ref, onValue, set } from "firebase/database";
import { useEffect, useState } from "react";
import { GetUID } from "../pages/functions";

let CPLAYLIST = null;
const db = getDatabase(aut);
if (localStorage.getItem("emaildm") != null) {
  const nameRef = ref(db, "users/" + GetUID() + "/duckmusic/playlist");
  onValue(nameRef, (snapshot) => {
    const data = snapshot.val();
    if (CPLAYLIST == null) {
      CPLAYLIST = JSON.parse(data);
    }
  });
}

var playlistwmods = PLAYLIST;
console.log(playlistwmods)

const INITIAL_STATE = {
  trackData: {
    songid: "0",
    trackKey: [0, 0],
    track: ``,
    trackName: `Brak utworu`,
    trackImg: `https://i.ibb.co/jzp9qcm/trans.png`,
    trackArtist: ` `,
    lyrics: [],
    canSkip: true,
    isCustom: false,
  },
  konsola: false,
  rewind: false,
  rewindyear: "2022",
  lyrics: [],
  currentLine: 0,
  loading: true,
  error: false,
  myisPlaying: false,
  custplay: [],
};

export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PLAYPAUSE:
      return {
        ...state,
        isPlaying: action.payload,
      };
    case CHANGETRACK:
      return {
        ...state,
        trackData: {
          ...state.trackData,
          trackKey: action.payload,
          track: `${
            SONGLIST[
              playlistwmods[action.payload[0]].playlistData[action.payload[1]]
                .songindex
            ].link
          }`,
          album: `${
            SONGLIST[
              PLAYLIST[action.payload[0]].playlistData[action.payload[1]]
                .songindex
            ].album
          }`,
          trackName: `${
            SONGLIST[
              PLAYLIST[action.payload[0]].playlistData[action.payload[1]]
                .songindex
            ].songName
          }`,
          trackImg: `${
            SONGLIST[
              PLAYLIST[action.payload[0]].playlistData[action.payload[1]]
                .songindex
            ].songimg
          }`,
          trackArtist: `${
            SONGLIST[
              PLAYLIST[action.payload[0]].playlistData[action.payload[1]]
                .songindex
            ].songArtist
          }`,
          id: `${
            SONGLIST[
              PLAYLIST[action.payload[0]].playlistData[action.payload[1]]
                .songindex
            ].songID
          }`,
          lyrics: `${
            SONGLIST[
              PLAYLIST[action.payload[0]].playlistData[action.payload[1]]
                .songindex
            ].lyrics
          }`,
          canSkip: `${true}`,
          isCustom: `${false}`,
        },
      };
    case CUSTOMTRACK:
      return {
        ...state,
        trackData: {
          ...state.trackData,
          trackKey: action.payload,
          track: `${
            SONGLIST[
              CPLAYLIST[action.payload[0]].playlistData[action.payload[1]]
                .songindex
            ].link
          }`,
          album: `${
            SONGLIST[
              CPLAYLIST[action.payload[0]].playlistData[action.payload[1]]
                .songindex
            ].album
          }`,
          trackName: `${
            SONGLIST[
              CPLAYLIST[action.payload[0]].playlistData[action.payload[1]]
                .songindex
            ].songName
          }`,
          trackImg: `${
            SONGLIST[
              CPLAYLIST[action.payload[0]].playlistData[action.payload[1]]
                .songindex
            ].songimg
          }`,
          trackArtist: `${
            SONGLIST[
              CPLAYLIST[action.payload[0]].playlistData[action.payload[1]]
                .songindex
            ].songArtist
          }`,
          id: `${
            SONGLIST[
              CPLAYLIST[action.payload[0]].playlistData[action.payload[1]]
                .songindex
            ].songID
          }`,
          lyrics: `${
            SONGLIST[
              CPLAYLIST[action.payload[0]].playlistData[action.payload[1]]
                .songindex
            ].lyrics
          }`,
          canSkip: `${true}`,
          isCustom: `${true}`,
        },
      };
    case SONGTRACK:
      return {
        ...state,
        trackData: {
          ...state.trackData,
          trackKey: action.payload,
          track: `${SONGLIST[action.payload[0]].link}`,
          album: `${SONGLIST[action.payload[0]].album}`,
          trackName: `${SONGLIST[action.payload[0]].songName}`,
          trackImg: `${SONGLIST[action.payload[0]].songimg}`,
          trackArtist: `${SONGLIST[action.payload[0]].songArtist}`,
          id: `${SONGLIST[action.payload[0]].songID}`,
          lyrics: `${SONGLIST[action.payload[0]].lyrics}`,
          canSkip: `${false}`,
          isCustom: `${false}`,
        },
      };
    case FIREBASEG:
      return {
        ...state,
        custplay: `${action.payload[0]}`,
      };
    case KONSOL:
      return {
        ...state,
        konsola: action.payload,
      };
    case REW:
      return {
        ...state,
        rewind: action.payload,
      };
    case REWINDY:
      return {
        ...state,
        rewindyear: action.payload,
      };

    default:
      return state;
  }
};
