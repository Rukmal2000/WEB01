import React, { useState } from 'react';
import { Truck, Package, Filter, MapPin, Star, Phone, MessageCircle } from 'lucide-react';
import { User, Vehicle } from '../types';
import { vehicles } from '../data/services';

interface UserDashboardProps {
  user: User;
  onVehicleSelect: (vehicle: Vehicle) => void;
}

export const UserDashboard: React.FC<UserDashboardProps> = ({ user, onVehicleSelect }) => {
  const [selectedService, setSelectedService] = useState<'vehicles' | 'materials' | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('');

  const sriLankanDistricts = [
    'Colombo', 'Gampaha', 'Kalutara', 'Kandy', 'Matale', 'Nuwara Eliya',
    'Galle', 'Matara', 'Hambantota', 'Jaffna', 'Kilinochchi', 'Mannar',
    'Vavuniya', 'Mullaitivu', 'Batticaloa', 'Ampara', 'Trincomalee',
    'Kurunegala', 'Puttalam', 'Anuradhapura', 'Polonnaruwa', 'Badulla',
    'Moneragala', 'Ratnapura', 'Kegalle'
  ];

  const vehicleCategories = [
    { id: 'agri', name: 'Agricultural', icon: '🚜' },
    { id: 'constructor', name: 'Construction', icon: '🚛' },
    { id: 'water_supply', name: 'Water Supply', icon: '🚰' }
  ];

  const filteredVehicles = vehicles.filter(vehicle => {
    const categoryMatch = selectedCategory ? 
      (selectedCategory === 'agri' && ['jcb', 'excavator'].includes(vehicle.category)) ||
      (selectedCategory === 'constructor' && ['tipper', 'lorry', 'crane', 'concrete_mixer'].includes(vehicle.category)) ||
      (selectedCategory === 'water_supply' && vehicle.category === 'bowser')
      : true;
    const districtMatch = selectedDistrict ? vehicle.supplier.district === selectedDistrict : true;
    return categoryMatch && districtMatch;
  });

  if (!selectedService) {
    return (
      <div className="min-h-screen bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Welcome, {user.name}!
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              What would you like to find today? Choose from vehicles or materials to get started.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div
              onClick={() => setSelectedService('vehicles')}
              className="group bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-3xl p-10 cursor-pointer hover:shadow-2xl transition-all duration-500 border border-yellow-200 hover:border-yellow-300"
            >
              <div className="text-center">
                <div className="bg-yellow-400 p-6 rounded-2xl mx-auto mb-6 w-24 h-24 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Truck className="text-white w-12 h-12" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">Find Vehicles</h3>
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  Browse and rent heavy vehicles like JCBs, excavators, lorries, and more from verified owners across Sri Lanka.
                </p>
                <div className="bg-white/70 rounded-xl p-4 mb-6">
                  <div className="text-sm text-gray-600 mb-2">Available Categories:</div>
                  <div className="flex justify-center space-x-4">
                    <span className="bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full text-sm">🚜 Agricultural</span>
                    <span className="bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full text-sm">🚛 Construction</span>
                    <span className="bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full text-sm">🚰 Water Supply</span>
                  </div>
                </div>
                <div className="text-yellow-600 font-semibold text-lg">Browse Vehicles →</div>
              </div>
            </div>

            <div
              onClick={() => setSelectedService('materials')}
              className="group bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-10 cursor-pointer hover:shadow-2xl transition-all duration-500 border border-blue-200 hover:border-blue-300"
            >
              <div className="text-center">
                <div className="bg-blue-500 p-6 rounded-2xl mx-auto mb-6 w-24 h-24 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Package className="text-white w-12 h-12" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">Find Materials</h3>
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  Source quality construction materials like sand, soil, bricks, and gravel from verified suppliers.
                </p>
                <div className="bg-white/70 rounded-xl p-4 mb-6">
                  <div className="text-sm text-gray-600 mb-2">Available Materials:</div>
                  <div className="flex justify-center space-x-2 flex-wrap gap-2">
                    <span className="bg-blue-200 text-blue-800 px-2 py-1 rounded-full text-xs">🏖️ Sand</span>
                    <span className="bg-blue-200 text-blue-800 px-2 py-1 rounded-full text-xs">🌱 Soil</span>
                    <span className="bg-blue-200 text-blue-800 px-2 py-1 rounded-full text-xs">🧱 Bricks</span>
                    <span className="bg-blue-200 text-blue-800 px-2 py-1 rounded-full text-xs">🪨 Gravel</span>
                  </div>
                </div>
                <div className="text-blue-600 font-semibold text-lg">Browse Materials →</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (selectedService === 'vehicles') {
    return (
      <div className="min-h-screen bg-gray-50">
        <section className="bg-gradient-to-r from-yellow-400 to-yellow-500 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <button
              onClick={() => setSelectedService(null)}
              className="text-black hover:text-gray-700 mb-6 flex items-center"
            >
              ← Back to Dashboard
            </button>
            <div className="text-center text-black">
              <h1 className="text-5xl font-bold mb-6">Available Vehicles</h1>
              <p className="text-xl max-w-3xl mx-auto">
                Find and rent heavy vehicles from verified owners across Sri Lanka
              </p>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Filters */}
            <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900 flex items-center">
                  <Filter className="w-5 h-5 mr-2" />
                  Filter Vehicles
                </h3>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-500 transition-colors"
                  >
                    <option value="">All Categories</option>
                    {vehicleCategories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.icon} {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">District</label>
                  <select
                    value={selectedDistrict}
                    onChange={(e) => setSelectedDistrict(e.target.value)}
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-500 transition-colors"
                  >
                    <option value="">All Districts</option>
                    {sriLankanDistricts.map((district) => (
                      <option key={district} value={district}>{district}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="mb-6">
              <p className="text-gray-600">
                Showing {filteredVehicles.length} vehicles
                {selectedCategory && ` in ${vehicleCategories.find(c => c.id === selectedCategory)?.name} category`}
                {selectedDistrict && ` in ${selectedDistrict} district`}
              </p>
            </div>

            {/* Vehicle Grid */}
            <div className="grid lg:grid-cols-2 gap-8">
              {filteredVehicles.map((vehicle) => (
                <div
                  key={vehicle.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-yellow-200"
                >
                  <div className="relative">
                    <img
                      src={vehicle.image}
                      alt={vehicle.name}
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium ml-1">{vehicle.supplier.rating}</span>
                      </div>
                    </div>
                    <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-medium ${
                      vehicle.available 
                        ? 'bg-green-500 text-white' 
                        : 'bg-red-500 text-white'
                    }`}>
                      {vehicle.available ? 'Available' : 'Booked'}
                    </div>
                  </div>
                  
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{vehicle.name}</h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">{vehicle.description}</p>

                    <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-gray-900">{vehicle.supplier.name}</span>
                        <span className="text-sm text-gray-500">{vehicle.supplier.totalJobs} jobs</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mr-1" />
                        {vehicle.supplier.location}, {vehicle.supplier.district}
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-xl p-4 mb-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center">
                          <div className="text-xl font-bold text-yellow-600">
                            Rs. {vehicle.pricePerHour.toLocaleString()}
                          </div>
                          <div className="text-sm text-gray-600">per hour</div>
                        </div>
                        <div className="text-center">
                          <div className="text-xl font-bold text-yellow-600">
                            Rs. {vehicle.pricePerDay.toLocaleString()}
                          </div>
                          <div className="text-sm text-gray-600">per day</div>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => onVehicleSelect(vehicle)}
                      className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-black py-3 px-6 rounded-xl hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredVehicles.length === 0 && (
              <div className="text-center py-12">
                <Truck className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">No vehicles found</h3>
                <p className="text-gray-600">
                  Try adjusting your filters to find more vehicles.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    );
  }

  // Materials view (placeholder)
  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => setSelectedService(null)}
          className="text-blue-600 hover:text-blue-700 mb-6 flex items-center"
        >
          ← Back to Dashboard
        </button>
        <div className="text-center">
          <Package className="w-24 h-24 text-blue-500 mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Materials Coming Soon</h1>
          <p className="text-xl text-gray-600">
            Material listings will be available soon. Check back later!
          </p>
        </div>
      </div>
    </div>
  );
};