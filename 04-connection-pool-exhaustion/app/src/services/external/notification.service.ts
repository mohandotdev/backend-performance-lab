export const notifyDashboard = async (contract: any) => {
  console.log("Sending Notification...");

  await new Promise((resolve) => setTimeout(resolve, 500));

  console.log("Notification sent!");
};
