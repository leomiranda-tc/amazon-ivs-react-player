import React, {useEffect, useRef, useCallback} from 'react';
import * as IVSPlayer from 'amazon-ivs-player';


const round = (number, round = 0) => {
  let factor = Math.pow(10, round);
  return Math.round(number*factor) / factor
}

const AmazonIvsReact = ({
  width = 'auto',
  height = 300,
  controls = false,
  url = "",
  playing = false,
  playbackRate = 1,
  muted = false,
  onProgress = (e) => {},
  onDuration = (e) => {},
  onEnded = () => {},
  onReady = () => {},
  player,
}) => {

    const videoEl = useRef(null);

    const durationChanged = useCallback((e) => {
      onDuration(round(e, 4));
    }, [onDuration])

    const timeUpdate = useCallback((e) => {
      let duration = player.getDuration()
      onProgress({played: round(e / duration, 4), playedSeconds: round(e, 4)});
      
      if (player.getState() === "Ended") {
        player.pause();
        onEnded(player);
      }
    },[onEnded, onProgress, player])

    const addListeners = useCallback(() => {
      player.addEventListener(IVSPlayer.PlayerEventType.DURATION_CHANGED, durationChanged)
      player.addEventListener(IVSPlayer.PlayerState.READY, onReady)
      player.addEventListener(IVSPlayer.PlayerEventType.TIME_UPDATE, timeUpdate)
    },[durationChanged, timeUpdate, onReady, player])

    const removeListeners = useCallback(() => {
      player.removeEventListener(IVSPlayer.PlayerEventType.DURATION_CHANGED, durationChanged)
      player.removeEventListener(IVSPlayer.PlayerState.READY, onReady)
      player.removeEventListener(IVSPlayer.PlayerEventType.TIME_UPDATE, timeUpdate)
    },[durationChanged, timeUpdate, onReady, player])


    // effects -----
    useEffect(() => (playing ? player.play() : player.pause()), [playing,player])
    
    useEffect(() => player.setPlaybackRate(playbackRate), [playbackRate,player])
    
    useEffect(() => player.load(url), [url, player])
    
    useEffect(() => {
      addListeners();
      return removeListeners;
    }, [addListeners, removeListeners])
    
    useEffect(() => {
      if (IVSPlayer.isPlayerSupported) {
        player.attachHTMLVideoElement(videoEl.current)
        addListeners();
      }
      return removeListeners
    }, [videoEl, addListeners, removeListeners,player])

    return (
      <video
          height={height}
          width={width}
          controls={controls}
          ref={videoEl}
          muted={muted}
          playsInline
      />
    );
};

export default AmazonIvsReact;
