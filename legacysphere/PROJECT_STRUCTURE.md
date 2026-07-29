# LegacySphere - Complete Project Structure

## 📁 Root Directory Structure

```
legacysphere/
├── 📄 package.json                          # Root package.json (workspace info)
├── 📄 CURRENT_STATUS.md                     # Current project status
├── 📄 QUICK_FIX_SUMMARY.md                  # Quick fixes applied
├── 📄 FIXES_APPLIED.md                      # Detailed fixes documentation
├── 📄 FINAL_FIXES.md                        # Final fixes summary
├── 📄 PROJECT_STRUCTURE.md                  # This file
│
├── 📁 client/                               # Frontend React Application
│   ├── 📄 .gitignore                        # Git ignore file
│   ├── 📄 package.json                      # Frontend dependencies
│   ├── 📄 bun.lock                          # Bun lockfile
│   ├── 📄 eslint.config.js                  # ESLint configuration
│   ├── 📄 index.html                        # HTML entry point
│   ├── 📄 README.md                         # Client README
│   ├── 📄 TESTING_GUIDE.md                  # Comprehensive testing guide
│   ├── 📄 tailwind.config.js                # Tailwind CSS configuration
│   ├── 📄 vite.config.js                    # Vite configuration
│   │
│   ├── 📁 public/                           # Static assets
│   │   ├── 📄 favicon.svg                   # Favicon
│   │   └── 📄 icons.svg                     # Icon sprites
│   │
│   ├── 📁 node_modules/                     # Frontend dependencies (auto-generated)
│   │
│   └── 📁 src/                              # Source code
│       ├── 📄 main.jsx                      # React entry point
│       ├── 📄 App.jsx                       # Main App component with routing
│       ├── 📄 App.css                       # App-specific styles
│       ├── 📄 index.css                     # Global styles (Tailwind imports)
│       │
│       ├── 📁 assets/                       # Images and media
│       │   ├── 📄 hero.png                  # Hero image
│       │   ├── 📄 react.svg                 # React logo
│       │   └── 📄 vite.svg                  # Vite logo
│       │
│       ├── 📁 components/                   # Reusable components
│       │   ├── 📄 Avatar.jsx                # ✅ Avatar component with fallback
│       │   ├── 📄 Button.jsx                # ✅ Button with variants & loading states
│       │   ├── 📄 ProtectedRoute.jsx        # Protected route wrapper
│       │   │
│       │   └── 📁 feed/                     # Feed-specific components
│       │       ├── 📄 CreatePostCard.jsx    # ✅ Create post with media upload
│       │       ├── 📄 PostCard.jsx          # ✅ Display individual posts
│       │       ├── 📄 CommentSection.jsx    # ✅ Comments system
│       │       └── 📄 FeedList.jsx          # ✅ Paginated feed list
│       │
│       ├── 📁 context/                      # React Context providers
│       │   └── 📄 AuthContext.jsx           # ✅ Authentication context & provider
│       │
│       ├── 📁 pages/                        # Page components
│       │   ├── 📄 Splash.jsx                # Splash screen
│       │   ├── 📄 Landing.jsx               # Landing page (marketing)
│       │   ├── 📄 Login.jsx                 # Login page
│       │   ├── 📄 Register.jsx              # Registration page
│       │   ├── 📄 Home.jsx                  # ✅ Main feed page (3-column layout)
│       │   └── 📄 Profile.jsx               # Profile page (scaffolded)
│       │
│       └── 📁 services/                     # API service layer
│           ├── 📄 api.js                    # ✅ Axios instance with interceptors
│           └── 📄 postService.js            # ✅ Post API methods
│
└── 📁 server/                               # Backend Node/Express Application
    ├── 📄 .env                              # ✅ Environment variables (PORT, MONGO_URI, JWT_SECRET)
    ├── 📄 package.json                      # Backend dependencies
    ├── 📄 bun.lock                          # Bun lockfile
    ├── 📄 app.js                            # ✅ Express app configuration
    ├── 📄 server.js                         # ✅ Server entry point with Socket.io
    ├── 📄 POSTMAN_TESTS.md                  # ✅ Postman testing guide
    │
    ├── 📁 node_modules/                     # Backend dependencies (auto-generated)
    │
    ├── 📁 controllers/                      # Route controllers
    │   ├── 📄 authController.js             # ✅ Auth endpoints (register, login, getMe)
    │   └── 📄 postController.js             # ✅ Post CRUD + interactions
    │
    ├── 📁 middleware/                       # Express middleware
    │   ├── 📄 authMiddleware.js             # ✅ JWT verification & user fetch
    │   └── 📄 upload.js                     # ✅ Multer configuration for media
    │
    ├── 📁 models/                           # Mongoose schemas
    │   ├── 📄 User.js                       # ✅ User schema
    │   ├── 📄 Post.js                       # ✅ Post schema with media, likes, comments
    │   └── 📄 Comment.js                    # ✅ Comment schema
    │
    ├── 📁 routes/                           # API routes
    │   ├── 📄 authRoutes.js                 # ✅ Auth routes
    │   └── 📄 postRoutes.js                 # ✅ Post routes
    │
    └── 📁 uploads/                          # ✅ Media file storage (created at runtime)
        └── (uploaded files stored here)
```

