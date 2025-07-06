import React from 'react';

const topics = [
  {
    title: 'Développement Mobile (React Native)',
    color: 'text-indigo-600',
    items: [
      'JavaScript/TypeScript',
      'React Native (bases, composants, navigation)',
      'Gestion d’état (Redux, Context API, Zustand...)',
      'APIs et requêtes réseau (fetch, axios...)',
      'Gestion des permissions et accès natifs',
      'Déploiement sur iOS et Android',
      'Tests et debug mobile',
    ],
    icon: (
      <svg className="w-10 h-10 mb-4 text-indigo-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h8M12 8v8" />
      </svg>
    ),
  },
  {
    title: 'Développement Web (Next.js)',
    color: 'text-blue-600',
    items: [
      'JavaScript/TypeScript',
      'React (hooks, composants, context)',
      'Next.js (pages, routing, SSR/SSG)',
      'APIs (API Routes, consommation d’API)',
      'Gestion d’état (Redux, Context API...)',
      'Optimisation des performances',
      'Déploiement (Vercel, Netlify...)',
      'Tests (Jest, React Testing Library...)',
    ],
    icon: (
      <svg className="w-10 h-10 mb-4 text-blue-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <rect x="4" y="4" width="16" height="16" rx="4" stroke="currentColor" strokeWidth="2" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h8" />
      </svg>
    ),
  },
  {
    title: 'Bases du Web (HTML, CSS, Tailwind)',
    color: 'text-pink-600',
    items: [
      'HTML5 (structure, sémantique, accessibilité)',
      'CSS3 (sélecteurs, flexbox, grid, animations)',
      'Responsive design',
      'Préprocesseurs CSS (Sass, Less) - optionnel',
      'Frameworks CSS (Bootstrap, Tailwind CSS)',
      'Utilisation de Tailwind pour des interfaces modernes',
      'Bonnes pratiques UI/UX',
    ],
    icon: (
      <svg className="w-10 h-10 mb-4 text-pink-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="2" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18" />
      </svg>
    ),
  },
  {
    title: 'JavaScript',
    color: 'text-yellow-600',
    items: [
      'Syntaxe de base (variables, fonctions, conditions, boucles)',
      'Manipulation du DOM',
      'ES6+ (let/const, arrow functions, classes, modules)',
      'Asynchrone (promises, async/await, fetch)',
      'Gestion des erreurs',
      'Outils de développement (console, debugger)',
      'Bonnes pratiques et patterns courants',
    ],
    icon: (
      <svg className="w-10 h-10 mb-4 text-yellow-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 9h6v6H9z" />
      </svg>
    ),
  },
  {
    title: 'TypeScript',
    color: 'text-blue-400',
    items: [
      'Types de base (string, number, boolean, array, tuple, enum)',
      'Interfaces et types personnalisés',
      'Fonctions typées',
      'Classes et héritage',
      'Génériques',
      'Interopérabilité avec JavaScript',
      'Utilisation avec React et Next.js',
    ],
    icon: (
      <svg className="w-10 h-10 mb-4 text-blue-300" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <rect x="4" y="4" width="16" height="16" rx="4" stroke="currentColor" strokeWidth="2" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 16h8M12 8v8" />
      </svg>
    ),
  },
];

const LearningTopics = () => (
  <section className="py-20 bg-gradient-to-b from-white to-gray-100">
    <h2 className="text-4xl font-extrabold text-center mb-16 text-gray-900 tracking-tight">
      Les matières à apprendre
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
      {topics.map((topic) => (
        <div
          key={topic.title}
          className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-10 flex flex-col items-center border border-gray-100 hover:shadow-apple transition-all duration-300"
        >
          {topic.icon}
          <h3 className={`text-2xl font-semibold mb-6 ${topic.color} text-center`}>{topic.title}</h3>
          <ul className="space-y-4 text-gray-700 text-lg font-light">
            {topic.items.map((item, i) => (
              <li key={i} className="flex items-center gap-3">
                <span className="inline-block w-2 h-2 bg-gray-300 rounded-full" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </section>
);

// Ajoute ce style dans ton globals.css pour l'effet Apple shadow :
// .shadow-apple { box-shadow: 0 8px 32px 0 rgba(60,60,60,0.12), 0 1.5px 4px 0 rgba(60,60,60,0.07); }

export default LearningTopics;