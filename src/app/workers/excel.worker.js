const { parentPort } = require("worker_threads");
const fs = require("fs");
const ExcelJS = require("exceljs");

const filePath = "data.xlsx";

fs.watch(filePath, async (eventType, filename) => {
  if (filename) {
    try {
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.readFile(filePath);
      const sheet = workbook.getWorksheet(1);
      const data = [];

      sheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
        const rowData = row.values;
        if (rowData.includes("ERROR")) {
          row.eachCell((cell) => {
            cell.fill = {
              type: "pattern",
              pattern: "solid",
              fgColor: { argb: "FFFF0000" }, // Red color for error rows
            };
          });
        }
        data.push(rowData);
      });

      await workbook.xlsx.writeFile(filePath);
      parentPort.postMessage({ eventType, data });
    } catch (err) {
      parentPort.postMessage({ error: err.message });
    }
  }
});
