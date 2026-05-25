import { siteConfig } from "../data/content";

export default function HeroSection() {
  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source
          src="https://www.karunya.edu/sites/default/files/video/KarunyaWebVideoLQ.mp4"
          type="video/mp4"
        />
      </video>

      {/* Dark base overlay */}
      <div className="absolute inset-0 bg-black/55 z-10" />

      {/* Left-to-right gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent z-10" />

      {/* Content */}
      <div className="relative z-20 flex items-center h-full px-8 md:px-16 lg:px-24">
        <div className="max-w-3xl">

          {/* Heading */}
          <h1 className="font-bold leading-tight text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-5">
            <span className="text-white drop-shadow-lg">Welcome to</span>
            <span className="block text-cream drop-shadow-lg mt-1">
              {siteConfig.name}
            </span>
          </h1>

          {/* Tagline */}
          <p className="text-white/80 text-base md:text-xl leading-relaxed mb-8 max-w-2xl">
            {siteConfig.tagline}. Innovation-driven education, world-class
            infrastructure, and industry-ready learning.
          </p>

          {/* Stats */}
          <div className="flex items-center gap-6 border-l-4 border-maroon pl-5">
            <div>
              <p className="text-2xl md:text-3xl font-bold text-white">92%</p>
              <p className="text-white/60 text-xs md:text-sm">Placement Rate</p>
            </div>
            <div className="w-px h-10 bg-white/20" />
            <div>
              <p className="text-2xl md:text-3xl font-bold text-white">375+</p>
              <p className="text-white/60 text-xs md:text-sm">Recruiters</p>
            </div>
            <div className="w-px h-10 bg-white/20" />
            <div>
              <p className="text-2xl md:text-3xl font-bold text-white">700 Ac</p>
              <p className="text-white/60 text-xs md:text-sm">Smart Campus</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}