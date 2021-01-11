import AmazonIvsReact from './amazon-ivs-react-player/index';
import {useEffect, useState, useRef} from 'react';

function App() {

  const [player, setPlayer] = useState();
  const [playing, setPlaying] = useState(true);
  const [rate, setRate] = useState(1);
  const [url, setUrl] = useState("https://fcc3ddae59ed.us-west-2.playback.live-video.net/api/video/v1/us-west-2.893648527354.channel.xhP3ExfcX8ON.m3u8");

  useEffect(()=>{
    console.log(player);
  },[player])

  return (
    <div>

      <button onClick={()=>setPlaying(!playing)}>Play/Pause</button>
      <button onClick={()=>setRate(1.5)}>rate 1.5x</button>
      <button onClick={()=>player.seekTo(0)}>seek To</button>

      <AmazonIvsReact
        width="100%"
        height="100%"
  
        ref={setPlayer}
        controls={true}
  
        url={url}
        playing={playing}
        playbackRate={rate}
  
        onProgress={(e) => console.log("progress", e)}
        onDuration={(e) => console.log("duration", e)}
        onEnded={(player) => player.seekTo(0)}
      />
    </div>
  );
}

export default App;
