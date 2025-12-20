const Leave = require("../models/Leave");
const Employee = require("../models/Employee");

// ================= APPLY LEAVE =================
exports.applyLeave = async (req, res) => {
  try {
    const { fromDate, toDate, reason } = req.body;

    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!fromDate || !toDate) {
      return res.status(400).json({ message: "Dates required" });
    }

    const leave = await Leave.create({
      employee: req.user.id,
      fromDate,
      toDate,
      reason,
      status: "PENDING",
    });

    res.status(201).json(leave);
  } catch (error) {
    console.error("Apply Leave Error:", error);
    res.status(500).json({ message: "Leave application failed" });
  }
};

// ================= GET LEAVES =================
exports.getLeaves = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    let leaves;

    // Admin → all leaves
    if (req.user.role === "ADMIN") {
      leaves = await Leave.find().populate("employee", "name role");
    }
    // Manager → team leaves (TEMP: all non-admin)
    else if (req.user.role === "MANAGER") {
      leaves = await Leave.find().populate("employee", "name role");
    }
    // Employee → own leaves
    else {
      leaves = await Leave.find({ employee: req.user.id }).populate(
        "employee",
        "name role"
      );
    }

    res.json(leaves);
  } catch (error) {
    console.error("Get Leaves Error:", error);
    res.status(500).json({ message: "Failed to fetch leaves" });
  }
};

// ================= APPROVE =================
exports.approveLeave = async (req, res) => {
  try {
    const leave = await Leave.findById(req.params.id);

    if (!leave) {
      return res.status(404).json({ message: "Leave not found" });
    }

    if (leave.status !== "PENDING") {
      return res
        .status(400)
        .json({ message: `Already ${leave.status}` });
    }

    leave.status = "APPROVED";
    await leave.save();

    res.json({ message: "Leave approved" });
  } catch (error) {
    console.error("Approve Leave Error:", error);
    res.status(500).json({ message: "Approval failed" });
  }
};

// ================= REJECT =================
exports.rejectLeave = async (req, res) => {
  try {
    const leave = await Leave.findById(req.params.id);

    if (!leave) {
      return res.status(404).json({ message: "Leave not found" });
    }

    if (leave.status !== "PENDING") {
      return res
        .status(400)
        .json({ message: `Already ${leave.status}` });
    }

    leave.status = "REJECTED";
    await leave.save();

    res.json({ message: "Leave rejected" });
  } catch (error) {
    console.error("Reject Leave Error:", error);
    res.status(500).json({ message: "Rejection failed" });
  }
};
