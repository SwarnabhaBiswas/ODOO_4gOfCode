import React from 'react';
import { Link } from 'react-router-dom';

export default function NGOs() {
  const ngos = [
    {
      id: 1,
      name: "Goonj",
      location: "New Delhi, India",
      cause: "Disaster Relief & Rural Development",
      description: "Goonj works extensively with urban discard to address basic needs like clothing in rural India.",
      website: "https://goonj.org/",
    },
    {
      id: 2,
      name: "Share At Door Step",
      location: "Bangalore, India",
      cause: "Donation Pickup Service",
      description: "SADS picks up usable items from your doorstep and donates them to NGOs, shelters, and orphanages.",
      website: "https://www.shareatdoorstep.com/",
    },
    {
      id: 3,
      name: "Clothes Box Foundation",
      location: "Pan India",
      cause: "Clothing Distribution",
      description: "Clothes Box provides clean, wearable clothes to those in need through their donation campaigns.",
      website: "https://clothesboxfoundation.org/",
    },
    {
      id: 4,
      name: "Uday Foundation",
      location: "Delhi NCR, India",
      cause: "Medical & Social Support",
      description: "They collect clothes, blankets, and toys for underprivileged patients in hospitals and slum areas.",
      website: "https://www.udayfoundation.org/",
    },
  ];

  return (
    <div className="bg-white w-screen min-h-screen py-12 px-6 text-gray-800">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-yellow-800 mb-4">Donate with Compassion</h1>
        <p className="text-gray-700 text-lg mb-8">
          These NGOs are doing amazing work to uplift communities. You can directly donate your clothes to them and make a real difference in someone's life.
        </p>
        <Link
          to="/dashboard"
          className="inline-block bg-yellow-600 text-white text-lg font-semibold px-8 py-3 rounded-full shadow-md hover:bg-yellow-700 transition mb-12"
        >
          List & Mark Items as Donated
        </Link>

        <div className="grid sm:grid-cols-2 gap-6 text-left">
          {ngos.map((ngo) => (
            <div key={ngo.id} className="bg-yellow-50 p-6 rounded-lg shadow hover:shadow-md transition">
              <h2 className="text-xl font-semibold text-yellow-900 mb-2">{ngo.name}</h2>
              <p className="text-sm text-gray-600 mb-1"><strong>Location:</strong> {ngo.location}</p>
              <p className="text-sm text-gray-600 mb-1"><strong>Cause:</strong> {ngo.cause}</p>
              <p className="text-sm text-gray-700 mb-3">{ngo.description}</p>
              <a
                href={ngo.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-yellow-700 hover:underline font-medium"
              >
                Visit Website →
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
