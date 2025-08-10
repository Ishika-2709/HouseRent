import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Home, Plus, List, Users, TrendingUp, Calendar } from 'lucide-react';
import axios from 'axios';
import './Admin.css';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalProperties: 0,
    availableProperties: 0,
    totalUsers: 0,
    recentProperties: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const [propertiesResponse] = await Promise.all([
        axios.get('/api/admin/properties', {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);

      const properties = propertiesResponse.data;
      const availableProperties = properties.filter(p => p.available).length;
      const recentProperties = properties.slice(0, 5);

      setStats({
        totalProperties: properties.length,
        availableProperties,
        totalUsers: 0, // This would require a separate endpoint
        recentProperties
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="container">
        {/* Header */}
        <div className="admin-header">
          <div>
            <h1>Admin Dashboard</h1>
            <p>Manage your property listings and monitor performance</p>
          </div>
          <Link to="/admin/add-property" className="btn btn-primary">
            <Plus size={20} />
            Add Property
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">
              <Home size={24} />
            </div>
            <div className="stat-content">
              <h3>{stats.totalProperties}</h3>
              <p>Total Properties</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon available">
              <TrendingUp size={24} />
            </div>
            <div className="stat-content">
              <h3>{stats.availableProperties}</h3>
              <p>Available Properties</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon users">
              <Users size={24} />
            </div>
            <div className="stat-content">
              <h3>{stats.totalUsers}</h3>
              <p>Total Users</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon calendar">
              <Calendar size={24} />
            </div>
            <div className="stat-content">
              <h3>{new Date().toLocaleDateString('en-US', { month: 'short' })}</h3>
              <p>Current Month</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <h2>Quick Actions</h2>
          <div className="actions-grid">
            <Link to="/admin/add-property" className="action-card">
              <Plus size={32} />
              <h3>Add New Property</h3>
              <p>List a new rental property</p>
            </Link>

            <Link to="/admin/properties" className="action-card">
              <List size={32} />
              <h3>Manage Properties</h3>
              <p>View and edit existing properties</p>
            </Link>

            <Link to="/properties" className="action-card">
              <Home size={32} />
              <h3>View Website</h3>
              <p>See how your site looks to users</p>
            </Link>
          </div>
        </div>

        {/* Recent Properties */}
        {stats.recentProperties.length > 0 && (
          <div className="recent-properties">
            <div className="section-header">
              <h2>Recent Properties</h2>
              <Link to="/admin/properties" className="btn btn-secondary">
                View All
              </Link>
            </div>
            
            <div className="properties-table">
              <div className="table-header">
                <span>Property</span>
                <span>Location</span>
                <span>Price</span>
                <span>Status</span>
                <span>Date Added</span>
              </div>
              
              {stats.recentProperties.map((property) => (
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
                      <span className="property-type">{property.type}</span>
                    </div>
                  </div>
                  <span>{property.location}</span>
                  <span>₹{property.price.toLocaleString()}</span>
                  <span className={`status ${property.available ? 'available' : 'unavailable'}`}>
                    {property.available ? 'Available' : 'Unavailable'}
                  </span>
                  <span>{new Date(property.createdAt).toLocaleDateString()}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard; 