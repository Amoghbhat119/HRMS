🏢 HRMS – Human Resource Management System (MERN Stack)

A full-stack Human Resource Management System built using the MERN stack (MongoDB, Express.js, React.js, Node.js).

This system enables organizations to manage employees, teams, attendance, payroll, and leave workflows with role-based access control.

🚀 Tech Stack
Frontend

React.js

React Router

Axios

Bootstrap

React Toastify

Backend

Node.js

Express.js

MongoDB + Mongoose

JWT Authentication

Multer (File Upload)

Bcrypt (Password Hashing)

🔐 Authentication & Roles

The system supports role-based access control:

Admin

Leader

Employee

📦 Features
👥 User Management

Create Admin, Leader, Employee

Update User Details

Profile Image Upload

Password Hashing (bcrypt)

Role Restrictions

🏢 Team Management

Create Teams

Assign Leader to Team

Add/Remove Employees from Team

View Team Members

Prevent invalid role reassignment

🕒 Attendance Management

Mark daily attendance

Prevent duplicate marking

View attendance history

📝 Leave Management

Apply leave

Admin approval/rejection

Prevent duplicate leave entries

💰 Salary Management

Assign salary to employees

Update salary

View salary history



⚙️ Installation Guide
1️⃣ Clone Repository
git clone https://github.com/Amoghbhat119/HRMS.git
cd HRMS

🖥 Backend Setup
cd Easy-Employee-API
npm install

Create .env file
ACCESS_TOKEN_SECRET_KEY=yourAccessSecret
REFRESH_TOKEN_SECRET_KEY=yourRefreshSecret

BASE_URL=http://localhost:5500
DB_URL=mongodb://127.0.0.1:27017/EMS
CLIENT_URL=http://localhost:3000

BCRYPT_PASSWORD_SALT_FACTOR=10

SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_REQUIRE_TLS=true
SMTP_AUTH_USER=yourEmail@gmail.com
SMTP_AUTH_PASS=yourAppPassword

Run Backend
npm run dev


Server runs at:

http://localhost:5500

🌐 Frontend Setup
cd Easy-Employee
npm install
npm start


App runs at:

http://localhost:3000

🔑 Create Initial Admin

Run once in backend:

node createAdmin.js


Default Admin Credentials:

Email: admin@gmail.com
Password: admin123




🛡 Security Features

JWT-based authentication

Role-based authorization

Password hashing with bcrypt

Input validation using Mongoose

Unique email & username enforcement

