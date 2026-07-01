export const notifyDashboard = async () => {
  console.log("Sending Notification...");

  await new Promise((resolve) => setTimeout(resolve, 1000));

  console.log("Notification sent!");
};
