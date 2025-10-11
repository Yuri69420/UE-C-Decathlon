import { Home, Calendar, User, Settings } from "lucide-react";

interface BottomNavProps {
  current: string;
  navigate: (page: string) => void;
}

export default function BottomNav({ current, navigate }: BottomNavProps) {
  const items = [
    { name: "home", icon: <Home size={20} />, label: "Accueil" },
    { name: "events", icon: <Calendar size={20} />, label: "Événements" },
    { name: "profile", icon: <User size={20} />, label: "Profil" },
    { name: "settings", icon: <Settings size={20} />, label: "Réglages" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center py-2 shadow-md">
      {items.map((item) => (
        <button
          key={item.name}
          onClick={() => navigate(item.name)}
          className={`flex flex-col items-center text-xs ${
            current === item.name
              ? "text-primary font-semibold"
              : "text-gray-500"
          }`}
        >
          {item.icon}
          <span className="text-[10px] mt-1">{item.label}</span>
        </button>
      ))}
    </div>
  );
}
