🏢 HRMS – Human Resource Management System (MERN Stack)

A full-stack Human Resource Management System built using the MERN Stack (MongoDB, Express.js, React.js, Node.js).

This system allows organizations to manage users, teams, attendance, leave applications, and salary operations with secure role-based access control.

🚀 Features
🔐 Authentication & Authorization

JWT-based authentication

Role-based access control (Admin, Leader, Employee)

Secure password hashing using bcrypt

👥 User Management

Create Admin, Leader, and Employee accounts

Update user profiles

Profile image upload

Unique email and username validation

Account status management (Active / Banned)

🏢 Team Management

Create teams

Assign leader to a team

Add employees to a team

Remove leader or members

View team details and members

Prevent invalid role reassignment

🕒 Attendance Management

Mark employee attendance

Prevent duplicate attendance entries

View attendance history

📝 Leave Management

Apply for leave

Admin approval/rejection workflow

Prevent duplicate leave applications

💰 Salary Management

Assign salary to employees

Update salary records

View salary details

📂 File Upload

Upload profile images using Multer

Store images in local storage directory

⚙️ How to Clone and Run
1️⃣ Clone the Repository
git clone https://github.com/Amoghbhat119/HRMS.git
cd HRMS

🖥 Backend Setup
cd Easy-Employee-API
npm install


Create a .env file inside Easy-Employee-API with:

ACCESS_TOKEN_SECRET_KEY=myAccessSecret
REFRESH_TOKEN_SECRET_KEY=myRefreshSecret

BASE_URL=http://localhost:5500
DB_URL=your_mongodb_connection_string_here
CLIENT_URL=http://localhost:3000

TYPE_FORGOT_PASSWORD=2
WEBSITE_NAME=Easy Employee
BCRYPT_PASSWORD_SALT_FACTOR=10

SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=false
SMTP_REQUIRE_TLS=true
SMTP_AUTH_USER=yourgmail
SMTP_AUTH_PASS=your_generated_app_password_here



Start the backend server:

npm run dev


Backend runs at:

http://localhost:5500

🌐 Frontend Setup

Open a new terminal:

cd Easy-Employee
npm install
npm start

Create a .env file inside Easy-Employee with:
REACT_APP_BASE_URL=http://localhost:5500


Frontend runs at:

http://localhost:3000

🔑 Create Initial Admin User

Run this once inside the backend folder:

node createAdmin.js


Default credentials:

Email: admin@gmail.com
Password: admin123

📌 Requirements

Node.js (v16–18 recommended)

MongoDB (Local or Atlas)

npm
