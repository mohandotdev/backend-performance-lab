export const sendApprovalEmail = async () => {
  console.log("Sending Email...");

  await new Promise((resolve) => setTimeout(resolve, 1000));

  console.log("Email Sent!");
};
