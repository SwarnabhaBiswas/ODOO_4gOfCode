import React, { useState } from 'react';

const items = [
  {
    id: 1,
    title: "Denim Jacket",
    category: "Outerwear",
    type: "Swap",
    price: 0,
    condition: "Like New",
    size: "M",
    location: "Delhi",
    tags: ["winter", "stylish", "blue"],
    image: "",
  },
  {
    id: 2,
    title: "Graphic Tee",
    category: "Topwear",
    type: "Points",
    price: 20,
    condition: "Very Good",
    size: "L",
    location: "Mumbai",
    tags: ["casual", "printed", "cotton"],
    image: "",
  },
  {
    id: 3,
    title: "Cargo Pants",
    category: "Bottomwear",
    type: "Swap",
    price: 0,
    condition: "Good",
    size: "XL",
    location: "Bangalore",
    tags: ["utility", "streetwear"],
    image: "",
  },
];

export default function Listing() {
  const [filters, setFilters] = useState({
    proximity: '',
    category: '',
    type: '',
  });
  const [search, setSearch] = useState('');

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const getConditionColor = (condition) => {
    switch (condition) {
      case 'Like New': return 'bg-emerald-100 text-emerald-800';
      case 'Very Good': return 'bg-blue-100 text-blue-800';
      case 'Good': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredItems = items.filter(item => {
    const proximityMatch = filters.proximity === '' || item.location.toLowerCase().includes(filters.proximity.toLowerCase());
    const categoryMatch = filters.category === '' || item.category === filters.category;
    const typeMatch = filters.type === '' || item.type === filters.type;
    const locationMatch = item.location.toLowerCase().includes(search.toLowerCase());
    const searchMatch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.condition.toLowerCase().includes(search.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase())) ||
      locationMatch;

    return proximityMatch && categoryMatch && typeMatch && searchMatch;
  });

  return (
    <div className="flex w-screen min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Filters Sidebar */}
      <aside className="w-80 bg-white/95 backdrop-blur-sm p-6 border-r border-gray-200 shadow-lg hidden md:block">
        <div className="sticky top-6">
          <div className="flex items-center mb-6">
            <div className="w-3 h-3 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full mr-3"></div>
            <h2 className="text-xl font-bold text-gray-800">Filters</h2>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Proximity</label>
              <input
                type="text"
                name="proximity"
                placeholder="Enter city name"
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 bg-gray/80"
                onChange={handleFilterChange}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
              <select
                name="category"
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 bg-gray/80"
                onChange={handleFilterChange}
              >
                <option value="">All Categories</option>
                <option value="Topwear">Topwear</option>
                <option value="Bottomwear">Bottomwear</option>
                <option value="Outerwear">Outerwear</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Exchange Type</label>
              <select
                name="type"
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 bg-gray/80"
                onChange={handleFilterChange}
              >
                <option value="">All Types</option>
                <option value="Swap">Swap</option>
                <option value="Points">Points</option>
              </select>
            </div>

          </div>
        </div>
      </aside>

      {/* Item Listings */}
      <main className="flex-1 p-6 lg:p-8">
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-2">
                Community Wardrobe
              </h1>
              <p className="text-gray-600 text-lg">Discover sustainable fashion through ReWear</p>
            </div>

            <div className="relative w-full lg:w-96">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search by title, tag, condition or location"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 bg-gray/90 backdrop-blur-sm shadow-sm"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No items found</h3>
            <p className="text-gray-600">Try adjusting your filters to see more results</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <div key={item.id} className="group bg-white/90 backdrop-blur-sm shadow-lg rounded-2xl overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300 border border-gray-200">
                {/* Image Placeholder */}
                <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg className="w-16 h-16 text-gray-300 group-hover:text-emerald-400 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>

                {/* Item Content */}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-emerald-600 transition-colors duration-200">
                    {item.title}
                  </h3>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Condition:</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getConditionColor(item.condition)}`}>
                        {item.condition}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Size:</span>
                      <span className="text-sm font-semibold text-gray-800">{item.size}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Location:</span>
                      <span className="text-sm font-semibold text-gray-800">{item.location}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {item.tags.map(tag => (
                      <span key={tag} className="bg-gradient-to-r from-emerald-100 to-blue-100 text-emerald-700 px-2 py-1 rounded-lg text-xs font-medium border border-emerald-200">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Negotiate Button */}
                  <button className="w-full py-3 rounded-xl font-semibold text-sm bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600 shadow-md hover:shadow-lg transition transform hover:scale-105">
                    Negotiate
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
