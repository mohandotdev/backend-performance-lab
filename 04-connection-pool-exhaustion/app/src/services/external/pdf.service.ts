export const generateContractPdf = async (contract: any) => {
  console.log("Generating PDF...");

  await new Promise((resolve) => setTimeout(resolve, 1500));

  console.log("PDF generated!");
};
