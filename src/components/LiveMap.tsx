import React, { useState } from 'react';
import { MapPin, Filter, Search, AlertTriangle, CheckCircle, Clock, Eye } from 'lucide-react';

export default function LiveMap() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedReport, setSelectedReport] = useState<any>(null);

  const mockReports = [
    {
      id: '1',
      title: 'Pothole on Main Street',
      category: 'civic',
      status: 'in-progress',
      priority: 'medium',
      location: { lat: 40.7128, lng: -74.0060, address: '123 Main St, Downtown' },
      reportedAt: '2 hours ago',
      description: 'Large pothole causing traffic issues',
      images: ['https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=400'],
    },
    {
      id: '2',
      title: 'Missing Person: Sarah Johnson',
      category: 'missing-person',
      status: 'scanning',
      priority: 'high',
      location: { lat: 40.7589, lng: -73.9851, address: 'University Area' },
      reportedAt: '4 hours ago',
      description: 'Last seen wearing blue jacket',
      images: ['https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400'],
    },
    {
      id: '3',
      title: 'Flood Warning - River District',
      category: 'disaster',
      status: 'verified',
      priority: 'critical',
      location: { lat: 40.7505, lng: -73.9934, address: 'River District' },
      reportedAt: '6 hours ago',
      description: 'Rising water levels detected',
      images: ['https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=400'],
    },
    {
      id: '4',
      title: 'Broken Street Light',
      category: 'civic',
      status: 'pending',
      priority: 'low',
      location: { lat: 40.7282, lng: -74.0776, address: 'Park Avenue' },
      reportedAt: '8 hours ago',
      description: 'Street light not working since yesterday',
      images: ['https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=400'],
    },
  ];

  const categories = [
    { value: 'all', label: 'All Reports', color: 'bg-gray-500' },
    { value: 'civic', label: 'Civic Issues', color: 'bg-blue-500' },
    { value: 'disaster', label: 'Disasters', color: 'bg-red-500' },
    { value: 'missing-person', label: 'Missing Persons', color: 'bg-purple-500' },
    { value: 'security', label: 'Security', color: 'bg-orange-500' },
  ];

  const filteredReports = selectedCategory === 'all' 
    ? mockReports 
    : mockReports.filter(report => report.category === selectedCategory);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'text-red-600 bg-red-50 border-red-200';
      case 'high': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'in-progress': return <Clock className="w-4 h-4 text-blue-600" />;
      case 'scanning': return <Eye className="w-4 h-4 text-purple-600" />;
      default: return <AlertTriangle className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Live Crisis Map</h1>
        <p className="text-gray-600">Real-time view of reported issues and emergencies in your area</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-24">
            <h2 className="font-semibold text-gray-900 mb-4">Filters</h2>
            
            {/* Search */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search reports..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Categories */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Categories</h3>
              {categories.map(category => (
                <button
                  key={category.value}
                  onClick={() => setSelectedCategory(category.value)}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-colors ${
                    selectedCategory === category.value
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <div className={`w-3 h-3 rounded-full ${category.color}`}></div>
                  <span className="text-sm font-medium">{category.label}</span>
                  <span className="ml-auto text-xs text-gray-500">
                    {category.value === 'all' ? mockReports.length : mockReports.filter(r => r.category === category.value).length}
                  </span>
                </button>
              ))}
            </div>

            {/* Legend */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Status Legend</h3>
              <div className="space-y-2 text-xs">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-3 h-3 text-green-600" />
                  <span>Verified</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-3 h-3 text-blue-600" />
                  <span>In Progress</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Eye className="w-3 h-3 text-purple-600" />
                  <span>AI Scanning</span>
                </div>
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="w-3 h-3 text-gray-600" />
                  <span>Pending</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map and Reports */}
        <div className="lg:col-span-3 space-y-6">
          {/* Map Placeholder */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="h-96 bg-gradient-to-br from-blue-50 to-indigo-100 relative flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Interactive Map</h3>
                <p className="text-gray-600 max-w-md">
                  Real-time map integration with Mapbox/Leaflet would display all reports with interactive markers and clustering.
                </p>
              </div>
              
              {/* Mock Map Markers */}
              <div className="absolute top-20 left-20 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold animate-pulse">
                3
              </div>
              <div className="absolute top-32 right-24 bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                1
              </div>
              <div className="absolute bottom-24 left-32 bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                1
              </div>
            </div>
          </div>

          {/* Reports List */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">
                  Active Reports ({filteredReports.length})
                </h2>
                <button className="flex items-center space-x-2 text-sm text-blue-600 hover:text-blue-700">
                  <Filter className="w-4 h-4" />
                  <span>More Filters</span>
                </button>
              </div>
            </div>

            <div className="divide-y divide-gray-200">
              {filteredReports.map(report => (
                <div
                  key={report.id}
                  className="p-6 hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => setSelectedReport(report)}
                >
                  <div className="flex items-start space-x-4">
                    <img
                      src={report.images[0]}
                      alt={report.title}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-medium text-gray-900 mb-1">{report.title}</h3>
                          <p className="text-sm text-gray-600 mb-2">{report.description}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span className="flex items-center">
                              <MapPin className="w-4 h-4 mr-1" />
                              {report.location.address}
                            </span>
                            <span>{report.reportedAt}</span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end space-y-2">
                          <div className="flex items-center space-x-1">
                            {getStatusIcon(report.status)}
                            <span className="text-xs text-gray-600 capitalize">{report.status}</span>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(report.priority)}`}>
                            {report.priority}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Report Detail Modal */}
      {selectedReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-1">{selectedReport.title}</h2>
                  <p className="text-gray-600">{selectedReport.location.address}</p>
                </div>
                <button
                  onClick={() => setSelectedReport(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
            </div>
            <div className="p-6">
              <img
                src={selectedReport.images[0]}
                alt={selectedReport.title}
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <p className="text-gray-700 mb-4">{selectedReport.description}</p>
              <div className="flex items-center space-x-4 text-sm">
                <span className={`px-3 py-1 rounded-full font-medium border ${getPriorityColor(selectedReport.priority)}`}>
                  {selectedReport.priority} priority
                </span>
                <span className="flex items-center text-gray-600">
                  {getStatusIcon(selectedReport.status)}
                  <span className="ml-1 capitalize">{selectedReport.status}</span>
                </span>
                <span className="text-gray-500">{selectedReport.reportedAt}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}