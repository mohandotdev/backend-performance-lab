import { Router } from "express";
import {
  contractApprovalController,
  getContracts,
  getContractsCursorController,
} from "../controllers/contract.controller";

const router = Router();

router.get("/", getContracts);
router.get("/cursor", getContractsCursorController);
router.post("/:id/approve", contractApprovalController);

export default router;
