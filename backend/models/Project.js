import mongoose from "mongoose";

// projectType which demand by client

const PROJECT_TYPE = ["web", "graphic", "app"];
const STATUSES = [
  "pending",
  "assigned",
  "in-progress",
  "completed",
  "rejected",
];

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    projectType: { type: String, enum: PROJECT_TYPES, required: true },
    budget: { type: Number, default: 0 },
    deadline: { type: Date },
    requestedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    status: { type: String, enum: STATUSES, default: "pending" },

    // staff / admin  progress updates
    notes: [
      {
        text: { type: String, required: true },
        addedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true },
);

// Maps a project's type

const TYPE_TO_ROLE = {
  web: "webdeveloper",
  graphic: "graphicdesigner",
  app: "appdeveloper",
};

export default mongoose.model("Project", projectSchema);
export { PROJECT_TYPES, STATUSES, TYPE_TO_ROLE };
