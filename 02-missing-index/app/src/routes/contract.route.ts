import { Router } from "express";
import { getContracts } from "../controllers/contract.controller";

const router = Router();

router.get("/", getContracts);

export default router;