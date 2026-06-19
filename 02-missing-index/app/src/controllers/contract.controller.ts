import { Request,Response } from "express";
import { getAllContracts } from "../services/contract.service";


export const getContracts = async(req: Request,res: Response) => {
    try{
        const tenantId = Number(req.query.tenantId);
        const contracts = await getAllContracts(tenantId);

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