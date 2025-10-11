import { useState } from "react";
import { ArrowLeft, Heart, MapPin, Calendar, PlusCircle } from "lucide-react";
import BottomNav from "../components/BottomNav";

export default function Profile({
  navigate,
}: {
  navigate: (page: string) => void;
}) {
  // Example current user data
  const currentUser = {
    name: "Alex",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    sports: ["Running", "Cyclisme"],
  };

  const participatedEvents = [
    {
      title: "Sortie vélo — Lyon",
      date: "Dimanche 10h",
      location: "Parc de la Tête d’Or",
    },
    {
      title: "Foot à 5 — Nantes",
      date: "Samedi 14h",
      location: "Stade Marcel-Saupin",
    },
  ];

  const createdEvents = [
    { title: "Yoga matin — Paris", date: "Lundi 7h", location: "Parc Monceau" },
  ];

  const likedPeople = [
    {
      name: "Marie",
      sport: "Yoga",
      location: "Lyon",
      avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    },
    {
      name: "Lucas",
      sport: "Cyclisme",
      location: "Bordeaux",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    },
  ];

  const [activeTab, setActiveTab] = useState<
    "participated" | "created" | "liked"
  >("participated");

  return (
    <div className="relative flex flex-col h-full pb-16">
      {/* HEADER */}
      <div className="flex items-center justify-between p-4 border-b border-base-200">
        <button
          onClick={() => navigate("home")}
          className="btn btn-ghost btn-sm"
        >
          <ArrowLeft size={18} /> Retour
        </button>
        <h2 className="text-lg font-semibold text-primary">Profil</h2>
        <div className="w-6" /> {/* Spacer */}
      </div>

      {/* USER INFO */}
      <div className="flex flex-col items-center p-4 border-b border-base-200">
        <img
          src={currentUser.avatar}
          alt={currentUser.name}
          className="w-24 h-24 rounded-full mb-2"
        />
        <h3 className="text-xl font-bold">{currentUser.name}</h3>
        <p className="text-sm text-gray-500">
          {currentUser.sports.join(" | ")}
        </p>
      </div>

      {/* TABS */}
      <div className="flex justify-around border-b border-base-200">
        <button
          className={`btn btn-ghost btn-sm flex-1 ${
            activeTab === "participated" ? "btn-primary text-white" : ""
          }`}
          onClick={() => setActiveTab("participated")}
        >
          <Calendar size={16} className="mr-1" /> Participé
        </button>
        <button
          className={`btn btn-ghost btn-sm flex-1 ${
            activeTab === "created" ? "btn-primary text-white" : ""
          }`}
          onClick={() => setActiveTab("created")}
        >
          <PlusCircle size={16} className="mr-1" /> Créé
        </button>
        <button
          className={`btn btn-ghost btn-sm flex-1 ${
            activeTab === "liked" ? "btn-primary text-white" : ""
          }`}
          onClick={() => setActiveTab("liked")}
        >
          <Heart size={16} className="mr-1" /> Aimé
        </button>
      </div>

      {/* CONTENT */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {activeTab === "participated" &&
          participatedEvents.map((event, i) => (
            <div
              key={i}
              className="card bg-base-100 shadow-sm p-4 hover:shadow-md transition-shadow"
            >
              <h4 className="font-semibold text-lg">{event.title}</h4>
              <p className="text-sm text-gray-500">{event.date}</p>
              <div className="flex items-center text-gray-600 text-sm gap-2">
                <MapPin size={14} /> {event.location}
              </div>
            </div>
          ))}

        {activeTab === "created" &&
          createdEvents.map((event, i) => (
            <div
              key={i}
              className="card bg-base-100 shadow-sm p-4 hover:shadow-md transition-shadow"
            >
              <h4 className="font-semibold text-lg">{event.title}</h4>
              <p className="text-sm text-gray-500">{event.date}</p>
              <div className="flex items-center text-gray-600 text-sm gap-2">
                <MapPin size={14} /> {event.location}
              </div>
              <button className="btn btn-outline btn-xs mt-2">Modifier</button>
            </div>
          ))}

        {activeTab === "liked" &&
          likedPeople.map((person, i) => (
            <div
              key={i}
              className="card bg-base-100 shadow-sm p-4 flex items-center gap-4 hover:shadow-md transition-shadow"
            >
              <img
                src={person.avatar}
                alt={person.name}
                className="w-12 h-12 rounded-full"
              />
              <div className="flex-1">
                <h4 className="font-semibold">{person.name}</h4>
                <p className="text-sm text-gray-500">
                  {person.sport} | {person.location}
                </p>
              </div>
            </div>
          ))}
      </div>

      {/* BOTTOM NAV */}
      <BottomNav current="home" navigate={navigate} />
    </div>
  );
}
