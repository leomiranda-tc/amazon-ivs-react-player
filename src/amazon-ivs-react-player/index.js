import React, {useEffect, useRef} from 'react';
import * as IVSPlayer from 'amazon-ivs-player';

function AmazonIvsReact({
  width = 'auto',
  height = 300,
  ref = (e) => {},
  controls = false,
  url = "",
  playing = false,
  playbackRate = 1,
  muted = false,
  onProgress = (e) => {},
  onDuration = (e) => {},
  onEnded = (e) => {},
}) {

    let player = null;
    const videoEl = useRef(null);

    useEffect(() => ref(videoEl) ,[videoEl, ref])
    
    useEffect(() => {

        if (!player && IVSPlayer.isPlayerSupported && videoEl) {

            const config = {
              wasmWorker: "https://player.live-video.net/1.2.0/amazon-ivs-wasmworker.min.js",
              wasmBinary: "https://player.live-video.net/1.2.0/amazon-ivs-wasmworker.min.wasm",
            }

            const player = IVSPlayer.create(config);
            player.attachHTMLVideoElement(videoEl.current);

            videoEl.current.playbackRate = playbackRate
            
            if(playing) {
              player.play()
            }

            player.load(url);
            return
        }

    }, [])

    return (
      <video
          height={height}
          width={width}
          controls={controls}
          ref={videoEl}
          muted={muted}
          autoPlay={playing}
          onEnded={e => onEnded(e)}
          onProgress={e => onProgress(e)}
          onDurationChange={e => onDuration(e)}
          playsInline
      />
    );
}

export default AmazonIvsReact;
