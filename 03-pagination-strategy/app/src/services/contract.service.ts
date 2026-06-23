import {prisma} from "../lib/prisma";
import { resetQueryCount, getQueryCount } from "../utils/metrics";

export const getAllContracts = async(tenantId: number, page: number, pageSize: number) => {
    console.time("[Server] Get All Contracts - contracts-api")

    resetQueryCount();

    const contracts = await prisma.contract.findMany({
        where: {
            tenantId,
        },
        select:{
            id: true,
            name: true,
            status: true,
            createdAt: true,
            createdBy: {
                select: {
                    name: true
                }
            },
            _count: {
                select: {
                    approvals: true,
                    comments: true
                }
            }
        },
        orderBy: {
            createdAt: "desc"
        },
        skip: (page - 1) * pageSize,
        take: pageSize
    })

    const used = process.memoryUsage().heapUsed;

    console.log(`Memory usage: ${Math.round(used / 1024 / 1024)} MB`);

    console.timeEnd("[Server] Get All Contracts - contracts-api")

    console.log("Total Queries:", getQueryCount());

    return contracts.map(contract => ({
        id: contract.id,
        name: contract.name,
        status: contract.status,
        createdBy: contract.createdBy.name,
        approvalCount: contract._count.approvals,
        commentCount: contract._count.comments,
        createdAt: contract.createdAt
    }))
}
