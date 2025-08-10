import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Bed, Bath, Square } from 'lucide-react';
import axios from 'axios';
import './Home.css';

const Home = () => {
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProperties();
  }, []);

  const fetchFeaturedProperties = async () => {
    try {
      const response = await axios.get('/api/properties?limit=6');
      setFeaturedProperties(response.data.slice(0, 6));
    } catch (error) {
      console.error('Error fetching featured properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/properties?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-bg"></div>
        <div className="container">
          <div className="hero-content">
            <h1>Find Your Perfect Home</h1>
            <p>Discover thousands of rental properties in your desired location</p>
            
            <form onSubmit={handleSearch} className="search-form">
              <div className="search-input-group">
                <Search size={20} />
                <input
                  type="text"
                  placeholder="Search by location, property type, or keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Search Properties
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <h3>1000+</h3>
              <p>Properties Available</p>
            </div>
            <div className="stat-item">
              <h3>500+</h3>
              <p>Happy Customers</p>
            </div>
            <div className="stat-item">
              <h3>50+</h3>
              <p>Cities Covered</p>
            </div>
            <div className="stat-item">
              <h3>24/7</h3>
              <p>Customer Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="featured-properties">
        <div className="container">
          <div className="section-header">
            <h2>Featured Properties</h2>
            <p>Discover our handpicked selection of premium rental properties</p>
          </div>

          {loading ? (
            <div className="loading-container">
              <div className="spinner"></div>
              <p>Loading properties...</p>
            </div>
          ) : (
            <div className="properties-grid">
              {featuredProperties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          )}

          <div className="section-footer">
            <Link to="/properties" className="btn btn-primary">
              View All Properties
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <div className="section-header">
            <h2>Why Choose Us</h2>
            <p>We make finding your perfect rental home easy and stress-free</p>
          </div>

          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-icon">🏠</div>
              <h3>Quality Properties</h3>
              <p>All properties are verified and meet our quality standards</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">💰</div>
              <h3>Best Prices</h3>
              <p>Competitive rental prices with no hidden fees</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">🔒</div>
              <h3>Secure Process</h3>
              <p>Safe and secure rental process with verified landlords</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">📞</div>
              <h3>24/7 Support</h3>
              <p>Round-the-clock customer support for all your needs</p>
            </div>
          </div>
        </div>
      </section>
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

export default Home; 