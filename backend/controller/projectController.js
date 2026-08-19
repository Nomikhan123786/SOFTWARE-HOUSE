import Project from "../models/Project";

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

//  Only user view their project

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
