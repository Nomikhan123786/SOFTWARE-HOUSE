import User from "../models/User";
import Project from "../models/Project";
const STAFF_ROLES = ["webdeveloper", "graphicdesigner", "appdeveloper"];

// Admin create the staff

const createStaff = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) {
      return res
        .status(400)
        .json({ message: "Name , email , password and role are required" });
    }
    if (!STAFF_ROLES.includes(role)) {
      return res.status(400).json({
        message: `Invalid role. Admin can only create: ${STAFF_ROLES.join(" , ")}`,
      });
    }
    const existing = await User.findOne({
      email: email.toLowerCase(),
    });
    if (existing) {
      return res
        .status(400)
        .json({ message: "An account with this email already exists " });
    }
    const staff = await User.create({
      name,
      email,
      password,
      role,
      createdBy: req.user._id,
    });
    res
      .status(201)
      .json({ message: "Staff account created", user: staff.toSafeObject() });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to create staff account", error: err.message });
  }
};

//  List all staff accounts
const getAllStaff = async (req, res) => {
  const filter = { role: { $in: STAFF_ROLES } };
  if (req.query.role) filter.role = req.query.role;
  const staff = await User.find(filter)
    .select("-password")
    .sort({ createdAt: -1 });
  res.json({ staff });
};

// update a staff account by id
const setStaffActive = async (req, res) => {
  const { id } = req.params;
  const { isActive } = req.body;
  const staff = await User.findOne({ _id: id, role: { $in: STAFF_ROLES } });
  if (!staff)
    return res.status(404).json({ message: "Staff member not found" });
  staff.isActive = !!isActive;
  await staff.save();
  res.json({ message: "Staff status updated", user: staff.toSafeObject() });
};

// Only admin view ALL project requests from user
const getAllRequests = async (req, res) => {
  const filter = {};
  if (req.query.status) filter.status = req.query.status;
  if (req.query.projectType) filter.projectType = req.query.projectType;

  const projects = await Project.find(filter)
    .populate("requestedBy", "name email")
    .populate("assignedTo", "name email role")
    .sort({ createdAt: -1 });

  res.json({ projects });
};

//Admin assigns a project request to a matching staff membe

const assignRequest = async (req, res) => {
  const { id } = req.params;
  const { assignedTo, status } = req.body;

  const project = await Project.findById(id);
  if (!project)
    return res.status(404).json({ message: "Project request not found" });

  if (assignedTo) {
    const staff = await User.findById(assignedTo);
    const TYPE_TO_ROLE = {
      web: "webdeveloper",
      graphic: "graphicdesigner",
      app: "appdeveloper",
    };
    if (!staff || staff.role !== TYPE_TO_ROLE[project.projectType]) {
      return res.status(400).json({
        message: `assignedTo must be a ${TYPE_TO_ROLE[project.projectType]} account`,
      });
    }
    project.assignedTo = assignedTo;
    if (project.status === "pending") project.status = "assigned";
  }

  if (status) project.status = status;

  await project.save();
  const populated = await project.populate([
    { path: "requestedBy", select: "name email" },
    { path: "assignedTo", select: "name email role" },
  ]);

  res.json({ message: "Project request updated", project: populated });
};

export default {
  createStaff,
  getAllStaff,
  getAllRequests,
  setStaffActive,
  assignRequest,
};
