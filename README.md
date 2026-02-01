# SkillBridge 🎓

**"Connect with Expert Tutors, Learn Anything"**  

SkillBridge is a full-stack web application that connects learners with expert tutors. Students can browse tutors, view availability, and book sessions instantly. Tutors can manage profiles, set availability, and track sessions. Admins manage users, bookings, and categories.  

---

## Table of Contents

- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Getting Started](#getting-started)  
- [Environment Variables](#environment-variables)  
- [Database Setup](#database-setup)  
- [API Endpoints](#api-endpoints)  
- [Folder Structure](#folder-structure)  
- [Usage](#usage)  
- [License](#license)  

---

## Features

### Public Features
- Browse and search tutors by subject, rating, and price  
- Filter tutors by category  
- View detailed tutor profiles with reviews  
- Landing page with featured tutors  

### Student Features
- Register and login as a student  
- Book tutoring sessions  
- View upcoming and past bookings  
- Leave reviews after sessions  
- Manage profile  

### Tutor Features
- Register and login as a tutor  
- Create and update tutor profile  
- Set availability slots  
- View teaching sessions  
- See ratings and reviews  

### Admin Features
- View all users (students and tutors)  
- Manage user status (ban/unban)  
- View all bookings  
- Manage categories  

---

## Tech Stack

- **Frontend:** React, TailwindCSS / Material UI, React Router  
- **Backend:** Node.js, Express  
- **Database:** PostgreSQL / Prisma ORM  
- **Authentication:** Better Auth (or Firebase Auth)  
- **Deployment:** Vercel / Netlify / Heroku  

---

## Getting Started

1. Clone the repository:  
```bash
git clone https://github.com/yourusername/SkillBridge.git
cd SkillBridge
```

Install dependencies:

npm install


Setup environment variables (see below).

Run the development server:

npm run dev


Run Prisma migrations to setup the database:

npx prisma migrate dev

Environment Variables

Create a .env file at the root:

DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE
APP_URL=http://localhost:3000
PORT=5000


If using Better Auth:

BETTER_AUTH_SECRET=your_secret
BETTER_AUTH_DB_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE

Database Setup

Tables (Prisma models):

Users

TutorProfiles

Categories

TutorCategories (junction table)

TutorAvailability

Bookings

Reviews

Prisma schema is located at prisma/schema.prisma.

API Endpoints
Authentication
| Method | Endpoint             | Description       |
| ------ | -------------------- | ----------------- |
| POST   | `/api/auth/register` | Register new user |
| POST   | `/api/auth/login`    | Login user        |
| GET    | `/api/auth/me`       | Get current user  |

Tutors
| Method | Endpoint          | Description       |
| ------ | ----------------- | ----------------- |
| GET    | `/api/tutors`     | Get all tutors    |
| GET    | `/api/tutors/:id` | Get tutor details |
| GET    | `/api/categories` | List categories   |

Tutor Management
| Method | Endpoint                  | Description          |
| ------ | ------------------------- | -------------------- |
| POST   | `/api/tutor/profile`      | Create tutor profile |
| GET    | `/api/tutor/profile`      | Get own profile      |
| PUT    | `/api/tutor/profile`      | Update profile       |
| PUT    | `/api/tutor/availability` | Update availability  |

Bookings
| Method | Endpoint              | Description               |
| ------ | --------------------- | ------------------------- |
| POST   | `/api/bookings`       | Create new booking        |
| GET    | `/api/bookings`       | Student bookings          |
| GET    | `/api/tutor/bookings` | Tutor bookings            |
| PATCH  | `/api/bookings/:id`   | Cancel / complete booking |

Reviews
| Method | Endpoint       | Description    |
| ------ | -------------- | -------------- |
| POST   | `/api/reviews` | Leave a review |

Admin
| Method | Endpoint                | Description        |
| ------ | ----------------------- | ------------------ |
| GET    | `/api/admin/users`      | List all users     |
| PATCH  | `/api/admin/users/:id`  | Update user status |
| GET    | `/api/admin/bookings`   | List all bookings  |
| GET    | `/api/admin/categories` | Manage categories  |

Folder Structure
/src
  /controllers
  /middlewares
  /routes
  /services
  /lib
/prisma
  schema.prisma
.env
package.json


Usage

Frontend interacts with /api endpoints.

Student selects a tutor → chooses an availability → books session.

Tutor sets availability → manages sessions.

Admin oversees users, bookings, and categories.

License

This project is licensed under MIT License.


---

If you want, I can also **create a version with example JSON requests/responses for every API** so frontend developers can integrate without confusion.  

Do you want me to do that next?
