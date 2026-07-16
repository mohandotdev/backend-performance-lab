import { prisma } from "../lib/prisma";
import { resetQueryCount, getQueryCount } from "../utils/metrics";
import { validateApprovalRules } from "./business/approval-validation.service";
import { extractContractMetadata } from "./business/metadata-extractor.service";
import { sendApprovalEmail } from "./external/email.service";
import { notifyDashboard } from "./external/notification.service";
import { generateContractPdf } from "./external/pdf.service";
import { notifyExternalERP } from "./external/webhook.service";

export const getAllContracts = async (
  tenantId: number,
  page: number,
  pageSize: number,
) => {
  console.time(
    "[Server] Get All Contracts by offset page stategy - contracts-api",
  );

  resetQueryCount();

  const contracts = await prisma.contract.findMany({
    where: {
      tenantId,
    },
    select: {
      id: true,
      name: true,
      status: true,
      createdAt: true,
      createdBy: {
        select: {
          name: true,
        },
      },
      _count: {
        select: {
          approvals: true,
          comments: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const used = process.memoryUsage().heapUsed;

  console.log(`Memory usage: ${Math.round(used / 1024 / 1024)} MB`);

  console.timeEnd("[Server] Get All Contracts - contracts-api");

  console.log("Total Queries:", getQueryCount());

  return contracts.map((contract) => ({
    id: contract.id,
    name: contract.name,
    status: contract.status,
    createdBy: contract.createdBy.name,
    approvalCount: contract._count.approvals,
    commentCount: contract._count.comments,
    createdAt: contract.createdAt,
  }));
};

export const getContractsCursor = async (
  tenantId: number,
  cursor?: number,
  limit: number = 50,
) => {
  console.time(
    "[Server] Get All Contracts by cursor pagination strategy - contracts-api",
  );

  const contracts = await prisma.contract.findMany({
    where: {
      tenantId,
      ...(cursor && {
        id: {
          lt: cursor,
        },
      }),
    },
    select: {
      id: true,
      name: true,
      status: true,
      createdAt: true,
      createdBy: {
        select: {
          name: true,
        },
      },
      _count: {
        select: {
          approvals: true,
          comments: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: limit,
  });

  console.timeEnd(
    "[Server] Get All Contracts by cursor pagination strategy - contracts-api",
  );

  return contracts.map((contract) => ({
    id: contract.id,
    name: contract.name,
    status: contract.status,
    createdBy: contract.createdBy.name,
    approvalCount: contract._count.approvals,
    commentCount: contract._count.comments,
    createdAt: contract.createdAt,
  }));
};

export const approveContract = async (id: number, userId: number) => {
  await prisma.$transaction(async (tx) => {
    // 1. Read Contract
    const contract = await tx.contract.findUnique({
      where: { id },
    });

    if (!contract) {
      throw new Error("Contract not found!");
    }

    if (contract.status != "PENDING") {
      throw new Error("Only pending contracts can be approved");
    }

    // 2. Business validation
    await validateApprovalRules(contract);

    // 3. Insert approval
    await tx.approval.create({
      data: {
        contractId: id,
        approverId: userId,
        status: "APPROVED",
      },
    });

    // 4. Update contract
    await tx.contract.update({
      where: { id },
      data: {
        status: "APPROVED",
      },
    });

    // 5. Audit log
    await tx.auditLog.create({
      data: {
        action: "CONTRACT_APPROVED",
        entityId: id,
        entityType: "Contract",
        performedBy: userId,
      },
    });

    await generateContractPdf(contract);
    await extractContractMetadata(contract);
    await sendApprovalEmail(contract);
    await notifyDashboard(contract);
    await notifyExternalERP(contract);
  });

  return {
    status: "approved",
  };
};
