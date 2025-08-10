import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, Filter, MapPin, Bed, Bath, Square, X } from 'lucide-react';
import axios from 'axios';
import './Properties.css';

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    type: searchParams.get('type') || 'all',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    bedrooms: searchParams.get('bedrooms') || '',
    location: searchParams.get('location') || ''
  });

  useEffect(() => {
    fetchProperties();
  }, [searchParams]);

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      
      Object.entries(filters).forEach(([key, value]) => {
        if (value && value !== 'all') {
          params.append(key, value);
        }
      });

      const response = await axios.get(`/api/properties?${params.toString()}`);
      setProperties(response.data);
    } catch (error) {
      console.error('Error fetching properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    
    const params = new URLSearchParams();
    Object.entries(newFilters).forEach(([k, v]) => {
      if (v && v !== 'all') {
        params.set(k, v);
      }
    });
    
    setSearchParams(params);
  };

  const clearFilters = () => {
    const clearedFilters = {
      search: '',
      type: 'all',
      minPrice: '',
      maxPrice: '',
      bedrooms: '',
      location: ''
    };
    setFilters(clearedFilters);
    setSearchParams({});
  };

  const handleSearch = (e) => {
    e.preventDefault();
    handleFilterChange('search', filters.search);
  };

  return (
    <div className="properties-page">
      <div className="container">
        {/* Header */}
        <div className="page-header">
          <h1>Find Properties</h1>
          <p>Discover your perfect rental home from our extensive collection</p>
        </div>

        {/* Search and Filters */}
        <div className="search-filters">
          <form onSubmit={handleSearch} className="search-form">
            <div className="search-input-group">
              <Search size={20} />
              <input
                type="text"
                placeholder="Search by location, property type, or keywords..."
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Search
            </button>
          </form>

          <button 
            className="filter-toggle btn btn-secondary"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={20} />
            Filters
            {Object.values(filters).some(v => v && v !== 'all') && (
              <span className="filter-indicator"></span>
            )}
          </button>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="filter-panel">
            <div className="filter-header">
              <h3>Filter Properties</h3>
              <button onClick={() => setShowFilters(false)}>
                <X size={20} />
              </button>
            </div>
            
            <div className="filter-grid">
              <div className="filter-group">
                <label>Property Type</label>
                <select
                  value={filters.type}
                  onChange={(e) => handleFilterChange('type', e.target.value)}
                  className="form-select"
                >
                  <option value="all">All Types</option>
                  <option value="apartment">Apartment</option>
                  <option value="house">House</option>
                  <option value="villa">Villa</option>
                  <option value="studio">Studio</option>
                </select>
              </div>

              <div className="filter-group">
                <label>Bedrooms</label>
                <select
                  value={filters.bedrooms}
                  onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
                  className="form-select"
                >
                  <option value="">Any</option>
                  <option value="1">1 Bedroom</option>
                  <option value="2">2 Bedrooms</option>
                  <option value="3">3 Bedrooms</option>
                  <option value="4">4+ Bedrooms</option>
                </select>
              </div>

              <div className="filter-group">
                <label>Min Price</label>
                <input
                  type="number"
                  placeholder="Min Price"
                  value={filters.minPrice}
                  onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="filter-group">
                <label>Max Price</label>
                <input
                  type="number"
                  placeholder="Max Price"
                  value={filters.maxPrice}
                  onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="filter-group">
                <label>Location</label>
                <input
                  type="text"
                  placeholder="Enter location"
                  value={filters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                  className="form-input"
                />
              </div>
            </div>

            <div className="filter-actions">
              <button onClick={clearFilters} className="btn btn-secondary">
                Clear All
              </button>
              <button onClick={() => setShowFilters(false)} className="btn btn-primary">
                Apply Filters
              </button>
            </div>
          </div>
        )}

        {/* Results */}
        <div className="results-section">
          <div className="results-header">
            <h2>{loading ? 'Loading...' : `${properties.length} Properties Found`}</h2>
          </div>

          {loading ? (
            <div className="loading-container">
              <div className="spinner"></div>
              <p>Loading properties...</p>
            </div>
          ) : properties.length === 0 ? (
            <div className="no-results">
              <h3>No properties found</h3>
              <p>Try adjusting your search criteria or filters</p>
              <button onClick={clearFilters} className="btn btn-primary">
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="properties-grid">
              {properties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const PropertyCard = ({ property }) => {
  const imageUrl = property.images && property.images.length > 0 
    ? `http://localhost:5001/uploads/${property.images[0]}`
    : 'https://via.placeholder.com/400x300?text=No+Image';

  return (
    <Link to={`/property/${property._id}`} className="property-card">
      <div className="property-image">
        <img src={imageUrl} alt={property.title} />
        <div className="property-type">{property.type}</div>
      </div>
      <div className="property-content">
        <h3>{property.title}</h3>
        <div className="property-location">
          <MapPin size={16} />
          <span>{property.location}</span>
        </div>
        <div className="property-features">
          <div className="feature">
            <Bed size={16} />
            <span>{property.bedrooms} Beds</span>
          </div>
          <div className="feature">
            <Bath size={16} />
            <span>{property.bathrooms} Baths</span>
          </div>
          <div className="feature">
            <Square size={16} />
            <span>{property.area} sq ft</span>
          </div>
        </div>
        <div className="property-price">
          ₹{property.price.toLocaleString()}/month
        </div>
      </div>
    </Link>
  );
};

export default Properties; 