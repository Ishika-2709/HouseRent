import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, X, Plus } from 'lucide-react';
import { toast } from 'react-toastify';
import axios from 'axios';
import './Admin.css';

const AddProperty = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [amenities, setAmenities] = useState(['']);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
    type: 'apartment'
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + images.length > 5) {
      toast.error('Maximum 5 images allowed');
      return;
    }
    setImages([...images, ...files]);
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleAmenityChange = (index, value) => {
    const newAmenities = [...amenities];
    newAmenities[index] = value;
    setAmenities(newAmenities);
  };

  const addAmenity = () => {
    setAmenities([...amenities, '']);
  };

  const removeAmenity = (index) => {
    setAmenities(amenities.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.title || !formData.description || !formData.price || !formData.location) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (formData.price <= 0) {
      toast.error('Price must be greater than 0');
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const submitData = new FormData();
      
      // Add form data
      Object.keys(formData).forEach(key => {
        submitData.append(key, formData[key]);
      });
      
      // Add images
      images.forEach(image => {
        submitData.append('images', image);
      });
      
      // Add amenities (filter out empty ones)
      const validAmenities = amenities.filter(amenity => amenity.trim() !== '');
      submitData.append('amenities', JSON.stringify(validAmenities));

      await axios.post('/api/admin/properties', submitData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      toast.success('Property added successfully!');
      navigate('/admin/properties');
    } catch (error) {
      console.error('Error adding property:', error);
      toast.error(error.response?.data?.message || 'Failed to add property');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-property">
      <div className="container">
        <div className="admin-header">
          <div>
            <h1>Add New Property</h1>
            <p>Fill in the details to list a new rental property</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="property-form">
          <div className="form-grid">
            {/* Basic Information */}
            <div className="form-section">
              <h2>Basic Information</h2>
              
              <div className="form-group">
                <label className="form-label">Property Title *</label>
                <input
                  type="text"
                  name="title"
                  placeholder="e.g., Modern 2BHK Apartment in Downtown"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Description *</label>
                <textarea
                  name="description"
                  placeholder="Describe the property, its features, and nearby amenities..."
                  value={formData.description}
                  onChange={handleChange}
                  required
                  className="form-textarea"
                  rows="4"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Property Type *</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="apartment">Apartment</option>
                    <option value="house">House</option>
                    <option value="villa">Villa</option>
                    <option value="studio">Studio</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Monthly Rent (₹) *</label>
                  <input
                    type="number"
                    name="price"
                    placeholder="25000"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    min="1"
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Location *</label>
                <input
                  type="text"
                  name="location"
                  placeholder="e.g., Koramangala, Bangalore"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </div>
            </div>

            {/* Property Details */}
            <div className="form-section">
              <h2>Property Details</h2>
              
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Bedrooms *</label>
                  <input
                    type="number"
                    name="bedrooms"
                    placeholder="2"
                    value={formData.bedrooms}
                    onChange={handleChange}
                    required
                    min="0"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Bathrooms *</label>
                  <input
                    type="number"
                    name="bathrooms"
                    placeholder="2"
                    value={formData.bathrooms}
                    onChange={handleChange}
                    required
                    min="1"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Area (sq ft) *</label>
                  <input
                    type="number"
                    name="area"
                    placeholder="1200"
                    value={formData.area}
                    onChange={handleChange}
                    required
                    min="1"
                    className="form-input"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Images */}
          <div className="form-section">
            <h2>Property Images</h2>
            <p className="form-help">Upload up to 5 images of the property</p>
            
            <div className="image-upload">
              <input
                type="file"
                id="images"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="file-input"
              />
              <label htmlFor="images" className="file-label">
                <Upload size={24} />
                <span>Choose Images</span>
              </label>
            </div>

            {images.length > 0 && (
              <div className="image-preview">
                {images.map((image, index) => (
                  <div key={index} className="image-item">
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Property ${index + 1}`}
                    />
                    <button
                      type="button"
                      className="remove-image"
                      onClick={() => removeImage(index)}
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Amenities */}
          <div className="form-section">
            <h2>Amenities</h2>
            <p className="form-help">List the amenities available in this property</p>
            
            <div className="amenities-list">
              {amenities.map((amenity, index) => (
                <div key={index} className="amenity-input">
                  <input
                    type="text"
                    placeholder="e.g., Swimming Pool, Gym, Parking"
                    value={amenity}
                    onChange={(e) => handleAmenityChange(index, e.target.value)}
                    className="form-input"
                  />
                  {amenities.length > 1 && (
                    <button
                      type="button"
                      className="remove-amenity"
                      onClick={() => removeAmenity(index)}
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>
            
            <button
              type="button"
              className="btn btn-secondary"
              onClick={addAmenity}
            >
              <Plus size={16} />
              Add Amenity
            </button>
          </div>

          {/* Submit */}
          <div className="form-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate('/admin/properties')}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
            >
              {loading ? <div className="spinner"></div> : 'Add Property'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProperty; 