---

## 📊 File Count Summary

### Frontend (Client)
```
Total Files: 28
├── Configuration: 6 (package.json, vite.config.js, etc.)
├── Components: 8 (Avatar, Button, Feed components, etc.)
├── Pages: 6 (Home, Login, Register, etc.)
├── Context: 1 (AuthContext)
├── Services: 2 (api.js, postService.js)
├── Documentation: 1 (TESTING_GUIDE.md)
├── Assets: 3 (images)
└── Other: 1 (index.html)
```

### Backend (Server)
```
Total Files: 16
├── Configuration: 3 (.env, package.json, server.js)
├── Controllers: 2 (authController, postController)
├── Middleware: 2 (authMiddleware, upload)
├── Models: 3 (User, Post, Comment)
├── Routes: 2 (authRoutes, postRoutes)
├── Documentation: 1 (POSTMAN_TESTS.md)
└── Entry Points: 2 (app.js, server.js)
```

### Documentation (Root)
```
Total Files: 6
├── CURRENT_STATUS.md
├── QUICK_FIX_SUMMARY.md
├── FIXES_APPLIED.md
├── FINAL_FIXES.md
├── PROJECT_STRUCTURE.md
└── package.json
```

**Grand Total: ~50 files** (excluding node_modules)

---

## 🎯 Key Files by Feature

### Authentication System
```
Backend:
├── server/models/User.js
├── server/controllers/authController.js
├── server/middleware/authMiddleware.js
└── server/routes/authRoutes.js

Frontend:
├── client/src/context/AuthContext.jsx
├── client/src/services/api.js
├── client/src/pages/Login.jsx
├── client/src/pages/Register.jsx
└── client/src/components/ProtectedRoute.jsx
```

### Post System (Feed)
```
Backend:
├── server/models/Post.js
├── server/models/Comment.js
├── server/controllers/postController.js
├── server/middleware/upload.js
└── server/routes/postRoutes.js

Frontend:
├── client/src/services/postService.js
├── client/src/components/feed/CreatePostCard.jsx
├── client/src/components/feed/PostCard.jsx
├── client/src/components/feed/CommentSection.jsx
├── client/src/components/feed/FeedList.jsx
└── client/src/pages/Home.jsx
```

### Shared Components
```
Frontend:
├── client/src/components/Avatar.jsx
└── client/src/components/Button.jsx
```

### Configuration Files
```
Frontend:
├── client/package.json          # Dependencies (React 19, Vite 8, Tailwind 4)
├── client/vite.config.js         # Vite configuration
├── client/tailwind.config.js     # Tailwind setup
└── client/eslint.config.js       # ESLint rules

Backend:
├── server/package.json           # Dependencies (Express 5, Mongoose, Socket.io)
└── server/.env                   # Environment variables
```

---

## 📦 Dependencies

