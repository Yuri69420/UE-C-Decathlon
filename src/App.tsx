import { useState, useEffect } from "react";
import PhoneMockup from "./components/PhoneMockup";
import DecathlonCoach from "./pages/DecathlonCoach";
import Settings from "./pages/Settings";
import Home from "./pages/Home";
import Events from "./pages/Events";
import Profile from "./pages/Profile";

// Optional: Splash screen for a more realistic app start
function SplashScreen({ onFinish }: { onFinish: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onFinish, 2000); // 2s splash
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="flex flex-col items-center justify-center h-full text-primary">
      <img
        src="/decathlon-logo.png" // Make sure this path exists
        alt="Decathlon"
        className="w-32 mb-4 animate-pulse"
      />
      <h1 className="text-2xl font-bold">Décathlon Coach</h1>
      <p className="text-sm text-gray-500 mt-2">Votre compagnon sportif</p>
    </div>
  );
}

export default function App() {
  type Page = "splash" | "coach" | "settings" | "home" | "events" | "profile";

  const [page, setPage] = useState<Page>("splash");

  // Navigation function passed to pages
  const navigate = (to: Page) => setPage(to);

  // Render the content without nesting PhoneMockup multiple times
  const renderPage = () => {
    switch (page) {
      case "splash":
        return <SplashScreen onFinish={() => setPage("coach")} />;
      case "coach":
        return <DecathlonCoach navigate={navigate} />;
      case "settings":
        return <Settings navigate={navigate} />;
      case "home":
        return <Home navigate={navigate} />;
      case "events":
        return <Events navigate={navigate} />;
      case "profile":
        return <Profile navigate={navigate} />;
      default:
        0;
        console.log(page);
        return <div>Page not found</div>;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <PhoneMockup>{renderPage()}</PhoneMockup>
    </div>
  );
}
