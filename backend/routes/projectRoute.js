import express from "express";
import { Router } from "express";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/rolemiddleware.js";
import {
  createRequest,
  getMyRequests,
  getRelevantProjects,
  updateRelevantProject,
} from "../controller/projectController.js";

const router = Router();

// user role , submit and view own requests
router.post("/", protect, authorize("user"), createRequest);
router.get("/mine", protect, authorize("user"), getMyRequests);

// staff roles: view and manage only their  projects
router.get(
  "/assigned",
  protect,
  authorize("webdeveloper", "graphicdesigner", "appdeveloper"),
  getRelevantProjects,
);
router.patch(
  "/:id/status",
  protect,
  authorize("webdeveloper", "graphicdesigner", "appdeveloper"),
  updateRelevantProject,
);
export default router;
