export const PLAYPAUSE = "PLAYPAUSE";
export const CHANGETRACK = "CHANGETRACK";
export const CUSTOMTRACK = "CUSTOMTRACK";
export const SONGTRACK = "SONGTRACK";
export const FIREBASEG = "FIREBASEG";
export const KONSOL = "KONSOL"

export const changePlay = (isPlaying) => {
  return { type: PLAYPAUSE, payload: isPlaying };
};

export const changeTrack = (trackKey) => {
  console.log("NEW TRACK")
  return { type: CHANGETRACK, payload: trackKey };
};

export const customTrack = (trackKey) => {
    return { type: CUSTOMTRACK, payload: trackKey };
};

export const songTrack = (trackKey) => {
    return { type: SONGTRACK, payload: trackKey };
};

export const firebaseg = (trackKey) => {
    return { type: FIREBASEG, payload: trackKey };
};

export const konsol = (trackKey) => {
  return { type: KONSOL, payload: trackKey };
};