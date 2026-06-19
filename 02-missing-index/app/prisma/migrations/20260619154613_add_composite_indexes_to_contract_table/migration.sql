-- CreateIndex
CREATE INDEX "Contract_tenantId_createdAt_idx" ON "Contract"("tenantId", "createdAt" DESC);
