import { aboutContent, images } from "../data/content";

export default function AboutSection() {
  return (
    <section id="about" className="py-24 bg-cream overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          
          {/* LEFT SIDE IMAGES */}
          <div className="relative">
            {/* Main Image */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={images.campus1}
                alt="Karunya Campus"
                className="w-full h-[450px] object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

              {/* Bottom Text */}
              <div className="absolute bottom-6 left-6 border-l-4 border-maroon pl-4">
                <h3 className="text-white text-xl font-bold">
                  Karunya Main Campus
                </h3>

                <p className="text-white/70 text-sm mt-1">
                  Coimbatore, Tamil Nadu
                </p>
              </div>
            </div>

            {/* Small Floating Image */}
            <div className="absolute -bottom-8 -right-6 w-44 h-44 rounded-2xl overflow-hidden shadow-2xl border-4 border-white hidden md:block">
              <img
                src={images.tech1}
                alt="Research Lab"
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-black/20" />
            </div>

            {/* Decorative Box */}
            <div className="absolute -top-5 -left-5 w-28 h-28 bg-maroon-light rounded-2xl -z-10 hidden md:block opacity-80" />
          </div>

          {/* RIGHT CONTENT */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/80 border border-maroon/15 px-4 py-2 rounded-full mb-6 shadow-sm backdrop-blur">
              <span className="w-2 h-2 bg-maroon rounded-full"></span>

              <span className="text-maroon text-sm font-semibold tracking-wide uppercase">
                {aboutContent.subtitle}
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-6">
              {aboutContent.title}
            </h2>

            {/* Description */}
            <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-10">
              {aboutContent.description}
            </p>

            {/* Highlights */}
            <div className="grid grid-cols-2 gap-6 border-l-4 border-maroon pl-6">
              {aboutContent.highlights.map((item) => (
                <div key={item.label}>
                  <h3 className="text-2xl md:text-3xl font-bold text-slate-900">
                    {item.value}
                  </h3>

                  <p className="text-gray-500 text-sm mt-1">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Button */}
            <a
              href="https://www.karunya.edu/about-us"
              target="_blank"
              rel="noreferrer noopener"
              className="inline-block mt-10 bg-maroon hover:bg-maroon-dark text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:scale-105"
            >
              Know More About Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}