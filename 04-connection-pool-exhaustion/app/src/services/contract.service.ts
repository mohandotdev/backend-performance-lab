import { prisma } from "../lib/prisma";
import { queryMetrics } from "../../../../common/instrumentation/query-metrics";
import { validateApprovalRules } from "./business/approval-validation.service";
import { extractContractMetadata } from "./business/metadata-extractor.service";
import { sendApprovalEmail } from "./external/email.service";
import { notifyDashboard } from "./external/notification.service";
import { generateContractPdf } from "./external/pdf.service";
import { notifyExternalERP } from "./external/webhook.service";
import { tracer } from "../../../../common/instrumentation/tracer";

export const getAllContracts = async (
  tenantId: number,
  page: number,
  pageSize: number,
) => {
  console.time(
    "[Server] Get All Contracts by offset page stategy - contracts-api",
  );

  return tracer.startActiveSpan("Fetch Contracts", async (span) => {
    try {
      queryMetrics.reset();

      const contracts = await tracer.startActiveSpan(
        "Load Contracts",
        async (span) => {
          try {
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

            span.setAttributes({
              "tenant.id": tenantId,
              page: page,
              "page.size": pageSize,
              "memory.heap.mb": Math.round(used / 1024 / 1024),
              "contracts.count": contracts.length,
              "total.queries": queryMetrics.getCount(),
            });

            return contracts;
          } finally {
            span.end();
          }
        },
      );

      return tracer.startActiveSpan("Transform Response", async (span) => {
        try {
          return contracts.map((contract) => ({
            id: contract.id,
            name: contract.name,
            status: contract.status,
            createdBy: contract.createdBy.name,
            approvalCount: contract._count.approvals,
            commentCount: contract._count.comments,
            createdAt: contract.createdAt,
          }));
        } finally {
          span.end();
        }
      });
    } catch (error) {
      span.recordException(error as Error);
      throw error;
    } finally {
      console.timeEnd(
        "[Server] Get All Contracts by offset page stategy - contracts-api",
      );

      span.end();
    }
  });
};

export const getContractsCursor = async (
  tenantId: number,
  cursor?: number,
  limit: number = 50,
) => {
  console.time(
    "[Server] Get All Contracts by cursor pagination strategy - contracts-api",
  );

  return tracer.startActiveSpan("Get Contracts Cursor", async (span) => {
    try {
      queryMetrics.reset();

      const contracts = await tracer.startActiveSpan(
        "Load Contracts Cursor",
        async (span) => {
          try {
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

            span.setAttributes({
              "tenant.id": tenantId,
              cursor: cursor ?? "none",
              limit: limit,
              "contracts.count": contracts.length,
              "total.queries": queryMetrics.getCount(),
            });

            return contracts;
          } finally {
            span.end();
          }
        },
      );

      return tracer.startActiveSpan(
        "Transform Cursor Response",
        async (span) => {
          try {
            return contracts.map((contract) => ({
              id: contract.id,
              name: contract.name,
              status: contract.status,
              createdBy: contract.createdBy.name,
              approvalCount: contract._count.approvals,
              commentCount: contract._count.comments,
              createdAt: contract.createdAt,
            }));
          } finally {
            span.end();
          }
        },
      );
    } catch (error) {
      span.recordException(error as Error);
      throw error;
    } finally {
      console.timeEnd(
        "[Server] Get All Contracts by cursor pagination strategy - contracts-api",
      );

      span.end();
    }
  });
};

export const approveContract = async (id: number, userId: number) => {
  console.time("[TX] Contract Approval");

  return tracer.startActiveSpan("Approve Contract", async (span) => {
    try {
      queryMetrics.reset();

      await tracer.startActiveSpan(
        "Contract Approval Transaction",
        async (span) => {
          try {
            await prisma.$transaction(
              async (tx) => {
                const contract = await tracer.startActiveSpan(
                  "Read Contract",
                  async (span) => {
                    try {
                      const contract = await tx.contract.findUnique({
                        where: { id },
                      });

                      return contract;
                    } finally {
                      span.end();
                    }
                  },
                );

                if (!contract) {
                  throw new Error("Contract not found!");
                }

                if (contract.status != "PENDING") {
                  throw new Error("Only pending contracts can be approved");
                }

                await tracer.startActiveSpan(
                  "Validate Approval Rules",
                  async (span) => {
                    try {
                      await validateApprovalRules(contract);
                    } finally {
                      span.end();
                    }
                  },
                );

                await tracer.startActiveSpan(
                  "Create Approval",
                  async (span) => {
                    try {
                      await tx.approval.create({
                        data: {
                          contractId: id,
                          approverId: userId,
                          status: "APPROVED",
                        },
                      });
                    } finally {
                      span.end();
                    }
                  },
                );

                await tracer.startActiveSpan(
                  "Update Contract",
                  async (span) => {
                    try {
                      await tx.contract.update({
                        where: { id },
                        data: {
                          status: "APPROVED",
                        },
                      });
                    } finally {
                      span.end();
                    }
                  },
                );

                await tracer.startActiveSpan(
                  "Create Audit Log",
                  async (span) => {
                    try {
                      await tx.auditLog.create({
                        data: {
                          action: "CONTRACT_APPROVED",
                          entityId: id,
                          entityType: "Contract",
                          performedBy: userId,
                        },
                      });
                    } finally {
                      span.end();
                    }
                  },
                );

                await tracer.startActiveSpan(
                  "Generate Contract PDF",
                  async (span) => {
                    try {
                      await generateContractPdf(contract);
                    } finally {
                      span.end();
                    }
                  },
                );

                await tracer.startActiveSpan(
                  "Extract Contract Metadata",
                  async (span) => {
                    try {
                      await extractContractMetadata(contract);
                    } finally {
                      span.end();
                    }
                  },
                );

                await tracer.startActiveSpan(
                  "Send Approval Email",
                  async (span) => {
                    try {
                      await sendApprovalEmail(contract);
                    } finally {
                      span.end();
                    }
                  },
                );

                await tracer.startActiveSpan(
                  "Notify Dashboard",
                  async (span) => {
                    try {
                      await notifyDashboard(contract);
                    } finally {
                      span.end();
                    }
                  },
                );

                await tracer.startActiveSpan(
                  "Notify External ERP",
                  async (span) => {
                    try {
                      await notifyExternalERP(contract);
                    } finally {
                      span.end();
                    }
                  },
                );
              },
              {
                timeout: 10000,
              },
            );
          } finally {
            span.end();
          }
        },
      );

      span.setAttributes({
        "contract.id": id,
        "user.id": userId,
        workflow: "contract-approval",
        "performance.scenario": process.env.OTEL_SERVICE_NAME,
        "query.count": queryMetrics.getCount(),
      });

      return {
        status: "approved",
      };
    } catch (error) {
      span.recordException(error as Error);
      throw error;
    } finally {
      console.timeEnd("[TX] Contract Approval");

      span.end();
    }
  });
};
