import { Router } from "express";
import {
  getContracts,
  getContractsCursorController,
  getDashboardStats,
} from "../controllers/contract.controller";

const router = Router();

router.get("/", getContracts);
router.get("/cursor", getContractsCursorController);
router.get("/dashboard", getDashboardStats);

export default router;
