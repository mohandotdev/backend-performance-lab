export const notifyExternalERP = async (contract: any) => {
  console.log("Notifying External ERP...");

  await new Promise((resolve) => setTimeout(resolve, 700));

  console.log("Notified External ERP!");
};
