# House Rent Website

A modern, full-stack house rental website built with React.js, Node.js, Express, and MongoDB. Features a clean, responsive UI and a comprehensive admin panel for property management.

## 🚀 Features

### User Features
- **Modern Homepage** with hero section, stats, and featured properties
- **Property Listings** with advanced search and filtering
- **Detailed Property Views** with image galleries and complete information
- **User Authentication** with email and password
- **Responsive Design** that works on all devices
- **Clean, Modern UI/UX** with smooth animations and transitions

### Admin Features
- **Admin Dashboard** with statistics and quick actions
- **Property Management** - Add, view, edit, and delete properties
- **Image Upload** - Upload up to 5 images per property
- **Property Status Control** - Show/hide properties
- **Search and Filter** properties in admin panel

### Technical Features
- **JWT Authentication** for secure user sessions
- **Image Upload** with multer for property photos
- **MongoDB Database** with Mongoose ODM
- **RESTful API** with Express.js
- **Responsive Design** with modern CSS
- **Toast Notifications** for user feedback
- **Form Validation** on both client and server

## 🛠️ Technology Stack

**Frontend:**
- React.js 18
- React Router DOM
- Axios for API calls
- Lucide React for icons
- React Toastify for notifications
- Modern CSS with responsive design

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Bcrypt for password hashing
- Multer for file uploads
- CORS for cross-origin requests

## 📋 Prerequisites

Before running this application, make sure you have:

- Node.js (v14 or higher)
- npm or yarn
- MongoDB connection string (provided)

## 🚀 Quick Start

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd house_rent
```

### 2. Install dependencies
```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 3. Environment Setup

The MongoDB connection string is already configured in `backend/config.env`:
```
MONGODB_URI=mongodb+srv://username:ishika02mongo@cluster0.xxxxx.mongodb.net/mydatabase?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_key_here_make_it_strong_for_college_assignment_2024
PORT=5000
NODE_ENV=development
```

### 4. Start the application

From the root directory:
```bash
npm run dev
```

This will start both the backend server (port 5000) and frontend development server (port 3000).

Alternatively, you can start them separately:

**Backend:**
```bash
cd backend
npm run dev
```

**Frontend:**
```bash
cd frontend
npm start
```

### 5. Access the application

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000
- **Admin Panel:** http://localhost:3000/admin

## 👨‍💼 Admin Access

**Admin Credentials:**
- **Email:** admin@123
- **Password:** 12345678

The admin user is automatically created when the server starts.

## 📁 Project Structure

```
house_rent/
├── backend/
│   ├── server.js          # Main server file
│   ├── config.env         # Environment variables
│   ├── uploads/           # Uploaded images
│   └── package.json       # Backend dependencies
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   │   ├── admin/     # Admin panel pages
│   │   │   ├── Home.js    # Homepage
│   │   │   ├── Properties.js
│   │   │   ├── PropertyDetail.js
│   │   │   ├── Login.js
│   │   │   └── Register.js
│   │   ├── App.js         # Main app component
│   │   ├── index.js       # Entry point
│   │   └── index.css      # Global styles
│   └── package.json       # Frontend dependencies
├── package.json           # Root package.json
└── README.md             # This file
```

## 🔗 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Properties (Public)
- `GET /api/properties` - Get all properties with filters
- `GET /api/properties/:id` - Get single property

### Admin (Protected)
- `GET /api/admin/properties` - Get all properties (admin)
- `POST /api/admin/properties` - Add new property
- `PUT /api/admin/properties/:id` - Update property
- `DELETE /api/admin/properties/:id` - Delete property

## 🎨 Features in Detail

### Property Search & Filtering
- Search by location, title, or description
- Filter by property type (apartment, house, villa, studio)
- Filter by price range
- Filter by number of bedrooms
- Filter by location

### Property Management
- Add properties with multiple images
- Rich text descriptions
- Amenities management
- Property status control (available/hidden)
- Comprehensive property details (bedrooms, bathrooms, area, etc.)

### User Experience
- Smooth animations and transitions
- Loading states and error handling
- Toast notifications for user feedback
- Responsive design for all screen sizes
- Modern, clean UI with intuitive navigation

## 🔧 Customization

### Adding New Property Types
Edit the property schema in `backend/server.js`:
```javascript
type: { type: String, required: true, enum: ['apartment', 'house', 'villa', 'studio', 'your-new-type'] }
```

### Styling
The application uses modern CSS with CSS variables for easy theming. Main styles are in:
- `frontend/src/index.css` - Global styles
- `frontend/src/pages/*.css` - Page-specific styles

### Database
The MongoDB connection is already configured. The application will automatically create the necessary collections and indexes.

## 🚀 Deployment

### Backend Deployment
1. Set up environment variables on your hosting platform
2. Ensure MongoDB connection string is accessible
3. Deploy the backend folder

### Frontend Deployment
1. Build the frontend: `npm run build`
2. Deploy the build folder to your static hosting service

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is created for educational purposes as a college assignment.

## 📞 Support

For any questions or issues, please contact the development team.

---

**Note:** This is a complete, production-ready house rental website with modern features and clean code structure. Perfect for college assignments and learning full-stack development! # HouseRent
# HouseRent
# HouseRent
