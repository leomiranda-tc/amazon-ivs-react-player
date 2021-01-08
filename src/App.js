import AmazonIvsReact from './amazon-ivs-react-player/index';

function App() {

  return (
    <AmazonIvsReact
      width="100%"
      height="100%"

      // ref={setRef}
      controls={true}

      url={"https://fcc3ddae59ed.us-west-2.playback.live-video.net/api/video/v1/us-west-2.893648527354.channel.xhP3ExfcX8ON.m3u8"}
      playing={true}
      playbackRate={1}

      // onProgress={(e) => console.log(e)}
      // onDuration={(e) => console.log(e)}
      // onEnded={(e) => console.log(e)}
    />
  );
}

export default App;
