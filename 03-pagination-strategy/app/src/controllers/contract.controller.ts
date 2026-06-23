import { Request,Response } from "express";
import { getAllContracts } from "../services/contract.service";


export const getContracts = async(req: Request,res: Response) => {
    try{
        const tenantId = Number(req.query.tenantId);
        const page = Number(req.query.page ?? 1);
        const pageSize = Number(req.query.pageSize ?? 50);

        const contracts = await getAllContracts(tenantId, page, pageSize);

        return res.status(200).json({
            success: true,
            count: contracts.length,
            data: contracts
        });
    }catch(error){
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}