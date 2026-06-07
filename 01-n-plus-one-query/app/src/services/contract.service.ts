import {prisma} from "../lib/prisma";

export const getAllContracts = async(tenantId: number) => {
    console.time("[Server] Get All Contracts - contracts-api");

    const contracts = await prisma.contract.findMany({
        where: {
            tenantId,
        },
        take: 1000,
        orderBy: {
            createdAt: "desc"
        }
    });

    const response = []; 

    for(const contract of contracts){
        const createdBy = await prisma.user.findUnique({
            where: {
                id: contract.createdById
            }
        });

        const approvalCount = await prisma.approval.count({
            where: {
                contractId: contract.id
            }
        });

        const commentCount = await prisma.comment.count({
            where: {
                contractId: contract.id
            }
        })

        response.push({
            id: contract.id,
            name: contract.name,
            status: contract.status,
            createdBy: createdBy?.name,
            approvalCount,
            commentCount,
            createdAt: contract.createdAt
        })
    }

    console.timeEnd("[Server] Get All Contracts - contracts-api");

    return response;
}
