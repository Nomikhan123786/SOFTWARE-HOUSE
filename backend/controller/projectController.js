import Project from "../models/Project.js";

const TYPE_TO_ROLE = {
  web: "webdeveloper",
  graphic: "graphicdesigner",
  app: "appdeveloper",
};
const ROLE_TO_TYPE = {
  webdeveloper: "web",
  graphicdesigner: "graphic",
  appdeveloper: "app",
};

// user submit a new project

const createRequest = async (req, res) => {
  try {
    const { title, description, projectType, budget, deadline } = req.body;
    if (!title || !description || !projectType) {
      return res
        .status(400)
        .json({ message: "title , description and projectType are required." });
    }
    if (!TYPE_TO_ROLE[projectType]) {
      return res
        .status(400)
        .json({ message: "projectType must be one of: web, graphic, app" });
    }
    const project = await Project.create({
      title,
      description,
      projectType,
      budget,
      deadline,
      requestedBy: req.user._id,
    });

    res.status(201).json({ message: "Project request submitted", project });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to create request", error: err.message });
  }
};
// Only user view their project

const getMyRequests = async (req, res) => {
  const projects = await Project.find({ requestedBy: req.user._id })
    .populate("assignedTo", "name email role")
    .sort({ createdAt: -1 });
  res.json({ projects });
};

//  Staff  view their assigned project

const getRelevantProjects = async (req, res) => {
  const myType = ROLE_TO_TYPE[(req, res)];
  if (!myType) return res.status(403).json({ message: "Not a staff role." });
  const projecs = await Project.find({
    projectType: myType,
    $or: [{ assignedTo: req.user._id }, { assignedTo: null }],
  });
  populate("requestedBy", "name email")
    .populate("assignedTo", "name email role")
    .sort({ createdAt: -1 });
  res.json({ projects });
};

// only staff update status

const updateRelevantProject = async (req, res) => {
  const { id } = req.params;
  const { status, note } = req.body;
  const myType = ROLE_TO_TYPE[req.user.role];

  const project = await Project.findById(id);
  if (!project) return res.status(404).json({ message: "Project not found" });

  if (project.projectType !== myType) {
    return res
      .status(403)
      .json({ message: "This project does not belong to your specialty" });
  }
  if (
    project.assignedTo &&
    String(project.assignedTo) !== String(req.user._id)
  ) {
    return res.status(403).json({
      message: "This project is assigned to a different staff member",
    });
  }

  // A staff member picking up an unassigned project auto-assigns it to themselves

  if (!project.assignedTo) {
    project.assignedTo = req.user._id;
    if (project.status === "pending") project.status = "assigned";
  }

  if (status && ["in-progress", "completed"].includes(status)) {
    project.status = status;
  }
  if (note) {
    project.notes.push({ text: note, addedBy: req.user._id });
  }

  await project.save();
  const populated = await project.populate([
    { path: "requestedBy", select: "name email" },
    { path: "assignedTo", select: "name email role" },
  ]);

  res.json({ message: "Project updated", project: populated });
};

export {
  createRequest,
  getMyRequests,
  getRelevantProjects,
  updateRelevantProject,
};
