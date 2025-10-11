import { ArrowLeft, PlusCircle, MapPin, Users } from "lucide-react";
import BottomNav from "../components/BottomNav";

export default function Events({
  navigate,
}: {
  navigate: (page: string) => void;
}) {
  const events = [
    {
      title: "Sortie vélo — Lyon",
      date: "Dimanche 10h",
      distance: "25 km",
      location: "Parc de la Tête d’Or",
      participants: 8,
    },
    {
      title: "Foot à 5 — Nantes",
      date: "Samedi 14h",
      distance: null,
      location: "Stade Marcel-Saupin",
      participants: 10,
    },
    {
      title: "Randonnée — Annecy",
      date: "Lundi 9h",
      distance: "8 km",
      location: "Mont Veyrier",
      participants: 5,
    },
  ];

  return (
    <div className="relative flex flex-col h-full pb-16">
      <div className="p-4 flex-1 overflow-y-auto">
        <button
          onClick={() => navigate("profile")}
          className="btn btn-ghost btn-sm mb-4"
        >
          <ArrowLeft size={18} /> Retour
        </button>

        <h2 className="text-xl font-bold text-primary mb-4">
          Événements à venir
        </h2>

        <ul className="space-y-3 mb-6">
          {events.map((event, i) => (
            <li
              key={i}
              className="card bg-base-100 shadow-sm p-4 hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-lg">{event.title}</h3>
              <p className="text-sm text-gray-500 mb-1">
                {event.date}
                {event.distance ? ` - ${event.distance}` : ""}
              </p>
              <div className="flex items-center text-gray-600 text-sm gap-2 mb-2">
                <MapPin size={14} /> {event.location}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-gray-500 text-sm">
                  <Users size={14} /> {event.participants} participants
                </div>
                <button className="btn btn-outline btn-xs">Rejoindre</button>
              </div>
            </li>
          ))}
        </ul>

        <button className="btn btn-primary w-full gap-2">
          <PlusCircle size={18} /> Créer un événement
        </button>
      </div>

      <BottomNav current="events" navigate={navigate} />
    </div>
  );
}
