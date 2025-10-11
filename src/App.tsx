import { useState, useEffect } from "react";
import PhoneMockup from "./components/PhoneMockup";
import DecathlonCoach from "./pages/DecathlonCoach";
import Settings from "./pages/Settings";
import Home from "./pages/Home";
import Events from "./pages/Events";
import { RotateCcw, ArrowLeft } from "lucide-react"; // icons for refresh + back
import Profile from "./pages/Profile";

// --- Splash screen ---
function SplashScreen({ onFinish }: { onFinish: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onFinish, 2000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="flex flex-col items-center justify-center h-full text-primary">
      <img
        src="/decathlon-logo.png" // ensure this file exists in public/
        alt="Decathlon"
        className="w-32 mb-4 animate-pulse"
      />
      <h1 className="text-2xl font-bold">Décathlon Coach</h1>
      <p className="text-sm text-gray-500 mt-2">Votre compagnon sportif</p>
    </div>
  );
}

// --- Main App ---
export default function App() {
  type Page = "splash" | "coach" | "settings" | "home" | "events" | "profile";

  const [page, setPage] = useState<Page>("splash");
  const [history, setHistory] = useState<Page[]>([]);

  // navigate and save previous page
  const navigate = (to: Page) => {
    setHistory((prev) => [...prev, page]);
    setPage(to);
  };

  const goBack = () => {
    setHistory((prev) => {
      if (prev.length === 0) return prev;
      const last = prev[prev.length - 1];
      setPage(last);
      return prev.slice(0, -1);
    });
  };

  const refreshPage = () => {
    window.location.reload();
  };

  const renderPage = () => {
    switch (page) {
      case "splash":
        return <SplashScreen onFinish={() => setPage("coach")} />;
      case "coach":
        //@ts-expect-error error expected

        return <DecathlonCoach navigate={navigate} />;
      case "settings":
        //@ts-expect-error error expected

        return <Settings navigate={navigate} />;
      case "home":
        //@ts-expect-error error expected
        return <Home navigate={navigate} />;
      case "events":
        //@ts-expect-error error expected

        return <Events navigate={navigate} />;
      case "profile":
        //@ts-expect-error error expected

        return <Profile navigate={navigate} />;
      default:
        return <div>Page not found</div>;
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-base-200">
      {/* --- Control Buttons (outside phone mockup) --- */}
      <div className="absolute top-4 left-4 flex gap-3 z-50">
        <button
          onClick={goBack}
          disabled={history.length === 0}
          className={`btn btn-sm flex items-center gap-1 ${
            history.length === 0 ? "btn-disabled" : "btn-outline"
          }`}
        >
          <ArrowLeft size={16} /> Retour
        </button>

        <button
          onClick={refreshPage}
          className="btn btn-sm btn-outline flex items-center gap-1"
        >
          <RotateCcw size={16} /> Rafraîchir
        </button>
      </div>

      {/* --- Phone Mockup with page --- */}
      <PhoneMockup>{renderPage()}</PhoneMockup>
    </div>
  );
}
