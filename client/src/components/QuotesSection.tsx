import { useState, useEffect } from "react";
import { quotesContent, images } from "../data/content";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";

export default function QuotesSection() {
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);

  // Auto-rotate every 5 seconds with fade effect
  useEffect(() => {
    const timer = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % quotesContent.length);
        setFade(true);
      }, 300);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goTo = (index: number) => {
    setFade(false);
    setTimeout(() => {
      setCurrent(index);
      setFade(true);
    }, 300);
  };

  const prev = () => goTo((current - 1 + quotesContent.length) % quotesContent.length);
  const next = () => goTo((current + 1) % quotesContent.length);

  return (
    <section className="py-16 bg-cream">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="absolute inset-0 rounded-3xl bg-maroon/10 blur-2xl scale-95" />
            <div className="relative overflow-hidden rounded-3xl border-4 border-white shadow-2xl">
              <img
                src={images.chancellor}
                alt="Dr. Paul Dhinakaran"
                className="w-full h-[420px] md:h-[520px] object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
            </div>
          </div>

          <div className="text-center lg:text-left">
            <Quote className="w-10 h-10 text-maroon/30 mx-auto lg:mx-0 mb-6" />

            <div className="relative min-h-[180px] flex items-center justify-center lg:justify-start">
              {/* Quote - fades in/out */}
              <div
                className={`px-10 lg:px-0 transition-opacity duration-300 ${fade ? "opacity-100" : "opacity-0"}`}
              >
                <p className="font-heading text-2xl md:text-3xl text-gray-800 italic leading-relaxed mb-4 max-w-xl">
                  &ldquo;{quotesContent[current].text}&rdquo;
                </p>
                <p className="text-maroon font-semibold">&mdash; {quotesContent[current].author}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}