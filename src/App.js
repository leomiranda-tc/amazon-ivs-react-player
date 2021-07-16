import AmazonIvsReact from './amazon-ivs-react-player/index';
import {useState, useMemo, useCallback} from 'react';
import * as IVSPlayer from 'amazon-ivs-player';

function App() {

  const [qualities, setQualities] = useState([]);
  const [url] = useState("https://fcc3ddae59ed.us-west-2.playback.live-video.net/api/video/v1/us-west-2.893648527354.channel.xhP3ExfcX8ON.m3u8");

  const player = useMemo(() => IVSPlayer.create({
    wasmWorker: "https://player.live-video.net/1.2.0/amazon-ivs-wasmworker.min.js",
    wasmBinary: "https://player.live-video.net/1.2.0/amazon-ivs-wasmworker.min.wasm",
  }),[]);

  const onReady = useCallback(() => {
    const qualities = player.getQualities()

    if (qualities[0].name !== "unknown") {
      player.setAutoQualityMode(false)
      setQualities(player.getQualities())

      return
    }
    
  }, [player, setQualities]);

  return (
    <div>

      <button onClick={() => console.log(player.getQuality())}>Get my quality now</button>

      {qualities.map((quality, key) => (
        <button key={`quality-${key}`} onClick={() => player.setQuality(quality, false)} >{quality.name}</button>
      ))}

      <AmazonIvsReact
        player={player}
        width="100%"
        height="100%"
        controls={true}
        url={url}
        playing={true}
        onReady={onReady}
      />
    </div>
  );
}

export default App;
