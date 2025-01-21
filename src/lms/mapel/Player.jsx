import React, { useState, useRef } from "react";
import ReactPlayer from "react-player";

const Player = ({ name, url }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [playedSeconds, setPlayedSeconds] = useState(0);
  const [seekTime, setSeekTime] = useState(10);
  const playerContainerRef = useRef(null);
  const playerRef = useRef(null);

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    return `${hrs > 0 ? `${hrs}:` : ""}${
      hrs > 0 ? String(mins).padStart(2, "0") : mins
    }:${String(secs).padStart(2, "0")}`;
  };

  const handleDuration = (duration) => {
    setDuration(duration);
  };

  const handleProgress = (state) => {
    setPlayedSeconds(state.playedSeconds);
  };

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  const seekTo = (time) => {
    if (playerRef.current) {
      playerRef.current.seekTo(time);
    }
  };

  const enterFullscreen = () => {
    if (playerContainerRef.current.requestFullscreen) {
      playerContainerRef.current.requestFullscreen();
    } else if (playerContainerRef.current.webkitRequestFullscreen) {
      playerContainerRef.current.webkitRequestFullscreen();
    } else if (playerContainerRef.current.mozRequestFullScreen) {
      playerContainerRef.current.mozRequestFullScreen();
    } else if (playerContainerRef.current.msRequestFullscreen) {
      playerContainerRef.current.msRequestFullscreen();
    }
  };

  return (
    <div
      className="modal fade"
      id="video"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              {name}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body d-flex flex-column gap-2">
            <div className="d-flex justify-content-between">
              <p className="text-muted m-0">Durasi: {formatTime(duration)}</p>
              <p className="text-muted m-0">{formatTime(playedSeconds)}</p>
            </div>
            <div
              ref={playerContainerRef}
              style={{
                aspectRatio: "16/9",
                width: "100%",
              }}
            >
              <ReactPlayer
                ref={playerRef}
                playing={isPlaying}
                controls
                url={url}
                width="100%"
                height="100%"
                onDuration={handleDuration}
                onProgress={handleProgress}
                style={{ pointerEvents: "none" }}
              />
            </div>

            <div
              className="progress position-relative"
              onClick={(e) => {
                if (duration) {
                  const rect = e.target.getBoundingClientRect();
                  const offsetX = e.clientX - rect.left;
                  const newTime = (offsetX / rect.width) * duration;
                  seekTo(newTime);
                }
              }}
              style={{ height: "10px", cursor: "pointer" }}
            >
              <div
                className="progress-bar bg-danger"
                role="progressbar"
                style={{ width: `${(playedSeconds / duration) * 100}%` }}
                aria-valuenow={(playedSeconds / duration) * 100}
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>

            <div className="d-flex justify-content-between align-items-center">
              <button
                className="btn btn-outline-primary me-2"
                onClick={() => seekTo(playedSeconds - seekTime)}
              >
                -{seekTime} detik
              </button>

              <select
                className="form-select w-auto"
                value={seekTime}
                onChange={(e) => setSeekTime(Number(e.target.value))}
              >
                <option value={10}>10 detik</option>
                <option value={20}>20 detik</option>
                <option value={50}>50 detik</option>
                <option value={60}>60 detik</option>
              </select>

              <button
                className="btn btn-outline-primary me-2"
                onClick={() => seekTo(playedSeconds + seekTime)}
              >
                +{seekTime} detik
              </button>
            </div>
          </div>
          <div className="modal-footer">
            <button
              onClick={togglePlayPause}
              className="btn btn-primary"
              style={{ pointerEvents: "auto" }}
            >
              {isPlaying ? "Pause" : "Play"}
            </button>
            <button
              onClick={enterFullscreen}
              className="btn btn-secondary"
              style={{ pointerEvents: "auto" }}
            >
              Fullscreen
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={() => setIsPlaying(false)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;
