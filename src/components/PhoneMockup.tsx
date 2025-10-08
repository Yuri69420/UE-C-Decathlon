import React, { useState, type JSX } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Improved Decathlon SportMatch App Mockup
// Uses DaisyUI + TailwindCSS + React + TypeScript
// Simulates multi-page navigation inside a phone mockup

// -----------------------------
// Types
// -----------------------------
type SportProfile = {
  id: string;
  name: string;
  age: number;
  sport: string;
  level: string;
  distanceKm: number;
  avatarColor?: string;
  bio?: string;
};

// -----------------------------
// Sample Data
// -----------------------------
const SAMPLE_PROFILES: SportProfile[] = [
  {
    id: "1",
    name: "Alice",
    age: 27,
    sport: "Running",
    level: "Intermediate",
    distanceKm: 2.1,
    avatarColor: "bg-pink-500",
    bio: "Running partner for weekend long runs.",
  },
  {
    id: "2",
    name: "Karim",
    age: 35,
    sport: "Football",
    level: "Advanced",
    distanceKm: 4.3,
    avatarColor: "bg-green-500",
    bio: "Organizer of local football matches on Sundays.",
  },
  {
    id: "3",
    name: "Sophie",
    age: 22,
    sport: "Yoga",
    level: "Beginner",
    distanceKm: 1.0,
    avatarColor: "bg-violet-500",
    bio: "Yoga and mindfulness lover. Looking for calm sessions.",
  },
];

// -----------------------------
// Components
// -----------------------------

const PhoneFrame: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="relative w-[360px] h-[720px] bg-base-100 rounded-[3rem] shadow-2xl border border-base-300 overflow-hidden">
      {/* Speaker notch */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-1.5 bg-neutral rounded-full z-50" />
      {children}
    </div>
  );
};

const NavBar: React.FC<{
  current: string;
  onNavigate: (page: string) => void;
}> = ({ current, onNavigate }) => {
  const tabs = [
    { id: "explore", label: "Explore" },
    { id: "matches", label: "Matches" },
    { id: "events", label: "Events" },
    { id: "profile", label: "Profile" },
  ];
  return (
    <div className="btm-nav bg-base-200 border-t border-base-300">
      {tabs.map((t) => (
        <button
          key={t.id}
          className={`text-xs ${
            current === t.id ? "active text-primary" : "text-gray-500"
          }`}
          onClick={() => onNavigate(t.id)}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
};

const ProfileCard: React.FC<{
  profile: SportProfile;
  onLike: () => void;
  onSkip: () => void;
}> = ({ profile, onLike, onSkip }) => (
  <motion.div
    key={profile.id}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="card w-full max-w-[300px] bg-base-100 shadow-xl border border-base-300"
  >
    <figure className="h-56 bg-gradient-to-tr from-primary/60 to-secondary/60 flex items-center justify-center">
      <div
        className={`w-24 h-24 rounded-full ${profile.avatarColor} flex items-center justify-center text-white text-3xl font-bold shadow-lg`}
      >
        {profile.name[0]}
      </div>
    </figure>
    <div className="card-body">
      <h2 className="card-title">
        {profile.name}, {profile.age}
      </h2>
      <p className="text-sm opacity-70">
        {profile.sport} • {profile.level} • {profile.distanceKm} km away
      </p>
      <p className="text-sm mt-2">{profile.bio}</p>
      <div className="card-actions justify-around mt-4">
        <button className="btn btn-outline btn-error" onClick={onSkip}>
          ✕
        </button>
        <button className="btn btn-primary" onClick={onLike}>
          ♥
        </button>
      </div>
    </div>
  </motion.div>
);

// -----------------------------
// Pages
// -----------------------------

const ExplorePage: React.FC<{
  profiles: SportProfile[];
  onLike: (id: string) => void;
  onSkip: (id: string) => void;
}> = ({ profiles, onLike, onSkip }) => {
  const top = profiles[0];
  return (
    <div className="flex items-center justify-center h-full">
      <AnimatePresence>
        {top ? (
          <ProfileCard
            key={top.id}
            profile={top}
            onLike={() => onLike(top.id)}
            onSkip={() => onSkip(top.id)}
          />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center text-gray-500"
          >
            <p className="font-medium">No more profiles nearby.</p>
            <p className="text-sm mt-2">Check back later!</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const MatchesPage: React.FC<{ liked: SportProfile[] }> = ({ liked }) => (
  <div className="p-6 space-y-4 overflow-y-auto h-full">
    <h2 className="text-lg font-semibold">Your Matches</h2>
    {liked.length === 0 ? (
      <p className="text-sm text-gray-500">You haven't liked anyone yet.</p>
    ) : (
      liked.map((p) => (
        <div key={p.id} className="flex items-center gap-3 border-b pb-2">
          <div
            className={`w-10 h-10 rounded-full ${p.avatarColor} flex items-center justify-center text-white font-medium`}
          >
            {p.name[0]}
          </div>
          <div>
            <p className="font-medium">{p.name}</p>
            <p className="text-xs text-gray-500">
              {p.sport} • {p.level}
            </p>
          </div>
        </div>
      ))
    )}
  </div>
);

const EventsPage = () => (
  <div className="p-6 h-full overflow-y-auto">
    <h2 className="text-lg font-semibold mb-2">Upcoming Events</h2>
    <ul className="space-y-3">
      <li className="card bg-base-200 p-4">Community Run — Saturday 10 AM</li>
      <li className="card bg-base-200 p-4">Football Meetup — Sunday 3 PM</li>
      <li className="card bg-base-200 p-4">Yoga in the Park — Monday 7 AM</li>
    </ul>
  </div>
);

const ProfilePage = () => (
  <div className="p-6 h-full">
    <h2 className="text-lg font-semibold">My Profile</h2>
    <div className="avatar mt-4">
      <div className="w-20 rounded-full bg-primary text-white flex items-center justify-center text-3xl font-bold">
        D
      </div>
    </div>
    <p className="mt-2 text-sm text-gray-600">Decathlon Sport Enthusiast</p>
    <div className="mt-4">
      <button className="btn btn-primary w-full">Edit Profile</button>
    </div>
  </div>
);

// -----------------------------
// Main App Component
// -----------------------------

export default function DecathlonSportMatchApp(): JSX.Element {
  const [page, setPage] = useState<string>("explore");
  const [profiles, setProfiles] = useState<SportProfile[]>(SAMPLE_PROFILES);
  const [liked, setLiked] = useState<SportProfile[]>([]);

  const handleLike = (id: string) => {
    const p = profiles.find((x) => x.id === id);
    if (p) setLiked((l) => [...l, p]);
    setProfiles((p) => p.filter((x) => x.id !== id));
  };
  const handleSkip = (id: string) =>
    setProfiles((p) => p.filter((x) => x.id !== id));

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-base-200 to-secondary/10 p-6">
      <PhoneFrame>
        <div className="absolute top-0 left-0 right-0 bottom-12">
          <AnimatePresence mode="wait">
            {page === "explore" && (
              <ExplorePage
                key="explore"
                profiles={profiles}
                onLike={handleLike}
                onSkip={handleSkip}
              />
            )}
            {page === "matches" && <MatchesPage key="matches" liked={liked} />}
            {page === "events" && <EventsPage key="events" />}
            {page === "profile" && <ProfilePage key="profile" />}
          </AnimatePresence>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <NavBar current={page} onNavigate={setPage} />
        </div>
      </PhoneFrame>
    </div>
  );
}
