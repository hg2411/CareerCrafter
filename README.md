# CareerCrafter 🚀

## Overview

CareerCrafter is a full-stack MERN-based job portal platform designed to connect students/job seekers with recruiters and companies. The platform provides features like job posting, job applications, resume uploads, real-time recruiter-student chat, notifications, authentication, application tracking, and much more.

This project focuses on providing a smooth and modern hiring experience with secure authentication, real-time communication, and responsive UI.

---

# ✨ Features

## 👨‍🎓 Student Features

* User Registration & Login
* Secure Authentication using JWT
* Browse and Search Jobs
* Apply for Jobs
* Upload Resume
* Resume Parsing Support
* Save Jobs for Later
* Track Application Status
* Real-time Notifications
* Recruiter Chat Support
* Dark Mode Support
* Responsive UI

## 🏢 Recruiter Features

* Recruiter Authentication
* Company Registration & Management
* Post New Jobs
* View Applicants
* Shortlist/Select Students
* View Uploaded Resumes
* Real-time Chat with Students
* Dashboard Management

## 🔐 Authentication & Security

* JWT Authentication
* Protected Routes
* Google OAuth Authentication
* Password Reset using OTP
* Secure API Handling
* Cookie-based Session Handling

## 💬 Real-Time Features

* Socket.IO based Recruiter-Student Chat
* Instant Messaging
* Notification System

---

# 🛠️ Tech Stack

## Frontend

* React.js
* Vite
* Redux Toolkit
* React Router DOM
* Tailwind CSS
* Framer Motion
* Axios
* Socket.IO Client
* Radix UI
* React Toastify

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Socket.IO
* Multer
* Cloudinary
* Nodemailer
* Passport.js
* Google OAuth

---

# 📂 Project Structure

```bash
CareerCrafter/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── redux/
│   │   ├── hooks/
│   │   ├── utils/
│   │   └── assets/
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   ├── uploads/
│   ├── utils/
│   ├── socket.js
│   ├── index.js
│   └── package.json
│
└── README.md
```

---

# ⚙️ Installation & Setup

## 1️⃣ Clone Repository

```bash
git clone <repository-link>
cd CareerCrafter
```

---

# 🔧 Backend Setup

## Move to Backend Folder

```bash
cd backend
```

## Install Dependencies

```bash
npm install
```

## Create `.env` File

```env
PORT=8000
MONGO_URI=your_mongodb_connection
SECRET_KEY=your_jwt_secret
FRONTEND_URL=http://localhost:5173

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

EMAIL_USER=your_email
EMAIL_PASS=your_email_password

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

## Run Backend Server

```bash
npm run dev
```

Backend runs on:

```bash
http://localhost:8000
```

---

# 💻 Frontend Setup

## Move to Frontend Folder

```bash
cd frontend
```

## Install Dependencies

```bash
npm install
```

## Start Frontend

```bash
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

# 🔄 API Functionalities

## Authentication

* User Signup/Login
* Google OAuth Login
* Forgot Password with OTP
* Reset Password

## Jobs

* Post Jobs
* Get All Jobs
* Filter/Search Jobs
* Apply to Jobs
* Save Jobs

## Applications

* Track Application Status
* Recruiter Applicant Management

## Chat System

* Real-time Recruiter-Student Messaging
* Socket.IO Room Support

## Notifications

* Unread Notification Support
* Real-time Updates

---

# 🎨 UI Highlights

* Modern Responsive Design
* Dark Mode Support
* Animated Components using Framer Motion
* Interactive Dashboard
* Clean Navigation & User Experience

---

# 📸 Screenshots

Add your project screenshots here:

```md
![Home Page](./screenshots/home.png)
![Dashboard](./screenshots/dashboard.png)
![Chat](./screenshots/chat.png)
```

---

# 🚀 Future Improvements

* AI-based Resume Analysis
* Video Interview Integration
* Advanced Job Recommendation System
* Admin Analytics Dashboard
* Email Notification Enhancements
* Interview Scheduling System

---

# 🤝 Contribution

Contributions are welcome.

```bash
1. Fork the repository
2. Create a new branch
3. Make changes
4. Commit changes
5. Push to branch
6. Create Pull Request
```

---

# 👩‍💻 Developed By

**Himani Goyal**

MCA Student at MNNIT Allahabad

---

# ⭐ If You Like This Project

Give this repository a star ⭐ on GitHub.
