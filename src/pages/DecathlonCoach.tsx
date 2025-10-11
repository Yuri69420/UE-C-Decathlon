import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function DecathlonCoach({
  navigate,
}: {
  navigate: (page: any) => void;
}) {
  const [showSplash, setShowSplash] = useState(true);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const slides = [
    {
      img: "/card-1-V2.webp",
      title: "Suivez votre progression",
      desc: "Mesurez vos performances et atteignez vos objectifs.",
    },
    {
      img: "/card-1-V2.webp",
      title: "Trouvez des partenaires",
      desc: "Rejoignez d'autres sportifs près de chez vous.",
    },
    {
      img: "/card-1-V2.webp",
      title: "Participez à des événements",
      desc: "Inscrivez-vous facilement à des activités locales.",
    },
  ];

  const next = () => setIndex((i) => (i + 1 < slides.length ? i + 1 : i));
  const prev = () => setIndex((i) => (i - 1 >= 0 ? i - 1 : i));
  const slide = slides[index];

  return (
    <div className="relative h-full w-full flex flex-col items-center justify-between bg-base-100">
      <AnimatePresence mode="wait">
        {showSplash ? (
          <motion.div
            key="splash"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center h-full w-full bg-[#007ACC]"
          >
            <img
              src="/decathlon-logo.png"
              alt="Decathlon"
              className="w-40 h-30"
            />
          </motion.div>
        ) : (
          <motion.div
            key="onboarding"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-between w-full h-full p-4 text-center"
          >
            {/* Header */}
            <img
              src="/decathlon-logo.png"
              alt="Decathlon"
              className="w-28 mt-2"
            />

            {/* Slide Content */}
            <div className="flex-1 flex items-center justify-center w-full overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-center text-center px-6"
                >
                  <img
                    src={slide.img}
                    alt={slide.title}
                    className="w-64 h-64 object-contain mb-4 rounded-lg"
                  />
                  <h2 className="text-xl font-bold text-primary mb-2">
                    {slide.title}
                  </h2>
                  <p className="text-gray-500">{slide.desc}</p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between w-full px-4 mb-4">
              <button
                className={`btn btn-ghost btn-sm ${
                  index === 0 ? "invisible" : ""
                }`}
                onClick={prev}
              >
                <ChevronLeft size={18} />
              </button>

              <div className="flex gap-2">
                {slides.map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full transition-all ${
                      i === index ? "bg-primary scale-125" : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>

              {index < slides.length - 1 ? (
                <button className="btn btn-ghost btn-sm" onClick={next}>
                  <ChevronRight size={18} />
                </button>
              ) : (
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => navigate("settings")}
                >
                  Continuer
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
