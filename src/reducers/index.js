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
  QUEUE,
  QUEUEVIEW,
  MOBILEFOOTER
} from "../actions/index";
import axios from "axios";
import { aut } from "../dauth";
import { getDatabase, ref, onValue, set } from "firebase/database";
import { useEffect, useState } from "react";
import { GetUID } from "../pages/functions";

let CPLAYLIST = null;
const db = getDatabase(aut);
if (localStorage.getItem("emailduckmusic") != null) {
  const nameRef = ref(db, "users/" + GetUID() + "/duckmusic/playlist");
  onValue(nameRef, (snapshot) => {
    const data = snapshot.val();
    if (CPLAYLIST == null) {
      CPLAYLIST = JSON.parse(data);
    }
  });
}


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
  queue: {
    name: " ",
    data: []
  },
  queueview: false,
  mobilefooter: false
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
            state.queue.data[action.payload[1]].link
          }`,
          album: `${
            state.queue.data[action.payload[1]].album
          }`,
          trackName: `${
            state.queue.data[action.payload[1]].songName
          }`,
          trackImg: `${
            state.queue.data[action.payload[1]].songimg
          }`,
          trackArtist: `${
            state.queue.data[action.payload[1]].songArtist
          }`,
          id: `${
            state.queue.data[action.payload[1]].songID
          }`,
          lyrics: `${
            state.queue.data[action.payload[1]].lyrics
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
    case QUEUE:
      return {
        ...state,
        queue: action.payload,
      };
    case QUEUEVIEW:
      return {
        ...state,
        queueview: action.payload,
      };
    case MOBILEFOOTER:
      return {
        ...state,
        mobilefooter: action.payload,
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
