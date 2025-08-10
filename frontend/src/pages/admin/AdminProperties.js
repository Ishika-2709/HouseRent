import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, Eye, Search } from 'lucide-react';
import { toast } from 'react-toastify';
import axios from 'axios';
import './Admin.css';

const AdminProperties = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteModal, setDeleteModal] = useState({ show: false, property: null });

  useEffect(() => {
    fetchProperties();
  }, []);

  useEffect(() => {
    const filtered = properties.filter(property =>
      property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.type.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProperties(filtered);
  }, [searchTerm, properties]);

  const fetchProperties = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/admin/properties', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProperties(response.data);
    } catch (error) {
      console.error('Error fetching properties:', error);
      toast.error('Failed to fetch properties');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (property) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/admin/properties/${property._id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setProperties(properties.filter(p => p._id !== property._id));
      setDeleteModal({ show: false, property: null });
      toast.success('Property deleted successfully');
    } catch (error) {
      console.error('Error deleting property:', error);
      toast.error('Failed to delete property');
    }
  };

  const toggleAvailability = async (property) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `/api/admin/properties/${property._id}`,
        { available: !property.available },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setProperties(properties.map(p => 
        p._id === property._id ? { ...p, available: !p.available } : p
      ));
      
      toast.success(`Property ${property.available ? 'hidden' : 'made available'}`);
    } catch (error) {
      console.error('Error updating property:', error);
      toast.error('Failed to update property');
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading properties...</p>
      </div>
    );
  }

  return (
    <div className="admin-properties">
      <div className="container">
        {/* Header */}
        <div className="admin-header">
          <div>
            <h1>Manage Properties</h1>
            <p>View, edit, and manage all your property listings</p>
          </div>
          <Link to="/admin/add-property" className="btn btn-primary">
            <Plus size={20} />
            Add Property
          </Link>
        </div>

        {/* Search and Stats */}
        <div className="properties-controls">
          <div className="search-box">
            <Search size={20} />
            <input
              type="text"
              placeholder="Search properties..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="properties-stats">
            <span>Total: {properties.length}</span>
            <span>Available: {properties.filter(p => p.available).length}</span>
            <span>Hidden: {properties.filter(p => !p.available).length}</span>
          </div>
        </div>

        {/* Properties Table */}
        {filteredProperties.length === 0 ? (
          <div className="no-properties">
            <h3>No properties found</h3>
            <p>
              {searchTerm 
                ? 'Try adjusting your search terms' 
                : 'Start by adding your first property'
              }
            </p>
            <Link to="/admin/add-property" className="btn btn-primary">
              <Plus size={20} />
              Add Property
            </Link>
          </div>
        ) : (
          <div className="properties-table">
            <div className="table-header">
              <span>Property</span>
              <span>Location</span>
              <span>Price</span>
              <span>Type</span>
              <span>Status</span>
              <span>Actions</span>
            </div>
            
            {filteredProperties.map((property) => (
              <div key={property._id} className="table-row">
                <div className="property-info">
                  <div className="property-image">
                    {property.images && property.images.length > 0 ? (
                      <img 
                        src={`http://localhost:5001/uploads/${property.images[0]}`} 
                        alt={property.title}
                      />
                    ) : (
                      <div className="no-image">No Image</div>
                    )}
                  </div>
                  <div>
                    <h4>{property.title}</h4>
                    <span className="property-beds">{property.bedrooms} beds, {property.bathrooms} baths</span>
                  </div>
                </div>
                
                <span>{property.location}</span>
                <span>₹{property.price.toLocaleString()}</span>
                <span className="property-type">{property.type}</span>
                
                <button
                  className={`status-toggle ${property.available ? 'available' : 'unavailable'}`}
                  onClick={() => toggleAvailability(property)}
                >
                  {property.available ? 'Available' : 'Hidden'}
                </button>
                
                <div className="actions">
                  <Link
                    to={`/property/${property._id}`}
                    className="action-btn view"
                    title="View Property"
                  >
                    <Eye size={16} />
                  </Link>
                  
                  <button
                    className="action-btn edit"
                    title="Edit Property"
                    onClick={() => toast.info('Edit functionality coming soon!')}
                  >
                    <Edit size={16} />
                  </button>
                  
                  <button
                    className="action-btn delete"
                    title="Delete Property"
                    onClick={() => setDeleteModal({ show: true, property })}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Delete Modal */}
        {deleteModal.show && (
          <div className="modal-overlay">
            <div className="modal">
              <h3>Delete Property</h3>
              <p>
                Are you sure you want to delete "{deleteModal.property.title}"? 
                This action cannot be undone.
              </p>
              <div className="modal-actions">
                <button
                  className="btn btn-secondary"
                  onClick={() => setDeleteModal({ show: false, property: null })}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(deleteModal.property)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProperties; 