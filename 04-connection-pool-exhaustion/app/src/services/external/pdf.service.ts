export const generateContractPdf = async()=>{
    console.log("Generating PDF...");

    await new Promise(resolve=>setTimeout(resolve, 1500));

    console.log("PDF generated!");
}