### Frontend Dependencies
```json
{
  "dependencies": {
    "react": "19.2.7",
    "react-dom": "19.2.7",
    "react-router-dom": "7.18.2",
    "axios": "1.18.1",
    "lucide-react": "1.27.0",
    "socket.io-client": "4.8.3"
  },
  "devDependencies": {
    "vite": "8.1.1",
    "tailwindcss": "4.3.3",
    "@vitejs/plugin-react": "5.0.0",
    "eslint": "9.18.0"
  }
}
```

### Backend Dependencies
```json
{
  "dependencies": {
    "express": "5.2.1",
    "mongoose": "9.8.1",
    "bcryptjs": "3.0.3",
    "jsonwebtoken": "9.0.3",
    "cors": "2.8.5",
    "dotenv": "16.4.7",
    "multer": "2.2.0",
    "socket.io": "4.8.3"
  }
}
```

---

## 🗂️ Directory Purpose

### `/client/src/components/`
Reusable UI components that can be used across multiple pages.
- **Avatar.jsx**: User avatar with fallback icon
- **Button.jsx**: Styled button with variants
- **ProtectedRoute.jsx**: Route guard for authenticated routes
- **feed/**: Feed-specific components

### `/client/src/context/`
React Context providers for global state management.
- **AuthContext.jsx**: Authentication state and user info

### `/client/src/pages/`
Top-level page components mapped to routes.
- **Splash.jsx**: Initial loading screen
- **Landing.jsx**: Public marketing page
- **Login.jsx**: User login
- **Register.jsx**: User registration
- **Home.jsx**: Main feed (protected)
- **Profile.jsx**: User profile (protected)

### `/client/src/services/`
API integration layer (Axios-based).
- **api.js**: Configured Axios instance
- **postService.js**: Post-related API calls

### `/server/controllers/`
Business logic for handling requests.
- **authController.js**: Authentication logic
- **postController.js**: Post CRUD and interactions

### `/server/middleware/`
Express middleware functions.
- **authMiddleware.js**: JWT verification
- **upload.js**: File upload handling (Multer)

### `/server/models/`
Mongoose schemas defining data structure.
- **User.js**: User schema
- **Post.js**: Post schema with virtuals
- **Comment.js**: Comment schema

### `/server/routes/`
API route definitions.
- **authRoutes.js**: /api/auth/* routes
- **postRoutes.js**: /api/posts/* routes

### `/server/uploads/`
Storage for uploaded media files (images, videos, documents).
Created automatically when first file is uploaded.

---

## 🚀 Entry Points

### Frontend Entry
```
index.html
  └── src/main.jsx
      └── src/App.jsx
          ├── Context Providers
          │   └── AuthContext
          └── React Router
              ├── /
              ├── /landing
              ├── /login
              ├── /register
              ├── /home (protected)
              └── /profile (protected)
```

### Backend Entry
```
server.js
  └── app.js (Express app)
      ├── Middleware (CORS, JSON parser)
      ├── Routes
      │   ├── /api/auth
      │   └── /api/posts
      └── Static files (/uploads)
  └── Socket.io server
      └── Connection handling
```

---

## 🔧 Configuration Flow

### Frontend Build Process
```
vite.config.js
  ├── React plugin
  ├── Port: 5173
  └── Proxy (if needed)

tailwind.config.js
  ├── Content paths
  ├── Dark mode: 'class'
  └── Theme extensions
```

### Backend Server
```
.env
  ├── PORT=5001
  ├── MONGO_URI=mongodb+srv://...
  └── JWT_SECRET=secret

server.js
  ├── MongoDB connection
  ├── Express app (from app.js)
  ├── Socket.io initialization
  └── Server listen on PORT
```

---

## 📝 Documentation Files

### Root Level
- **CURRENT_STATUS.md**: Overall project status and progress
- **QUICK_FIX_SUMMARY.md**: Quick reference for fixes
- **FIXES_APPLIED.md**: Detailed fix documentation
- **FINAL_FIXES.md**: Most recent fixes
- **PROJECT_STRUCTURE.md**: This file

### Client Level
- **TESTING_GUIDE.md**: Comprehensive testing scenarios

### Server Level
- **POSTMAN_TESTS.md**: API testing guide with examples

---

## 🎨 Design System Files

### Styling
```
client/src/index.css
  └── Tailwind imports
      ├── @import "tailwindcss";
      └── Custom styles

client/tailwind.config.js
  └── Configuration
      ├── Dark mode
      ├── Colors
      └── Breakpoints
```

### Component Styling
- All components use Tailwind CSS classes
- Consistent color scheme:
  - Primary: gray-900 / white
  - Background: gray-50 / gray-950
  - Cards: white / gray-800
  - Borders: gray-200 / gray-700

---

## 🔐 Security Files

### Authentication
```
server/middleware/authMiddleware.js
  ├── JWT verification
  ├── User fetching
  └── Request protection

server/.env (SENSITIVE - NOT IN GIT)
  ├── JWT_SECRET
  ├── MONGO_URI
  └── PORT
```

### .gitignore Entries
```
node_modules/
.env
uploads/
dist/
*.log
```

---

## 📊 Lines of Code Estimate

```
Backend:
├── Models: ~300 lines
├── Controllers: ~600 lines
├── Middleware: ~150 lines
├── Routes: ~100 lines
└── Config: ~100 lines
Total: ~1,250 lines

Frontend:
├── Components: ~1,500 lines
├── Pages: ~1,000 lines
├── Context: ~100 lines
├── Services: ~200 lines
└── Config: ~100 lines
Total: ~2,900 lines

Grand Total: ~4,150 lines of code
```

---

## 🎯 Current Implementation Status

### ✅ Completed (100%)
- User authentication (register, login)
- Post CRUD operations
- Media upload (images, videos, documents)
- Like/unlike functionality
- Comment system (add, delete)
- Pagination
- Responsive design
- Dark mode
- Protected routes
- Error handling

### 🚧 Pending (Phase 3C+)
- Share/repost enhancements
- @mentions in comments
- Notifications system
- Real-time messaging
- User profiles (full)
- Search functionality
- Infinite scroll optimization

---

## 🗄️ Database Collections

### MongoDB Structure
```
legacysphere_db/
├── users
│   ├── _id (ObjectId)
│   ├── fullName
│   ├── email
│   ├── password (hashed)
│   ├── role
│   ├── university
│   ├── department
│   ├── bio
│   ├── avatar
│   └── coverImage
│
├── posts
│   ├── _id (ObjectId)
│   ├── author (ref: User)
│   ├── content
│   ├── media []
│   ├── likes []
│   ├── comments []
│   ├── shares []
│   ├── sharedFrom (ref: Post)
│   ├── visibility
│   ├── createdAt
│   └── updatedAt
│
└── comments
    ├── _id (ObjectId)
    ├── post (ref: Post)
    ├── author (ref: User)
    ├── content
    ├── likes []
    ├── createdAt
    └── updatedAt
```

---

## 🌐 API Endpoints

### Authentication (/api/auth)
```
POST   /register    - Create new user
POST   /login       - Login user
GET    /me          - Get current user (protected)
```

### Posts (/api/posts)
```
POST   /                          - Create post
GET    /                          - Get paginated feed
GET    /:id                       - Get single post
PUT    /:id                       - Update post (owner)
DELETE /:id                       - Delete post (owner)
POST   /:id/like                  - Toggle like
POST   /:id/comment               - Add comment
DELETE /:id/comment/:commentId    - Delete comment (owner)
POST   /:id/share                 - Share post
```

### Static Files
```
GET    /uploads/:filename         - Access uploaded media
```

---

## 📱 Responsive Breakpoints

```
Mobile:    < 768px   (single column)
Tablet:    768-1024px (2 columns)
Desktop:   1024-1280px (3 columns)
Large:     > 1280px (full layout)
```

---

**Total Project Size:** ~50 files, ~4,150 lines of code, 2 major directories (client + server)
**Tech Stack:** React 19, Express 5, MongoDB, Socket.io, Tailwind CSS 4, Vite 8
**Status:** Phase 3B Complete (50% overall progress)
