import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Bed, Bath, Square, Calendar, CheckCircle } from 'lucide-react';
import axios from 'axios';
import './PropertyDetail.css';

const PropertyDetail = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    fetchProperty();
  }, [id]);

  const fetchProperty = async () => {
    try {
      const response = await axios.get(`/api/properties/${id}`);
      setProperty(response.data);
    } catch (error) {
      console.error('Error fetching property:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading property details...</p>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="error-container">
        <h2>Property not found</h2>
        <p>The property you're looking for doesn't exist or has been removed.</p>
        <Link to="/properties" className="btn btn-primary">
          Back to Properties
        </Link>
      </div>
    );
  }

  const images = property.images && property.images.length > 0 
    ? property.images.map(img => `http://localhost:5001/uploads/${img}`)
    : ['https://via.placeholder.com/800x600?text=No+Image'];

  return (
    <div className="property-detail">
      <div className="container">
        {/* Back Button */}
        <Link to="/properties" className="back-button">
          <ArrowLeft size={20} />
          Back to Properties
        </Link>

        {/* Property Header */}
        <div className="property-header">
          <div className="property-info">
            <h1>{property.title}</h1>
            <div className="property-location">
              <MapPin size={20} />
              <span>{property.location}</span>
            </div>
            <div className="property-price">
              ₹{property.price.toLocaleString()}/month
            </div>
          </div>
          <div className="property-type-badge">
            {property.type}
          </div>
        </div>

        {/* Image Gallery */}
        <div className="image-gallery">
          <div className="main-image">
            <img src={images[selectedImage]} alt={property.title} />
          </div>
          {images.length > 1 && (
            <div className="image-thumbnails">
              {images.map((image, index) => (
                <button
                  key={index}
                  className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img src={image} alt={`${property.title} ${index + 1}`} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Property Details */}
        <div className="property-details">
          <div className="details-grid">
            {/* Main Details */}
            <div className="main-details">
              <div className="details-section">
                <h2>Property Features</h2>
                <div className="features-grid">
                  <div className="feature-item">
                    <Bed size={24} />
                    <div>
                      <span className="feature-value">{property.bedrooms}</span>
                      <span className="feature-label">Bedrooms</span>
                    </div>
                  </div>
                  <div className="feature-item">
                    <Bath size={24} />
                    <div>
                      <span className="feature-value">{property.bathrooms}</span>
                      <span className="feature-label">Bathrooms</span>
                    </div>
                  </div>
                  <div className="feature-item">
                    <Square size={24} />
                    <div>
                      <span className="feature-value">{property.area}</span>
                      <span className="feature-label">Sq Ft</span>
                    </div>
                  </div>
                  <div className="feature-item">
                    <Calendar size={24} />
                    <div>
                      <span className="feature-value">Available</span>
                      <span className="feature-label">Status</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="details-section">
                <h2>Description</h2>
                <p className="property-description">
                  {property.description}
                </p>
              </div>

              {property.amenities && property.amenities.length > 0 && (
                <div className="details-section">
                  <h2>Amenities</h2>
                  <div className="amenities-grid">
                    {property.amenities.map((amenity, index) => (
                      <div key={index} className="amenity-item">
                        <CheckCircle size={16} />
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Contact Section */}
            <div className="contact-section">
              <div className="contact-card">
                <h3>Interested in this property?</h3>
                <p>Contact us for more information or to schedule a viewing.</p>
                
                <div className="contact-info">
                  <div className="contact-item">
                    <strong>Email:</strong>
                    <span>info@houserent.com</span>
                  </div>
                  <div className="contact-item">
                    <strong>Phone:</strong>
                    <span>+91 98765 43210</span>
                  </div>
                </div>

                <button className="btn btn-primary contact-btn">
                  Contact Now
                </button>
                
                <div className="property-id">
                  Property ID: {property._id.slice(-8).toUpperCase()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail; 