const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// ================= IMPORT ROUTES =================
const authRoutes = require("./routes/auth.routes");
const employeeRoutes = require("./routes/employee.routes");
const departmentRoutes = require("./routes/department.routes");
const designationRoutes = require("./routes/designation.routes");
const attendanceRoutes = require("./routes/attendance.routes");
const leaveRoutes = require("./routes/leave.routes");
const dashboardRoutes = require("./routes/dashboard.routes"); // ✅ THIS WAS MISSING
const payrollRoutes = require("./routes/payroll.routes");
const reportRoutes = require("./routes/report.routes");

// ================= REGISTER ROUTES =================
app.use("/api/auth", authRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/designations", designationRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/leave", leaveRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/payroll", payrollRoutes);
app.use("/api/report", reportRoutes);
app.use("/api/dashboard", dashboardRoutes);


// ================= START SERVER =================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
