"use client";
import { useAudioPlayerContext } from "@/components/context/AudioPlayerContext";
import { useCallback, useEffect, useRef } from "react";
import { RiReplay10Fill, RiForward10Fill, RiPlayCircleFill, RiPauseCircleFill } from "react-icons/ri";
import styles from "@/styles/Player.module.css";

const Controls = () => {
  const {
    currentTrack,
    audioRef,
    setDuration,
    duration,
    setTimeProgress,
    progressBarRef,
    isPlaying,
    setIsPlaying,
  } = useAudioPlayerContext();

  const playAnimationRef = useRef(null);

  const onLoadedMetadata = useCallback(() => {
    const seconds = audioRef.current?.duration;
    if (seconds === undefined || Number.isNaN(seconds)) return;

    setDuration(seconds);
    if (progressBarRef.current) {
      progressBarRef.current.max = seconds.toString();
    }
  }, [audioRef, progressBarRef, setDuration]);

  useEffect(() => {
    if (audioRef.current && audioRef.current.readyState >= 1) {
      onLoadedMetadata();
    }
  }, [audioRef, onLoadedMetadata]);

  const updateProgress = useCallback(() => {
    if (audioRef.current && progressBarRef.current && duration) {
      const currentTime = audioRef.current.currentTime;
      setTimeProgress(currentTime);
      progressBarRef.current.value = currentTime.toString();
      progressBarRef.current.style.setProperty(
        "--range-progress",
        `${(currentTime / duration) * 100}%`,
      );
    }
  }, [duration, setTimeProgress, audioRef, progressBarRef]);

  const startAnimation = useCallback(() => {
    if (audioRef.current && progressBarRef.current && duration) {
      const animate = () => {
        updateProgress();
        playAnimationRef.current = requestAnimationFrame(animate);
      };
      playAnimationRef.current = requestAnimationFrame(animate);
    }
  }, [audioRef, progressBarRef, duration, updateProgress]);

  useEffect(() => {
    if (isPlaying) {
      // play() rejects if the browser blocks playback or the source fails to load
      audioRef.current?.play()?.catch(() => setIsPlaying(false));
      startAnimation();
    } else {
      audioRef.current?.pause();
      if (playAnimationRef.current !== null) {
        cancelAnimationFrame(playAnimationRef.current);
        playAnimationRef.current = null;
      }
      updateProgress();
    }
    return () => {
      if (playAnimationRef.current !== null) {
        cancelAnimationFrame(playAnimationRef.current);
      }
    };
  }, [isPlaying, startAnimation, updateProgress, audioRef, setIsPlaying]);

  const skipForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime += 10;
      updateProgress();
    }
  };

  const skipBackward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime -= 10;
      updateProgress();
    }
  };

  return (
    <div className={styles.ap_controls}>
      <audio
        src={currentTrack.src}
        ref={audioRef}
        onLoadedMetadata={onLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
      />

      <button onClick={skipBackward}>
        <RiReplay10Fill size={30} />
      </button>

      <button onClick={() => setIsPlaying((prev) => !prev)}>
        {isPlaying ? (
          <RiPauseCircleFill size={50} />
        ) : (
          <RiPlayCircleFill size={50} />
        )}
      </button>

      <button onClick={skipForward}>
        <RiForward10Fill size={30} />
      </button>
    </div>
  );
};

export default Controls;
