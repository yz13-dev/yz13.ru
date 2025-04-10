import { useEffect, useRef } from "react";
import { useStreamActions } from "./room-api/streamStore";

export const StreamVideo = ({
  stream,
  userId,
  isLocal = false,
}: {
  stream: MediaStream;
  userId: string;
  isLocal?: boolean;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { toggleAudio, toggleVideo } = useStreamActions();

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.srcObject = stream;
      video.volume = 0.25;
    }
    const audio = audioRef.current;
    if (audio) {
      audio.srcObject = stream;
      audio.volume = 0.25;
    }
  }, [stream]);

  return (
    <div className="relative bg-gray-800 rounded-lg overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted={isLocal} // Локальный поток всегда без звука (чтобы не было эха)
        className="w-full h-auto"
      />
      <audio ref={audioRef} autoPlay playsInline muted={isLocal} />
      {false && (
        <div className="absolute bottom-2 left-2 flex gap-2">
          <button
            onClick={() => toggleAudio(userId)}
            className="p-2 bg-gray-700 rounded-full"
          >
            {stream.getAudioTracks()[0]?.enabled ? "🔈" : "🔇"}
          </button>

          <button
            onClick={() => toggleVideo(userId)}
            className="p-2 bg-gray-700 rounded-full"
          >
            {stream.getVideoTracks()[0]?.enabled ? "📹" : "📷❌"}
          </button>
        </div>
      )}
    </div>
  );
};
