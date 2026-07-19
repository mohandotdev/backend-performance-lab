import { Request, Response } from "express";
import {
  getAllContracts,
  getContractsCursor,
  approveContract,
} from "../services/contract.service";

export const getContracts = async (req: Request, res: Response) => {
  try {
    const tenantId = Number(req.query.tenantId);
    const page = Number(req.query.page ?? 1);
    const pageSize = Number(req.query.pageSize ?? 50);

    const contracts = await getAllContracts(tenantId, page, pageSize);

    return res.status(200).json({
      success: true,
      count: contracts.length,
      data: contracts,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getContractsCursorController = async (
  req: Request,
  res: Response,
) => {
  try {
    const tenantId = Number(req.query.tenantId);
    const cursor = Number(req.query.cursor ?? 1);
    const limit = Number(req.query.limit ?? 1);

    const contracts = await getContractsCursor(tenantId, cursor, limit);

    const nextCursor =
      contracts.length > 0 ? contracts[contracts.length - 1].id : null;

    return res.status(200).json({
      success: true,
      count: contracts.length,
      data: contracts,
      nextCursor,
    });
  } catch (error) {
    console.error(error);
  }
};

export const contractApprovalController = async (
  req: Request,
  res: Response,
) => {
  try {
    const contractId = Number(req.params.id);
    const userId = Number(req.body.userId);

    const response = await approveContract(contractId, userId);

    return res.status(200).json({
      success: true,
      data: response,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};
