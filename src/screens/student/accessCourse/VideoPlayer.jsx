import ReactPlayer from "react-player";
import React, { useState, useRef, useEffect } from "react";
import screenfull from "screenfull";
import styled from "styled-components";

function VideoPlayer({ video }) {
  const playerRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [played, setPlayed] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [muted, setMuted] = useState(false);
  const [speedMenuOpen, setSpeedMenuOpen] = useState(false);
  const [volumeMenuOpen, setVolumeMenuOpen] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);

  useEffect(() => {
    document.documentElement.style.setProperty("--value", `${played * 100}%`);
  }, [played]);

  const handlePlayPause = () => {
    if (videoEnded) {
      setVideoEnded(false); // Đặt lại trạng thái khi bắt đầu chơi lại video
    }
    setPlaying(!playing);
  };

  const handleSpeedChange = (rate) => {
    setPlaybackRate(rate);
    setSpeedMenuOpen(false);
  };

  const handleSeekChange = (e) => {
    setPlayed(parseFloat(e.target.value));
    playerRef.current.seekTo(parseFloat(e.target.value));
  };

  const handleVolumeChange = (e) => {
    setVolume(parseFloat(e.target.value));
  };

  const handleFullscreen = () => {
    screenfull.toggle(playerRef.current.wrapper);
  };

  const handleRewind = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() - 5);
  };

  const handleFastForward = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() + 5);
  };

  const handleProgress = (state) => {
    setPlayed(state.played);
  };

  const handleEnded = () => {
    setVideoEnded(true);
  };

  const formatTime = (seconds) => {
    const date = new Date(seconds * 1000);
    const hh = date.getUTCHours();
    const mm = date.getUTCMinutes();
    const ss = date.getUTCSeconds();
    if (hh) {
      return `${hh}:${mm.toString().padStart(2, "0")}:${ss
        .toString()
        .padStart(2, "0")}`;
    }
    return `${mm}:${ss.toString().padStart(2, "0")}`;
  };

  return (
    <VideoPlayerWrapper>
      <ReactPlayer
        ref={playerRef}
        className="react-player"
        url={video}
        playing={playing}
        playbackRate={playbackRate}
        volume={volume}
        muted={muted}
        onProgress={handleProgress}
        onDuration={(duration) => setDuration(duration)}
        onEnded={handleEnded}
        controls={false}
        width="100%"
        height="100%"
      />
      <div className="controls">
        <button onClick={handlePlayPause}>{playing ? "Pause" : "Play"}</button>
        <button onClick={handleRewind}>Rewind 5s</button>
        <button onClick={handleFastForward}>Forward 5s</button>
        <div className="speed-control">
          <button onClick={() => setSpeedMenuOpen(!speedMenuOpen)}>
            Speed
          </button>
          {speedMenuOpen && (
            <div className="speed-menu">
              <button onClick={() => handleSpeedChange(0.5)}>0.5x</button>
              <button onClick={() => handleSpeedChange(1)}>1x</button>
              <button onClick={() => handleSpeedChange(1.5)}>1.5x</button>
              <button onClick={() => handleSpeedChange(2)}>2x</button>
            </div>
          )}
        </div>
        <input
          type="range"
          min={0}
          max={1}
          step="any"
          value={played}
          onChange={handleSeekChange}
          className="seek-bar"
        />
        <div>
          {formatTime(played * duration)} / {formatTime(duration)}
        </div>
        <button onClick={handleFullscreen}>Fullscreen</button>
        <div className="volume-control">
          <button onClick={() => setVolumeMenuOpen(!volumeMenuOpen)}>
            Volume
          </button>
          {volumeMenuOpen && (
            <div className="volume-menu">
              <input
                type="range"
                min={0}
                max={1}
                step="any"
                value={volume}
                onChange={handleVolumeChange}
              />
              <button onClick={() => setMuted(!muted)}>
                {muted ? "Unmute" : "Mute"}
              </button>
            </div>
          )}
        </div>
      </div>
      {videoEnded && (
        <div className="video-ended-message">
          Bạn đã xem hết video.{" "}
          <button onClick={() => setVideoEnded(false)}>Xem lại</button>
        </div>
      )}
    </VideoPlayerWrapper>
  );
}
const VideoPlayerWrapper = styled.div`
  position: relative;
  padding-top: 56.25%; /* 16:9 Aspect Ratio */
  .react-player {
    position: absolute;
    top: 0;
    left: 0;
  }

  .controls {
    position: absolute;
    bottom: 10px;
    left: 10px;
    display: flex;
    flex-direction: row;
    gap: 10px;
    align-items: center;
    background: rgba(0, 0, 0, 0.5);
    padding: 10px;
    border-radius: 5px;
  }

  .controls button,
  .controls input {
    background: rgba(0, 0, 0, 0.7);
    border: none;
    color: white;
    padding: 5px 10px;
    cursor: pointer;
    border-radius: 5px;
  }

  .controls input[type="range"] {
    -webkit-appearance: none; /* Loại bỏ giao diện mặc định của trình duyệt */
    width: 100px;
    height: 8px; /* Chiều cao của thanh trượt */
    background: linear-gradient(
      to right,
      #2196f3 0%,
      #2196f3 var(--value),
      #ddd var(--value),
      #ddd 100%
    ); /* Gradient cho thanh trượt */
    outline: none;
    border-radius: 5px;
    padding: 0;
    margin: 0;
  }

  .controls input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 16px; /* Chiều rộng của nút trượt */
    height: 16px; /* Chiều cao của nút trượt */
    background: #000; /* Màu của nút trượt */
    cursor: pointer;
    border-radius: 50%;
    margin-top: -4px; /* Để nút trượt căn giữa với thanh trượt */
  }

  .controls input[type="range"]::-moz-range-thumb {
    width: 16px;
    height: 16px;
    background: #000;
    cursor: pointer;
    border-radius: 50%;
  }

  .controls div {
    color: white;
  }

  .speed-control,
  .volume-control {
    position: relative;
  }

  .speed-menu,
  .volume-menu {
    position: absolute;
    bottom: 30px; /* Đổi từ top: 30px sang bottom: 30px để menu đổ phía trên */
    left: 0;
    background: rgba(0, 0, 0, 0.8);
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    padding: 10px;
  }

  .speed-menu button,
  .volume-menu button,
  .volume-menu input {
    background: none;
    border: none;
    color: white;
    padding: 5px 10px;
    cursor: pointer;
    text-align: left;
  }

  .speed-menu button:hover,
  .volume-menu button:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  .video-ended-message {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 20px;
    border-radius: 5px;
    text-align: center;
  }
`;

export default VideoPlayer;
