import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Landing() {
  const featuredItems = [
    { id: 1, title: "Denim Jacket", condition: "Like New" },
    { id: 2, title: "Vintage Dress", condition: "Good" },
    { id: 3, title: "Running Shoes", condition: "Very Good" },
    { id: 4, title: "Hoodie", condition: "Brand New" },
    { id: 5, title: "Cargo Pants", condition: "Fair" },
    { id: 6, title: "Graphic Tee", condition: "Like New" },
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="bg-white w-screen min-h-screen text-gray-800">
      {/* Hero Section */}
      <section className="text-center py-16 px-4 bg-green-50">
        <h1 className="text-4xl sm:text-5xl font-bold text-green-700 mb-4">Welcome to ReWear</h1>
        <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
          A community-driven platform to swap, list, and redeem clothes sustainably.
          Join the movement to reduce textile waste and give clothes a second life.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Link to="/exchange" className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-semibold shadow-md transition">
            Browse Items
          </Link>
          <Link to="/exchange" className="bg-white border border-green-600 text-green-700 px-6 py-3 rounded-full font-semibold shadow-md hover:bg-green-50 transition">
            List an Item
          </Link>
        </div>
      </section>

      {/* Featured Carousel */}
      <section className="py-14 px-6 bg-gray-100 text-center">
        <h2 className="text-2xl font-semibold mb-6">Featured Items</h2>
        <div className="max-w-5xl mx-auto">
          <Slider {...sliderSettings}>
            {featuredItems.map((item) => (
              <div key={item.id} className="px-3">
                <div className="bg-white rounded-lg shadow p-4">
                  <div className="h-40 bg-gray-300 mb-4 rounded" />
                  <h3 className="text-lg font-medium">{item.title}</h3>
                  <p className="text-sm text-gray-500">Condition: {item.condition}</p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>

      {/* Listing Promo Section */}
      <section className="py-16 px-6 bg-white text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-green-700 mb-4">
            Got Clothes You Don't Wear Anymore?
          </h2>
          <p className="text-gray-600 text-lg mb-10">
            Give them a second life! List your unused clothes and help someone find their perfect fit.
            Earn points or swap them with the community — it's easy, sustainable, and fun!
          </p>

          {/* Carousel Preview */}
          <div className="max-w-4xl mx-auto mb-10">
            <Slider {...sliderSettings}>
              {featuredItems.map((item) => (
                <div key={item.id} className="px-3">
                  <div className="bg-white border rounded-lg shadow p-4">
                    <div className="h-40 bg-gray-300 mb-4 rounded"></div>
                    <h3 className="text-lg font-medium">{item.title}</h3>
                    <p className="text-sm text-gray-500">Condition: {item.condition}</p>
                  </div>
                </div>
              ))}
            </Slider>
          </div>

          {/* CTA Button */}
          <Link
            to="/exchange"
            className="inline-block bg-green-600 text-white text-lg font-semibold px-8 py-3 rounded-full shadow-md hover:bg-green-700 transition"
          >
            Explore our wardrobe
          </Link>
        </div>
      </section>

      <section className="py-16 px-6 bg-gray-50 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-green-700 mb-4">
            Want Something New Without Buying New?
          </h2>
          <p className="text-gray-700 text-lg mb-8">
            ReWear lets you swap your old favorites for fresh finds from the community. 
            It's sustainable, smart, and totally hassle-free. Explore now and discover your next favorite outfit!
          </p>
          
          <Link
            to="/exchange"
            className="inline-block bg-green-600 text-white text-lg font-semibold px-8 py-3 rounded-full shadow-md hover:bg-green-700 transition"
          >
            Get Your Item Listed
          </Link>
        </div>
      </section>
      {/* NGO Donation Section */}
      <section className="py-16 px-6 bg-white-50 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-green-700 mb-4">
            Make a Real Difference — Donate with Purpose
          </h2>
          <p className="text-gray-700 text-lg mb-8">
            Not every piece needs a price tag. Some clothes carry warmth, dignity, and second chances. 
            Help underprivileged communities by donating your garments directly to trusted NGOs. 
            Be the reason someone smiles today.
          </p>

          <Link
            to="/exchange"
            className="inline-block bg-green-600 text-white text-lg font-semibold px-8 py-3 rounded-full shadow-md hover:bg-green-700 transition"
          >
            More About NGOs
          </Link>
        </div>
      </section>

    </div>
  );
}
