# Study Sprint Matcher

A web platform for students to create and join short, focused study sessions in real time.

**Author:** Supriya Ashok Kumar Tiwari  
**Course:** CS 5610 Web Development, Fall 2025  
**Institution:** Northeastern University

## Overview

Study Sprint Matcher solves the coordination problem of finding study partners. Students can create "sprints" (timed study sessions) or join existing ones based on subject and availability. No scheduling overhead, just immediate connections.

## Screenshot

![Application Homepage](/frontend/images/homepage.png)

## Core Features

- Sprint creation with subject, duration, and location
- Real-time sprint discovery with search and filtering
- User authentication and session management
- Personal dashboard for created and joined sprints
- Support for both online and in-person sessions
- Database seeded with 1000+ sample sprints

## Tech Stack

**Frontend:** HTML5, CSS3, JavaScript (ES6 Modules), Bootstrap 5  
**Backend:** Node.js, Express.js  
**Database:** MongoDB Atlas  
**Architecture:** RESTful API with client-side rendering

## Project Structure

```
study-sprint-matcher/
├── frontend/
│   ├── index.html
│   ├── sprints.html
│   ├── login.html
│   ├── signup.html
│   ├── css/
│   │   └── main.css
│   └── js/
│       ├── main.js
│       └── auth.js
└── backend/
    ├── server.js
    ├── db.js
    ├── seed.js
    ├── routes/
    │   ├── sprints.js
    │   └── auth.js
    └── .env
```

## API Documentation

### Authentication Endpoints
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - User login

### Sprint Endpoints
- `GET /api/sprints` - Retrieve all sprints (supports query filters)
- `GET /api/sprints/my/:userId` - Get user-specific sprints
- `POST /api/sprints` - Create new sprint
- `POST /api/sprints/:id/join` - Join existing sprint
- `DELETE /api/sprints/:id` - Remove sprint (creator only)

## Database Schema

### Users Collection
```javascript
{
  name: String,
  email: String,
  password: String,  // bcrypt hashed
  createdAt: Date
}
```

### Sprints Collection
```javascript
{
  username: String,
  userId: ObjectId,
  subject: String,
  location: String,  // "online" | "offline"
  locationDetails: String,
  duration: Number,  // minutes
  participants: [ObjectId],
  createdAt: Date
}
```

## Setup Instructions

```bash
# Clone repository
git clone <repository-url>
cd study-sprint-matcher

# Install dependencies
cd backend
npm install

# Configure environment
# Create .env file with: MONGO_URL=<your-mongodb-connection-string>

# Initialize database
node seed.js

# Start development server
npm start
```

Application runs on `http://localhost:3000`

## Deployment

**Live Application:** [Vercel URL]  
**Demo Video:** [Video URL]

## License

MIT License

---

© 2025 Supriya Ashok Kumar Tiwari