import express from "express";
import { Router } from "express";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/rolemiddleware.js";
import {
  createRequest,
  getMyRequests,
  getRelevantProjects,
  updateRelevantProject,
} from "../controller/adminController.js";

const router = Router();
router.use(protect, authorize("admin"));

router.post("/staff", createStaff); // create staff
router.get("/staff", getAllStaff);
router.patch("/staff/:id/deactivate", setStaffActive);

router.get("/requests", getAllRequests); // view ALL project requests from users
router.patch("/requests/:id/assign", assignRequest); // assign to staff / change status

export default router;
