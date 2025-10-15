export default function Hero() {
  return (
    <div className="h-screen w-full border-b border-ui-border-base relative bg-ui-bg-subtle overflow-hidden">
      {/* Video Background */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster="/api/placeholder/1920/1080"
      >
        <source src="/assets/videos/ay_not_dead_1080.mp4" type="video/mp4" />
        <source src="/assets/videos/ay_not_dead_720.mp4" type="video/mp4" />
        <source src="/assets/videos/ay_not_dead_480.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/30 z-5"></div>
    </div>
  )
}
