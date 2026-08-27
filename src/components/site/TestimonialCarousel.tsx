import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Section } from "./Primitives";
import { Star } from "lucide-react";

export const testimonials = [
  {
    name: "Hippo Learn",
    category: "Education service",
    quote: "The rare combination of speed, understanding, and quality sets them apart.",
    body: "Working with Macrow Digital team was fantastic! We loved the storyboard and illustration, which skillfully utilized our brand colors. They closely followed our ideas, resulting in excellent work. We'll definitely collaborate again in the future. Great communication and cooperation throughout!",
    date: "Jun 24, 2025"
  },
  {
    name: "Vertex Tech",
    category: "SaaS Platform",
    quote: "Exceptional clarity and execution from day one.",
    body: "The team helped us navigate a complex digital transformation process with ease. Their strategic insights and technical capabilities are unmatched. We saw an immediate impact on our performance metrics.",
    date: "Aug 12, 2025"
  },
  {
    name: "Aura Retail",
    category: "E-commerce",
    quote: "A true partner in driving measurable growth.",
    body: "We were struggling to scale our acquisition efforts profitably until we partnered with them. Their integrated approach to performance marketing and creative completely changed our trajectory.",
    date: "Nov 03, 2025"
  }
];

export function TestimonialCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [active, setActive] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setActive(emblaApi.selectedScrollSnap());
  }, [emblaApi, setActive]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (!emblaApi) return;
    const interval = setInterval(() => {
      if (emblaApi.canScrollNext()) {
        emblaApi.scrollNext();
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  return (
    <Section className="!bg-[#990a00] !py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div 
          className="relative overflow-hidden bg-[#fbfbfb] rounded-none shadow-2xl cursor-grab active:cursor-grabbing"
          ref={emblaRef}
        >
          <div className="flex touch-pan-y">
            {testimonials.map((t, idx) => (
              <div 
                key={idx}
                className="flex-[0_0_100%] min-w-0 p-8 sm:p-12 md:p-16 flex flex-col min-h-[420px] sm:min-h-[380px]"
              >
                <div>
                  <h4 className="text-[22px] font-serif font-bold text-slate-900">{t.name}</h4>
                  <div className="flex gap-1 mt-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-[14px] h-[14px] fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="mt-2 text-[13px] text-slate-500">{t.category}</p>
                </div>
                
                <div className="w-full h-px bg-slate-300 my-8" />
                
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <p className="font-bold text-[15px] sm:text-[16px] text-slate-900 leading-snug">
                      "{t.quote}"
                    </p>
                    <p className="mt-5 text-[13px] sm:text-[14px] text-slate-600 leading-relaxed">
                      {t.body}
                    </p>
                  </div>
                  <p className="mt-8 text-[12px] sm:text-[13px] text-slate-500 font-medium">
                    {t.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-center gap-2.5 mt-10">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollTo(idx)}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                active === idx ? "bg-white scale-125" : "bg-white/40 hover:bg-white/70"
              }`}
              aria-label={`Go to testimonial ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}
