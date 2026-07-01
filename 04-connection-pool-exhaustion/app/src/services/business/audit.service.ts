export const auditService = async () => {
  console.log("Creating Audit Entry...");

  await new Promise((resolve) => setTimeout(resolve, 500));

  console.log("Audit Entry Completed!");
};
