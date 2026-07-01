import { Router } from "express";
import {
  getContracts,
  getContractsCursorController,
} from "../controllers/contract.controller";

const router = Router();

router.get("/", getContracts);
router.get("/cursor", getContractsCursorController);

export default router;
