'use client';

interface VideoPlayerProps {
  videoUrl: string;
}

export default function VideoPlayer({ videoUrl }: VideoPlayerProps) {
  return (
    <div className="w-full aspect-video bg-black rounded-lg overflow-hidden">
      <video controls className="w-full h-full">
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}