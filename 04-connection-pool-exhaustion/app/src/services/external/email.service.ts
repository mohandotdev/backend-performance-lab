export const sendApprovalEmail = async (contract: any) => {
  console.log("Sending Email...");

  await new Promise((resolve) => setTimeout(resolve, 1000));

  console.log("Email Sent!");
};
