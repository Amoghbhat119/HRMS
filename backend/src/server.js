require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/employees", require("./routes/employee.routes"));
app.use("/api/attendance", require("./routes/attendance.routes"));
app.use("/api/leaves", require("./routes/leave.routes"));
app.use("/api/payroll", require("./routes/payroll.routes"));
app.use("/api/dashboard", require("./routes/dashboard.routes"));
app.use("/api/departments", require("./routes/department.routes"));
app.use("/api/designations", require("./routes/designation.routes"));
app.use("/api/reports", require("./routes/report.routes"));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);
