import React from "react";
import SlideUpOnView from "@/components/SlideUpOnView";

const topics = [
  {
    title: "Bases de la langue et ecoute de sons",
    color: "text-pink-600",
    items: ["Audios", "PDF", "Video youtube gratuites"],
    icon: (
      <svg
        className="w-10 h-10 mb-4 text-pink-400"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
      >
        <rect
          x="3"
          y="6"
          width="18"
          height="12"
          rx="2"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18" />
      </svg>
    ),
  },
  {
    title: "Parler",
    color: "text-yellow-600",
    items: ["Appels avec formateurs", "Appel 30 min a 1h", "Suite de l'ecoute"],
    icon: (
      <svg
        className="w-10 h-10 mb-4 text-yellow-400"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 9h6v6H9z" />
      </svg>
    ),
  },

  {
    title: "Orientation selon le domaine",
    color: "text-indigo-600",
    items: [
      "audios",
      "Recommandations videos youtubes",
      "PDF",
      "Recommandations de films",
    ],
    icon: (
      <svg
        className="w-10 h-10 mb-4 text-indigo-400"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h8M12 8v8" />
      </svg>
    ),
  },
];

const LearningTopics = () => (
  <section className="py-20 bg-gradient-to-b from-white to-gray-100">
    <h2 className="text-4xl font-extrabold text-center mb-16 text-gray-900 tracking-tight">
      Les matières à apprendre
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-6xl mx-5">
      {topics.map((topic) => (
        <SlideUpOnView key={topic.title}>
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-10 flex flex-col items-center border border-gray-100 hover:shadow-apple transition-all duration-300">
            {topic.icon}
            <h3
              className={`text-2xl font-semibold mb-6 ${topic.color} text-center`}
            >
              {topic.title}
            </h3>
            <ul className="space-y-4 text-gray-700 text-lg font-light">
              {topic.items.map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <span className="inline-block w-2 h-2 bg-gray-300 rounded-full" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </SlideUpOnView>
      ))}
    </div>
  </section>
);

// Ajoute ce style dans ton globals.css pour l'effet Apple shadow :
// .shadow-apple { box-shadow: 0 8px 32px 0 rgba(60,60,60,0.12), 0 1.5px 4px 0 rgba(60,60,60,0.07); }

export default LearningTopics;
