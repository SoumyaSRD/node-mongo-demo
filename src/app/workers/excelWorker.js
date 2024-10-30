const { parentPort, workerData } = require("worker_threads");
const ExcelJS = require("exceljs");
const JSZip = require("jszip");
const fs = require("fs");

parentPort.on("message", async (message) => {
  try {
    if (message.action === "read") {
      // const fileBuffer = fs.readFileSync(workerData.filePath);
      // const zip = new JSZip();
      // const zipContent = await zip.loadAsync(fileBuffer);

      // if (!zipContent.files["xl/workbook.xml"]) {
      //   throw new Error("Not a valid Excel file");
      // }
      // console.log("zipContent", workerData.filePath);
      console.log("____________________________");
      console.log(message);

      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.readFile(workerData.filePath);
      const worksheet = workbook.getWorksheet();
      // const header = worksheet.splice(0, 1);
      console.log("______________workerData______________", worksheet);

      // console.log("header", header);

      const jsonData = [];
      worksheet.workbook.worksheets[0].eachRow(
        { includeEmpty: true },
        (row) => {
          const rowData = row.values;
          const rowObject = rowData.reduce((acc, cell, index) => {
            acc[`column${index}`] = cell;
            return acc;
          }, {});

          jsonData.push(rowObject);
        }
      );
      console.log("jsonData", jsonData);

      // console.log("jsonData", jsonData);

      parentPort.postMessage({ action: "read", data });
    } else if (message.action === "write") {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("Sheet 1");
      worksheet.columns = message.columns;
      worksheet.addRows(message.rows);
      await workbook.xlsx.writeFile(workerData.filePath);
      parentPort.postMessage({ action: "write", status: "success" });
    }
  } catch (error) {
    parentPort.postMessage({ action: "error", error: error.message });
  }
});
