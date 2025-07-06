"use client";

import React, { Suspense, useState } from 'react';
import Image from 'next/image';

// Navbar Vercel-style responsive avec menu hamburger
const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full bg-white/90 backdrop-blur border-b border-gray-200 fixed top-0 left-0 z-30">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <span className="text-2xl font-black text-black tracking-tight">Ascode</span>
        {/* Desktop menu */}
        <ul className="hidden md:flex gap-8 text-gray-700 font-medium text-base">
          <li>
            <a href="#presentation" className="hover:text-black transition-colors">Présentation</a>
          </li>
          <li>
            <a href="#matieres" className="hover:text-black transition-colors">Matières</a>
          </li>
          <li>
            <a href="#contact" className="hover:text-black transition-colors">Contact</a>
          </li>
        </ul>
        <a
          href="#contact"
          className="hidden md:inline-block bg-black text-white px-5 py-2 rounded-md shadow hover:bg-gray-900 transition-colors font-semibold"
        >
          Contactez-nous
        </a>
        {/* Hamburger */}
        <button
          className="md:hidden flex items-center justify-center w-10 h-10 rounded hover:bg-gray-100 transition"
          onClick={() => setOpen(!open)}
          aria-label="Ouvrir le menu"
        >
          <svg className="w-7 h-7 text-black" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
            )}
          </svg>
        </button>
      </div>
      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white/95 backdrop-blur border-t border-gray-200 shadow">
          <ul className="flex flex-col items-center gap-6 py-6 text-gray-700 font-medium text-base">
            <li>
              <a href="#presentation" className="hover:text-black transition-colors" onClick={() => setOpen(false)}>Présentation</a>
            </li>
            <li>
              <a href="#matieres" className="hover:text-black transition-colors" onClick={() => setOpen(false)}>Matières</a>
            </li>
            <li>
              <a href="#contact" className="hover:text-black transition-colors" onClick={() => setOpen(false)}>Contact</a>
            </li>
            <li>
              <a
                href="#contact"
                className="bg-black text-white px-5 py-2 rounded-md shadow hover:bg-gray-900 transition-colors font-semibold"
                onClick={() => setOpen(false)}
              >
                Contactez-nous
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

// Vercel-style CTA button
const CTAButton = ({ className = "" }: { className?: string }) => (
  <a
    href="#contact"
    className={`inline-block bg-black text-white px-8 py-3 rounded-md shadow font-semibold text-base hover:bg-gray-900 transition-colors ${className}`}
  >
    Contactez-nous
  </a>
);

const Header = () => (
  <header className="bg-gradient-to-br from-white via-gray-50 to-gray-100 pt-32 pb-14 text-black border-b border-gray-200">
    <div className="max-w-4xl mx-auto flex flex-col items-center px-4">
      <div className="bg-white rounded-xl p-8 w-full flex flex-col items-center shadow border border-gray-100">
        <h1 className="text-5xl font-black mb-6 text-center tracking-tight">
          Bienvenue sur notre site d&apos;apprentissage
        </h1>
        <Image
          width={800}
          height={300}
          src="/path/to/your/header-image.jpg"
          alt="Header"
          className="rounded-xl shadow w-full max-w-2xl object-cover h-56 border border-gray-200"
        />
        <div className="mt-8">
          <CTAButton />
        </div>
      </div>
    </div>
  </header>
);

const Presentation = () => (
  <section id="presentation" className="py-20 bg-white border-b border-gray-100">
    <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-12 px-4">
      <div className="flex-1 bg-white rounded-xl p-10 shadow border border-gray-100">
        <h2 className="text-3xl font-black mb-4 text-black tracking-tight">Présentation</h2>
        <p className="text-xl text-gray-700 mb-6 font-light">
          Découvrez les matières à apprendre pour le développement web et mobile.
        </p>
        <CTAButton />
      </div>
      <Image
        width={400}
        height={300}
        src="/path/to/your/presentation-image.jpg"
        alt="Présentation"
        className="rounded-xl shadow w-full max-w-md object-cover h-56 border border-gray-200"
      />
    </div>
  </section>
);

const LearningTopics = React.lazy(() => import('./LearningTopics'));

const ContactSection = () => (
  <section id="contact" className="py-20 bg-gradient-to-b from-gray-50 to-white">
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow p-10 border border-gray-100 text-center">
      <h2 className="text-3xl font-black mb-4 text-black tracking-tight">Contactez-nous</h2>
      <p className="text-lg text-gray-700 mb-8">
        Une question, un projet ou envie d’en savoir plus ? Écrivez-nous, nous vous répondrons rapidement.
      </p>
      <form className="flex flex-col gap-6">
        <input
          type="text"
          placeholder="Votre nom"
          className="px-5 py-3 rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black text-lg"
        />
        <input
          type="email"
          placeholder="Votre email"
          className="px-5 py-3 rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black text-lg"
        />
        <textarea
          placeholder="Votre message"
          className="px-5 py-3 rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black text-lg"
          rows={4}
        />
        <button className="w-full inline-block bg-black text-white px-8 py-3 rounded-md shadow font-semibold text-base hover:bg-gray-900 transition-colors" >Send</button>
      </form>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-white text-gray-700 py-10 mt-20 border-t border-gray-100">
    <div className="max-w-4xl mx-auto text-center text-lg font-light">
      <p>&copy; 2023 Votre Nom. Tous droits réservés.</p>
      <div className="mt-4">
        <CTAButton />
      </div>
    </div>
  </footer>
);

const Page = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <div className="pt-24">
        <Header />
        <Presentation />
        <Suspense fallback={<div className="text-center py-10 text-lg text-gray-500">Chargement des sujets d&apos;apprentissage...</div>}>
          <div id="matieres">
            <LearningTopics />
          </div>
        </Suspense>
        <ContactSection />
        <Footer />
      </div>
    </div>
  );
};

export default Page;