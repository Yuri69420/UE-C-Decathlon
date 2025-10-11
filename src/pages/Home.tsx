import { useState } from "react";
import { ArrowLeft, Users, Heart, X, Flame } from "lucide-react";
import BottomNav from "../components/BottomNav";

export default function Home({
  navigate,
}: {
  navigate: (page: string) => void;
}) {
  const [selectedSport, setSelectedSport] = useState("Tous");

  const sports = ["Tous", "Running", "Football", "Tennis", "Cyclisme", "Yoga"];
  const profiles = [
    {
      name: "Alex",
      sport: "Course à pied",
      location: "Paris",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      name: "Marie",
      sport: "Yoga",
      location: "Lyon",
      image: "https://randomuser.me/api/portraits/women/65.jpg",
    },
    {
      name: "Lucas",
      sport: "Cyclisme",
      location: "Bordeaux",
      image: "https://randomuser.me/api/portraits/men/45.jpg",
    },
    {
      name: "Sarah",
      sport: "Football",
      location: "Marseille",
      image: "https://randomuser.me/api/portraits/women/24.jpg",
    },
  ];

  const filteredProfiles =
    selectedSport === "Tous"
      ? profiles
      : profiles.filter((p) => p.sport.includes(selectedSport));

  return (
    <div className="relative flex flex-col h-full pb-16">
      {/* HEADER */}
      <div className="flex justify-between items-center p-4">
        <button
          onClick={() => navigate("settings")}
          className="btn btn-ghost btn-sm"
        >
          <ArrowLeft size={18} /> Retour
        </button>
        <h2 className="text-lg font-bold text-primary">Décathlon Coach</h2>
        <button
          onClick={() => navigate("events")}
          className="btn btn-ghost btn-sm"
        >
          <Users size={18} />
        </button>
      </div>

      {/* STORIES */}
      <div className="flex overflow-x-auto gap-3 px-4 pb-3">
        {[...profiles, ...profiles].map((user, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="avatar">
              <div className="w-14 rounded-full ring ring-primary ring-offset-2">
                <img src={user.image} alt={user.name} />
              </div>
            </div>
            <p className="text-xs mt-1">{user.name}</p>
          </div>
        ))}
      </div>

      {/* FILTERS */}
      <div className="flex overflow-x-auto gap-2 px-4 mb-4">
        {sports.map((sport) => (
          <button
            key={sport}
            className={`btn btn-xs rounded-full ${
              selectedSport === sport ? "btn-primary text-white" : "btn-outline"
            }`}
            onClick={() => setSelectedSport(sport)}
          >
            {sport}
          </button>
        ))}
      </div>

      {/* PROFILES */}
      <div className="flex-1 flex flex-col items-center justify-center overflow-y-auto px-4">
        {filteredProfiles.map((profile, index) => (
          <div
            key={index}
            className="card w-72 bg-base-100 shadow-xl mb-6 animate-fade-in"
          >
            <figure>
              <img
                src={profile.image}
                alt={profile.name}
                className="object-cover h-64 w-full"
              />
            </figure>
            <div className="card-body text-center">
              <h2 className="card-title">{profile.name}</h2>
              <p className="text-sm text-gray-500">
                {profile.sport} | {profile.location}
              </p>
              <div className="flex justify-center gap-3 mt-3">
                <button className="btn btn-outline btn-error">
                  <X size={20} />
                </button>
                <button className="btn btn-outline btn-success">
                  <Heart size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="bg-primary text-white text-center py-3 px-4">
        <div className="flex justify-center items-center gap-2 mb-2">
          <Flame size={18} />{" "}
          <span className="font-semibold">En forme aujourd’hui !</span>
        </div>
        <p className="text-sm opacity-90">
          Trouvez des partenaires qui partagent votre énergie 💪
        </p>
      </div>

      <BottomNav current="home" navigate={navigate} />
    </div>
  );
}
