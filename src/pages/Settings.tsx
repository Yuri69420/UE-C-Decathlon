import { useState } from "react";
import { ArrowLeft, CheckCircle } from "lucide-react";
import BottomNav from "../components/BottomNav";

export default function Settings({
  navigate,
}: {
  navigate: (page: unknown) => void;
}) {
  const [sports, setSports] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [language, setLanguage] = useState("Français");

  const sportOptions = [
    "Football",
    "Running",
    "Tennis",
    "Cyclisme",
    "Yoga",
    "Natation",
  ];

  const toggleSport = (sport: string) =>
    setSports((prev) =>
      prev.includes(sport) ? prev.filter((s) => s !== sport) : [...prev, sport]
    );

  const handleContinue = () => {
    navigate("profile");
  };

  return (
    <div className="relative flex flex-col h-full pb-16">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-base-200">
        <button
          onClick={() => navigate("profile")}
          className="btn btn-ghost btn-sm"
        >
          <ArrowLeft size={18} /> Retour
        </button>
        <h2 className="text-lg font-semibold text-primary">Paramètres</h2>
        <div className="w-6" /> {/* Spacer for symmetry */}
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto p-6">
        <h3 className="text-xl font-bold text-primary mb-4">Vos Préférences</h3>

        {/* Name input */}
        <label className="form-control mb-3">
          <span className="label-text font-medium">Votre Nom</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ex: Alex"
            className="input input-bordered"
          />
        </label>

        {/* Language selector */}
        <label className="form-control mb-3">
          <span className="label-text font-medium">Langue</span>
          <select
            className="select select-bordered"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option>Français</option>
            <option>English</option>
          </select>
        </label>

        {/* Sports preference */}
        <p className="mb-2 text-sm font-medium">Vos Sports</p>
        <div className="flex flex-wrap gap-2 mb-6">
          {sportOptions.map((sport) => (
            <button
              key={sport}
              className={`btn btn-sm rounded-full ${
                sports.includes(sport)
                  ? "btn-primary text-white"
                  : "btn-outline"
              }`}
              onClick={() => toggleSport(sport)}
            >
              {sports.includes(sport) && (
                <CheckCircle size={14} className="mr-1" />
              )}
              {sport}
            </button>
          ))}
        </div>

        {/* Save button */}
        <button
          className="btn btn-primary w-full gap-2"
          onClick={handleContinue}
        >
          Enregistrer et continuer
        </button>
      </div>

      {/* Bottom navigation */}
      <BottomNav current="settings" navigate={navigate} />
    </div>
  );
}
